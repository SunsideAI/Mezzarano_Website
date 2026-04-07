#!/usr/bin/env node

/**
 * Automatic Blog Post Generator for GitHub Actions
 * Selects unused topics and generates blog posts automatically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TOPICS_FILE = path.join(process.cwd(), 'src', 'content', 'blog-topics.json');
const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const MAX_POSTS_PER_RUN = 3;
const DELAY_BETWEEN_POSTS = 5000; // 5 seconds

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadTopics() {
  if (!fs.existsSync(TOPICS_FILE)) {
    console.error('❌ Topics file not found:', TOPICS_FILE);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf-8'));
}

function saveTopics(data) {
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function getUnusedTopics(data, priority = null) {
  let topics = data.topics.filter(t => !t.used);

  if (priority) {
    topics = topics.filter(t => t.priority === priority);
  }

  // Sort by priority: high > medium > low
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  topics.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return topics;
}

async function generatePost(topic) {
  const { generateBlogPost, generateSEOTitle, detectCategory, createSlug } = require('./generate-blog-post.js');
  const Anthropic = require('@anthropic-ai/sdk').default;

  console.log(`\n📝 Generating: "${topic.title}"`);

  const client = new Anthropic();

  // Generate content
  const SYSTEM_PROMPT = `Du bist ein erfahrener Immobilien-Content-Autor für Mezzarano Immobilien, einen Wüstenrot-Immobilienberater in der Region Hermeskeil, Trier, Mosel und Hochwald.

Deine Aufgabe ist es, SEO-optimierte, informative Blog-Artikel auf Deutsch zu schreiben.

Wichtige Richtlinien:
- Schreibe in einem professionellen, aber zugänglichen Ton
- Verwende die regionale Perspektive (Hermeskeil, Trier, Schweich, Bernkastel-Kues, Hochwald, Mosel)
- Integriere natürlich relevante Keywords
- Strukturiere den Artikel mit klaren H2 und H3 Überschriften
- Füge praktische Tipps und Handlungsempfehlungen ein
- Erwähne bei passenden Themen die Wüstenrot-Partnerschaft und Finanzierungsexpertise
- Der Artikel sollte mindestens 1500 Wörter lang sein
- Füge am Ende einen Call-to-Action für Beratung ein
- Verwende Tabellen für Vergleiche und Zahlen
- Füge relevante lokale Daten und Statistiken ein

Der Makler heißt "Herr Mezzarano" und arbeitet als Wüstenrot-Immobilienberater.

Format: Reines Markdown ohne Frontmatter.`;

  const userPrompt = `Schreibe einen ausführlichen Blog-Artikel zum Thema: "${topic.title}"

Relevante Keywords zum Einbauen: ${topic.keywords.join(', ')}

Der Artikel sollte:
1. Eine packende Einleitung haben
2. Mehrere H2-Abschnitte mit Unterüberschriften (H3)
3. Praktische Tipps und Beispiele enthalten
4. Lokale Bezüge zur Region Hermeskeil, Trier, Mosel und Hochwald haben
5. Mit einem Call-to-Action für Beratung enden

Bitte schreibe den Artikel im Markdown-Format.`;

  const [contentResponse, titleResponse, descResponse] = await Promise.all([
    client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }]
    }),
    client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: `Erstelle einen SEO-optimierten Titel (max 60 Zeichen) für einen Immobilien-Blog-Artikel zum Thema: "${topic.title}".

WICHTIG: Gib NUR den Titel aus - keine Anführungszeichen, keine Erklärungen, keine Zeichenanzahl.`
      }]
    }),
    client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Erstelle eine SEO-Meta-Description (max 155 Zeichen) für einen Immobilien-Blog-Artikel zum Thema: "${topic.title}". Für Mezzarano Immobilien in Hermeskeil, Trier und an der Mosel.

WICHTIG: Gib NUR den Description-Text aus. KEINE Anführungszeichen, KEINE Zeichenanzahl, KEINE Labels wie "SEO-Meta-Description:", KEINE Formatierung wie **fett**.`
      }]
    })
  ]);

  const content = contentResponse.content[0].text;

  // Clean title: remove quotes and any extra text
  const seoTitle = titleResponse.content[0].text
    .trim()
    .replace(/^["'„"»«]|["'„"»«]$/g, '')
    .split('\n')[0] // Only take first line
    .trim();

  // Clean description: remove quotes, character counts, labels, and extra formatting
  const description = descResponse.content[0].text
    .trim()
    .replace(/^\*\*SEO[^*]*\*\*:?\s*/gi, '') // Remove **SEO-Meta-Description:** etc.
    .replace(/^SEO[^:]*:\s*/gi, '') // Remove "SEO-Meta-Description:" etc.
    .replace(/^Meta[- ]?Description:?\s*/gi, '') // Remove "Meta-Description:" etc.
    .replace(/^Description:?\s*/gi, '') // Remove "Description:" etc.
    .replace(/^["'„"»«]|["'„"»«]$/g, '') // Remove quotes
    .replace(/\*\*\(?[\d\s]*Zeichen\)?\*\*/gi, '') // Remove **(154 Zeichen)** etc.
    .replace(/\*\*Zeichenanzahl:?\s*\d+\*\*/gi, '') // Remove **Zeichenanzahl: 154**
    .replace(/\(Zeichen:?\s*\d+\)/gi, '') // Remove (Zeichen: 155)
    .replace(/\(\d+\s*Zeichen\)/gi, '') // Remove (155 Zeichen)
    .replace(/Zeichenanzahl:?\s*\d+/gi, '') // Remove Zeichenanzahl: 155
    .replace(/\[\d+\s*Zeichen\]/gi, '') // Remove [155 Zeichen]
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const category = topic.category;
  const date = new Date().toISOString().split('T')[0];
  const tags = [...new Set([...topic.keywords, 'Hermeskeil', 'Trier', 'Mosel', 'Immobilien', 'Wüstenrot'])].slice(0, 6);

  const slug = seoTitle
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);

  const frontmatter = `---
title: "${seoTitle}"
description: "${description}"
pubDate: ${date}
category: "${category}"
author: "Mezzarano Immobilien"
image: "/blog/${category.toLowerCase().replace(/[^a-z]+/g, '-')}.svg"
featured: false
tags: ${JSON.stringify(tags)}
---

`;

  const fullContent = frontmatter + content;
  const filename = `${slug}.md`;

  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(BLOG_DIR, filename), fullContent, 'utf-8');

  console.log(`   ✅ Created: ${filename}`);

  return { filename, title: seoTitle, category };
}

async function main() {
  console.log('🚀 Auto Blog Generator Starting...\n');

  // Validate API key before starting
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is not set!');
    console.error('   Please add it to your GitHub repository secrets.');
    console.error('   Go to: Repository Settings > Secrets and Variables > Actions > New repository secret');
    process.exit(1);
  }

  console.log('✅ API key found');

  const data = loadTopics();
  const unusedTopics = getUnusedTopics(data);

  console.log(`📊 Status: ${unusedTopics.length} unused topics available`);
  console.log(`   High priority: ${unusedTopics.filter(t => t.priority === 'high').length}`);
  console.log(`   Medium priority: ${unusedTopics.filter(t => t.priority === 'medium').length}`);
  console.log(`   Low priority: ${unusedTopics.filter(t => t.priority === 'low').length}`);

  if (unusedTopics.length === 0) {
    console.log('\n⚠️ No unused topics available. Add more topics to blog-topics.json');
    process.exit(0);
  }

  const topicsToGenerate = unusedTopics.slice(0, MAX_POSTS_PER_RUN);
  const results = { success: 0, failed: 0, posts: [] };

  for (const topic of topicsToGenerate) {
    try {
      const result = await generatePost(topic);
      results.success++;
      results.posts.push(result);

      // Mark topic as used
      const topicIndex = data.topics.findIndex(t => t.title === topic.title);
      if (topicIndex !== -1) {
        data.topics[topicIndex].used = true;
        data.topics[topicIndex].usedDate = new Date().toISOString();
      }

      // Rate limiting
      if (topicsToGenerate.indexOf(topic) < topicsToGenerate.length - 1) {
        console.log(`   ⏳ Waiting ${DELAY_BETWEEN_POSTS / 1000}s before next post...`);
        await sleep(DELAY_BETWEEN_POSTS);
      }
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      // Log full error details for debugging
      if (error.status) {
        console.error(`   Status: ${error.status}`);
      }
      if (error.error) {
        console.error(`   Details: ${JSON.stringify(error.error)}`);
      }
      console.error(`   Stack: ${error.stack}`);
      results.failed++;
    }
  }

  // Save updated topics
  saveTopics(data);

  console.log('\n📈 Generation Complete!');
  console.log(`   ✅ Success: ${results.success}`);
  console.log(`   ❌ Failed: ${results.failed}`);

  if (results.posts.length > 0) {
    console.log('\n📝 Generated Posts:');
    results.posts.forEach(p => console.log(`   - ${p.title} (${p.category})`));
  }

  // Set output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `posts_generated=${results.success}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `posts_failed=${results.failed}\n`);
  }

  process.exit(results.failed > 0 && results.success === 0 ? 1 : 0);
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  if (error.status) {
    console.error(`   Status: ${error.status}`);
  }
  if (error.error) {
    console.error(`   Details: ${JSON.stringify(error.error)}`);
  }
  console.error(`   Stack: ${error.stack}`);
  process.exit(1);
});

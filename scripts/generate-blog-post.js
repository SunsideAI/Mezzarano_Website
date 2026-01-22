#!/usr/bin/env node

/**
 * Blog Post Generator for Mezzarano Immobilien
 * Generates SEO-optimized blog posts using Claude AI
 *
 * Usage: node scripts/generate-blog-post.js "Your topic here"
 */

const Anthropic = require('@anthropic-ai/sdk').default;
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const TOPICS_FILE = path.join(process.cwd(), 'src', 'content', 'blog-topics.json');

const CATEGORIES = [
  'Marktberichte',
  'Immobilienverkauf',
  'Immobilienkauf',
  'Immobilienbewertung',
  'Regionen',
  'Finanzierung',
  'Kapitalanlage',
  'Recht & Steuern',
  'Tipps & Ratgeber'
];

const SYSTEM_PROMPT = `Du bist ein erfahrener Immobilien-Content-Autor für Mezzarano Immobilien, einen Wüstenrot-Immobilienberater in der Region Heilbronn.

Deine Aufgabe ist es, SEO-optimierte, informative Blog-Artikel auf Deutsch zu schreiben.

Wichtige Richtlinien:
- Schreibe in einem professionellen, aber zugänglichen Ton
- Verwende die regionale Perspektive (Heilbronn, Weinsberg, Neckarsulm, etc.)
- Integriere natürlich relevante Keywords
- Strukturiere den Artikel mit klaren H2 und H3 Überschriften
- Füge praktische Tipps und Handlungsempfehlungen ein
- Erwähne bei passenden Themen die Wüstenrot-Partnerschaft und Finanzierungsexpertise
- Der Artikel sollte mindestens 1500 Wörter lang sein
- Füge am Ende einen Call-to-Action für Beratung ein
- Verwende Tabellen für Vergleiche und Zahlen
- Füge relevante lokale Daten und Statistiken ein (auch fiktive, aber realistische)

Der Makler heißt "Herr Mezzarano" und arbeitet als Wüstenrot-Immobilienberater.

Format: Reines Markdown ohne Frontmatter (das wird separat hinzugefügt).`;

async function generateBlogPost(topic, keywords = []) {
  const client = new Anthropic();

  console.log(`📝 Generating blog post for: "${topic}"`);

  const userPrompt = `Schreibe einen ausführlichen Blog-Artikel zum Thema: "${topic}"

${keywords.length > 0 ? `Relevante Keywords zum Einbauen: ${keywords.join(', ')}` : ''}

Der Artikel sollte:
1. Eine packende Einleitung haben
2. Mehrere H2-Abschnitte mit Unterüberschriften (H3)
3. Praktische Tipps und Beispiele enthalten
4. Lokale Bezüge zur Region Heilbronn haben
5. Mit einem Call-to-Action für Beratung enden

Bitte schreibe den Artikel im Markdown-Format.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }]
  });

  return response.content[0].text;
}

async function generateSEOTitle(topic) {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 100,
    messages: [{
      role: 'user',
      content: `Erstelle einen SEO-optimierten Titel (max 60 Zeichen) für einen Immobilien-Blog-Artikel zum Thema: "${topic}". Nur den Titel ausgeben, ohne Anführungszeichen.`
    }]
  });

  return response.content[0].text.trim();
}

async function generateDescription(topic) {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `Erstelle eine SEO-Meta-Description (max 155 Zeichen) für einen Immobilien-Blog-Artikel zum Thema: "${topic}". Für Mezzarano Immobilien in Heilbronn. Nur die Description ausgeben.`
    }]
  });

  return response.content[0].text.trim();
}

function detectCategory(topic, keywords = []) {
  const text = (topic + ' ' + keywords.join(' ')).toLowerCase();

  if (text.includes('markt') || text.includes('preis') || text.includes('trend') || text.includes('mietspiegel')) {
    return 'Marktberichte';
  }
  if (text.includes('verkauf') || text.includes('home staging')) {
    return 'Immobilienverkauf';
  }
  if (text.includes('kauf') || text.includes('neubau') || text.includes('bestand')) {
    return 'Immobilienkauf';
  }
  if (text.includes('bewertung') || text.includes('wert')) {
    return 'Immobilienbewertung';
  }
  if (text.includes('heilbronn') || text.includes('weinsberg') || text.includes('neckarsulm') ||
      text.includes('bad wimpfen') || text.includes('öhringen') || text.includes('lauffen')) {
    return 'Regionen';
  }
  if (text.includes('finanzierung') || text.includes('kredit') || text.includes('zins') ||
      text.includes('eigenkapital') || text.includes('bauspar') || text.includes('wüstenrot')) {
    return 'Finanzierung';
  }
  if (text.includes('kapitalanlage') || text.includes('rendite') || text.includes('investment')) {
    return 'Kapitalanlage';
  }
  if (text.includes('steuer') || text.includes('recht') || text.includes('erbschaft') ||
      text.includes('scheidung') || text.includes('energieausweis')) {
    return 'Recht & Steuern';
  }

  return 'Tipps & Ratgeber';
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

function createFrontmatter(title, description, category, keywords) {
  const date = new Date().toISOString().split('T')[0];
  const tags = [...new Set([...keywords, 'Heilbronn', 'Immobilien', 'Wüstenrot'])].slice(0, 6);

  return `---
title: "${title}"
description: "${description}"
pubDate: ${date}
category: "${category}"
author: "Mezzarano Immobilien"
image: "/blog/${category.toLowerCase().replace(/[^a-z]+/g, '-')}.svg"
featured: false
tags: ${JSON.stringify(tags)}
---

`;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Bitte ein Thema angeben: node scripts/generate-blog-post.js "Thema"');
    process.exit(1);
  }

  const topic = args[0];
  const keywords = args.slice(1);

  // Ensure blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  try {
    // Generate content in parallel where possible
    console.log('🔄 Generating content...');

    const [content, seoTitle, description] = await Promise.all([
      generateBlogPost(topic, keywords),
      generateSEOTitle(topic),
      generateDescription(topic)
    ]);

    const category = detectCategory(topic, keywords);
    const slug = createSlug(seoTitle);
    const frontmatter = createFrontmatter(seoTitle, description, category, keywords);

    const fullContent = frontmatter + content;
    const filename = `${slug}.md`;
    const filepath = path.join(BLOG_DIR, filename);

    fs.writeFileSync(filepath, fullContent, 'utf-8');

    console.log(`✅ Blog post created: ${filename}`);
    console.log(`   Title: ${seoTitle}`);
    console.log(`   Category: ${category}`);
    console.log(`   Path: ${filepath}`);

    return { success: true, filename, title: seoTitle, category };
  } catch (error) {
    console.error('❌ Error generating blog post:', error.message);
    process.exit(1);
  }
}

// Export for use in other scripts
module.exports = { generateBlogPost, generateSEOTitle, detectCategory, createSlug };

// Run if called directly
if (require.main === module) {
  main();
}

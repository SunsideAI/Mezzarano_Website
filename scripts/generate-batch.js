#!/usr/bin/env node

/**
 * Batch Blog Post Generator
 * Generate multiple posts with filtering options
 *
 * Usage:
 *   node scripts/generate-batch.js --limit 5
 *   node scripts/generate-batch.js --priority high --limit 3
 */

const fs = require('fs');
const path = require('path');

const TOPICS_FILE = path.join(process.cwd(), 'src', 'content', 'blog-topics.json');
const DELAY_BETWEEN_POSTS = 5000;

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    limit: 5,
    priority: null,
    dryRun: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit' && args[i + 1]) {
      options.limit = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--priority' && args[i + 1]) {
      options.priority = args[i + 1];
      i++;
    } else if (args[i] === '--dry-run') {
      options.dryRun = true;
    }
  }

  return options;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const options = parseArgs();

  console.log('🚀 Batch Blog Generator');
  console.log(`   Limit: ${options.limit}`);
  console.log(`   Priority: ${options.priority || 'all'}`);
  console.log(`   Dry Run: ${options.dryRun}\n`);

  if (!fs.existsSync(TOPICS_FILE)) {
    console.error('❌ Topics file not found');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf-8'));
  let topics = data.topics.filter(t => !t.used);

  if (options.priority) {
    topics = topics.filter(t => t.priority === options.priority);
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  topics.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  topics = topics.slice(0, options.limit);

  if (topics.length === 0) {
    console.log('⚠️ No matching topics found');
    process.exit(0);
  }

  console.log(`📋 Topics to generate (${topics.length}):\n`);
  topics.forEach((t, i) => {
    console.log(`   ${i + 1}. [${t.priority}] ${t.title}`);
  });

  if (options.dryRun) {
    console.log('\n✅ Dry run complete. No posts generated.');
    process.exit(0);
  }

  console.log('\n🔄 Starting generation...\n');

  const { execSync } = require('child_process');
  let success = 0;
  let failed = 0;

  for (const topic of topics) {
    try {
      console.log(`📝 Generating: ${topic.title}`);

      // Call the single post generator
      execSync(
        `node scripts/generate-blog-post.js "${topic.title}" ${topic.keywords.map(k => `"${k}"`).join(' ')}`,
        { stdio: 'inherit' }
      );

      // Mark as used
      const topicIndex = data.topics.findIndex(t => t.title === topic.title);
      if (topicIndex !== -1) {
        data.topics[topicIndex].used = true;
        data.topics[topicIndex].usedDate = new Date().toISOString();
      }

      success++;

      if (topics.indexOf(topic) < topics.length - 1) {
        console.log(`⏳ Waiting ${DELAY_BETWEEN_POSTS / 1000}s...\n`);
        await sleep(DELAY_BETWEEN_POSTS);
      }
    } catch (error) {
      console.error(`❌ Failed to generate: ${topic.title}`);
      failed++;
    }
  }

  // Save updated topics
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(data, null, 2), 'utf-8');

  console.log('\n📊 Batch Complete!');
  console.log(`   ✅ Success: ${success}`);
  console.log(`   ❌ Failed: ${failed}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

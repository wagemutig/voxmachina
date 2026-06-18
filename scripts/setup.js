/**
 * VoxMachina — ElevenLabs Agent Setup Script
 *
 * Reads agent config JSONs and prompt .md files, then creates
 * agents via the ElevenLabs Conversational AI API.
 *
 * Usage: node src/setup.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const API_BASE = 'https://api.elevenlabs.io/v1/convai/agents';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY not set. Run: export ELEVENLABS_API_KEY=sk_...');
  process.exit(1);
}

const headers = {
  'xi-api-key': ELEVENLABS_API_KEY,
  'Content-Type': 'application/json',
};

async function createAgent(configPath) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const promptPath = path.resolve(ROOT, config.prompt_source);
  const prompt = fs.readFileSync(promptPath, 'utf-8');

  const payload = {
    name: config.name,
    description: config.description,
    conversation_config: {
      ...config.conversation_config,
      agent: {
        ...config.conversation_config.agent,
        prompt: {
          ...config.conversation_config.agent.prompt,
          prompt,
        },
      },
    },
  };

  console.log(`\n📤 Creating agent: ${config.name}...`);

  try {
    const res = await fetch(`${API_BASE}/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ Failed: ${res.status} ${res.statusText}`);
      console.error(`   ${err}`);
      return null;
    }

    const data = await res.json();
    const agentId = data.agent_id;

    console.log(`✅ Created: ${config.name}`);
    console.log(`   Agent ID: ${agentId}`);
    console.log(`   Widget: <elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`);
    console.log(`   Direct: https://elevenlabs.io/app/talk-to-agent/${agentId}`);

    return { name: config.name, id: agentId };
  } catch (err) {
    console.error(`❌ Network error: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('╔══════════════════════════════════════╗');
  console.log('║     VoxMachina — Agent Setup          ║');
  console.log('╚══════════════════════════════════════╝');

  const agentsDir = path.resolve(ROOT, 'agents');
  const configFiles = fs.readdirSync(agentsDir)
    .filter(f => f.endsWith('.json') && f !== 'package.json')
    .sort();

  if (configFiles.length === 0) {
    console.error('❌ No agent config files found in agents/');
    process.exit(1);
  }

  const results = [];
  for (const file of configFiles) {
    const result = await createAgent(path.join(agentsDir, file));
    if (result) results.push(result);
  }

  console.log('\n' + '='.repeat(50));
  console.log('\n📋 Summary:');
  for (const r of results) {
    console.log(`   ${r.name.padEnd(40)} ${r.id}`);
  }

  // Save agent IDs for the orchestrator
  const envPath = path.resolve(ROOT, '.env');
  let env = '';
  if (fs.existsSync(envPath)) {
    env = fs.readFileSync(envPath, 'utf-8');
  }

  for (const r of results) {
    const key = r.name.includes('Barker') ? 'MR_BARKER_AGENT_ID' : 'MS_GOODWILL_AGENT_ID';
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(env)) {
      env = env.replace(regex, `${key}=${r.id}`);
    } else {
      env += `\n${key}=${r.id}`;
    }
  }

  fs.writeFileSync(envPath, env.trim() + '\n');
  console.log(`\n💾 Agent IDs saved to .env`);
  console.log('\n✅ Setup complete!');
}

main().catch(console.error);
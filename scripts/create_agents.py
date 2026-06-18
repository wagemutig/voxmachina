#!/usr/bin/env python3
"""Create VoxMachina ElevenLabs agents via API."""
import json, os, sys, requests

KEY = os.environ.get("ELEVENLABS_API_KEY")
if not KEY:
    print("❌ Set ELEVENLABS_API_KEY")
    sys.exit(1)

def prompt_text(path):
    with open(path) as f:
        return f.read()

ROOT = "/opt/data/voxmachina"
HEADERS = {"xi-api-key": KEY, "Content-Type": "application/json"}

agents = [
    {
        "config_file": f"{ROOT}/agents/barker.json",
        "prompt_file": f"{ROOT}/prompts/barker.md",
    },
    {
        "config_file": f"{ROOT}/agents/goodwill.json",
        "prompt_file": f"{ROOT}/prompts/goodwill.md",
    },
]

for a in agents:
    with open(a["config_file"]) as f:
        cfg = json.load(f)
    prompt = prompt_text(a["prompt_file"])
    payload = {
        "name": cfg["name"],
        "description": cfg["description"],
        "conversation_config": {
            **cfg["conversation_config"],
            "agent": {
                **cfg["conversation_config"]["agent"],
                "prompt": {**cfg["conversation_config"]["agent"]["prompt"], "prompt": prompt},
            },
        },
    }
    print(f"\n📤 Creating: {cfg['name']}...")
    r = requests.post("https://api.elevenlabs.io/v1/convai/agents/create", headers=HEADERS, json=payload)
    if r.ok:
        aid = r.json()["agent_id"]
        print(f"✅ Agent ID: {aid}")
        print(f"   https://elevenlabs.io/app/talk-to-agent/{aid}")
    else:
        print(f"❌ {r.status_code}: {r.text[:200]}")

print("\nDone.")

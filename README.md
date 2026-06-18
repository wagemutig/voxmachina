# VoxMachina

> **Vox** (Latin: voice) + **Machina** (Latin: machine, engine) — Voice-driven conversational AI training.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![ElevenLabs](https://img.shields.io/badge/Powered%20by-ElevenLabs-000?logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==)](https://elevenlabs.io)
[![GitHub](https://img.shields.io/badge/GitHub-wagemutig%2Fvoxmachina-181717?logo=github)](https://github.com/wagemutig/voxmachina)

**VoxMachina** is a voice-only conversational AI training bot that creates immersive, adaptive practice scenarios for language learning and sales training. It uses [ElevenLabs Agents](https://elevenlabs.io) with two distinct AI personas that engage learners in natural, spoken dialogue — no typing, no chat UI, just real-time voice conversations.

---

## ✨ Features

- **🎙️ Voice-First Experience** — Pure voice conversation via ElevenLabs' low-latency voice agents. No text chat, no typing.
- **🧑‍🏫 Two Personas, One Goal**
  - **Mr. Barker** — English-speaking customer persona using adaptive Bloom's taxonomy questioning to challenge and assess the learner
  - **Ms. Goodwill** — German-speaking mentor persona for session briefing and reflective debrief
- **🎯 Adaptive Questioning** — Mr. Barker dynamically adjusts question difficulty based on learner responses (Bloom's Taxonomy: remember → understand → apply → analyze → evaluate → create)
- **🇩🇪🇬🇧 Bilingual** — English sales scenarios with German mentoring, designed for European business contexts
- **⚡ Real-time Voice** — Powered by ElevenLabs' conversational AI stack for natural turn-taking and realistic prosody
- **🔧 Extensible** — Add new personas, scenarios, or languages by defining agent configurations

---

## 🧠 Architecture

```
┌─────────────────────┐
│     Learner         │
│  (voice input)      │
└────────┬────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│         ElevenLabs Agents           │
│                                     │
│  ┌──────────────┐  ┌──────────────┐ │
│  │  Mr. Barker  │  │ Ms. Goodwill │ │
│  │  (English)   │  │  (German)    │ │
│  │  Sales Coach │  │  Mentor      │ │
│  │  Bloom's     │  │  Briefing &  │ │
│  │  Taxonomy    │  │  Reflection  │ │
│  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────┐
│   Session Logging   │
│   & Configuration   │
└─────────────────────┘
```

The system is entirely agent-driven — no backend server or frontend required. Personas are defined as ElevenLabs agent configurations with system prompts that encode teaching methodology.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (for agent configuration tooling)
- [ElevenLabs](https://elevenlabs.io) account with Conversational AI access
- ElevenLabs API key

### Installation

```bash
# Clone the repository
git clone https://github.com/wagemutig/voxmachina.git
cd voxmachina

# Install dependencies
npm install
```

### Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Add your ElevenLabs API key:
   ```
   ELEVENLABS_API_KEY=your_api_key_here
   ```

3. Configure agent IDs for Mr. Barker and Ms. Goodwill (see [Configuration](#configuration) section).

### Usage

```bash
# Start a training session with Mr. Barker
npm run start:barker

# Start a briefing session with Ms. Goodwill
npm run start:goodwill
```

---

## 🎭 Personas

### Mr. Barker (English)

> **Role:** Customer in sales scenarios
> **Method:** Adaptive Bloom's Taxonomy questioning
> **Language:** English
> **Context:** Simulates real-world sales conversations — product demos, objection handling, negotiation, and closing. Adapts question complexity to the learner's demonstrated proficiency.

### Ms. Goodwill (German)

> **Role:** Training mentor
> **Method:** Guided briefing and structured reflection
> **Language:** German
> **Context:** Prepares the learner before each session (context, vocabulary, objectives) and facilitates structured post-session reflection (strengths, areas for improvement, key learnings).

---

## 🔧 Configuration

VoxMachina is configured via environment variables:

| Variable | Description | Required |
|---|---|---|
| `ELEVENLABS_API_KEY` | ElevenLabs API key | ✅ |
| `MR_BARKER_AGENT_ID` | ElevenLabs agent ID for Mr. Barker | ✅ |
| `MS_GOODWILL_AGENT_ID` | ElevenLabs agent ID for Ms. Goodwill | ✅ |
| `DEFAULT_LANGUAGE` | `en` or `de` | ❌ (default: `en`) |

---

## 📁 Project Structure

```
voxmachina/
├── agents/              # ElevenLabs agent configuration files
│   ├── barker.json      # Mr. Barker persona definition
│   └── goodwill.json    # Ms. Goodwill persona definition
├── prompts/             # System prompts and teaching methodology
│   ├── barker.md        # Mr. Barker's Bloom's taxonomy prompt
│   └── goodwill.md      # Ms. Goodwill's mentoring prompt
├── src/                 # Source code
│   ├── index.js         # Entry point
│   └── config.js        # Configuration loader
├── .env.example         # Environment variable template
├── .gitignore
├── LICENSE              # MIT License
└── README.md            # This file
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-idea`)
3. **Commit** your changes (`git commit -m 'feat: add amazing idea'`)
4. **Push** to the branch (`git push -u origin feature/amazing-idea`)
5. **Open a Pull Request**

Please follow [conventional commits](https://www.conventionalcommits.org/) for commit messages.

### Idea Roadmap

- [ ] Add more personas for different industries (tech, healthcare, finance)
- [ ] Support additional languages (French, Spanish, Japanese)
- [ ] Session recording and playback
- [ ] Progress tracking and scoring dashboard
- [ ] Custom scenario builder
- [ ] Integration with LMS platforms

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [ElevenLabs](https://elevenlabs.io) for their conversational AI platform
- Bloom's Taxonomy framework for adaptive questioning methodology
- [Xara XR](https://xara.ai) — inspiration for immersive training experiences
# Module 1: AI Product Design Set up

## Table of Contents

- [What this module covers](#what-this-module-covers)
- [Exercise](#exercise)
- [Setup Steps](#setup-steps)
  - [Install VS Code](#install-vs-code)
  - [GitHub Copilot access](#github-copilot-access)
  - [Set up GitHub in VS Code](#set-up-github-in-vs-code)
  - [Clone the project repo](#clone-the-project-repo)
  - [Figma set up](#figma-set-up)
  - [Install Carbon MCP in VS Code](#install-carbon-mcp-in-vs-code)
  - [Create a Markdown File](#create-a-markdown-file)
- [Reference](#reference)
  - [What Agents Are](#what-agents-are)
  - [Skill vs Agent](#skill-vs-agent)
  - [What a Markdown File Is](#what-a-markdown-file-is)
  - [GitHub Basics](#github-basics)
  - [How GitHub Works with VS Code](#how-github-works-with-vs-code)

## What this module covers

- GitHub basics, markdown files, Bob/VS Code setup (brew, etc.), Figma Make, agent modes.
- Context files: what they are, how to structure them, and how agents use them to produce better output.
- The agent interaction model: what agents are, what they are good at, and what they are not.
- Using basic skills, like running a screenshot/mockup against our design principles.
- Information Security Advisor: stress-tests security UX through three perspectives: SecOps (incident response), Compliance (audit trails), and Platform (deployment constraints).
- (Optional) Creating a skill.

## Exercise

Clone a skill repo from GitHub, take the design principles skill, and apply it to a screenshot of something the designer has been working on. In addition, use the Information Security Advisor mode and ask it to analyze the feature as well. Create a markdown file with both assessments and commit the file to GitHub.

## Setup Steps

### Install VS Code

Install VS Code if you do not already have it.

### GitHub Copilot access

- Doormat
- Log in with Okta
- App access
- Request access
- GitHub Copilot users

### Set up GitHub in VS Code

#### Prerequisites

- **Install Git** (required for VS Code's Git features):
  - macOS: run `git --version` in Terminal. If it is missing, it will prompt you to install Xcode Command Line Tools, or install via Homebrew: `brew install git`.
  - Verify: `git --version` should print a version number.
- Install VS Code if you have not.
- Have a GitHub account.

#### Step 1: Tell Git who you are

Run these once in the terminal (the VS Code terminal works: `` Ctrl/Cmd+` ``). This stamps your commits with your identity.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the same email as your GitHub account so commits link to your profile.

#### Step 2: Sign in to GitHub from VS Code

VS Code has built-in GitHub authentication.

- Click the **Accounts** icon (the person icon at the bottom-left of the Activity Bar).
- Choose **Sign in with GitHub** (or "Turn on Cloud Settings Sync... with GitHub").
- Your browser opens; **Authorize** Visual Studio Code.
- The browser hands you back to VS Code. You are now signed in.

This authorizes both general GitHub access and the Pull Requests extension.

#### Step 3: Install the GitHub Pull Requests extension (recommended)

- Open the **Extensions** panel (`Ctrl/Cmd+Shift+X`).
- Search for "GitHub Pull Requests" (publisher: GitHub).
- Click **Install**. (It is often pre-bundled, but confirm it is enabled.)

This adds PR and issue management directly inside VS Code.

#### Step 4: Get a repository into VS Code

You have three common paths:

**A) Clone an existing GitHub repo**

- Open the Command Palette (`Ctrl/Cmd+Shift+P`).
- Type "Git: Clone" and select it.
- Choose "Clone from GitHub" (since you are signed in) and pick a repo, or paste a repo URL.
- Choose a local folder. VS Code clones it and offers to open it.

**B) Open a local folder that is already a Git repo**

- File -> Open Folder. The Source Control panel lights up automatically.

**C) Turn a local folder into a repo and publish it**

- File -> Open Folder (your project).
- Open **Source Control** (`Ctrl/Cmd+Shift+G`).
- Click **Initialize Repository**.
- Stage and commit your files (see next step).
- Click **Publish Branch** -> choose **public** or **private**. VS Code creates the GitHub repo and pushes for you.

#### Step 5: Make your first commit

- Edit or add a file. Changed files appear in the **Source Control** panel.
- Hover a file and click **+** to stage it (or stage all with the **+** next to "Changes").
- Type a commit message in the box at the top.
- Click the checkmark (Commit) button.

#### Step 6: Push to GitHub

- If the branch is not on GitHub yet, click **Publish Branch**.
- Otherwise click **Sync Changes** (the circular arrows in the status bar or Source Control header). This pushes your commits and pulls any new ones.

#### Step 7: Work with branches

- The status bar bottom-left shows your current branch.
- Click it to switch branches or create a new branch.
- Typical flow: create a feature branch, commit work, publish it, then open a PR.

#### Step 8: Open a Pull Request (without leaving VS Code)

- After pushing a feature branch, open the **GitHub** view in the Activity Bar (added by the PR extension).
- Click **Create Pull Request**.
- Set the base branch (usually `main`), title, and description.
- Submit. You can then review comments, see CI checks, and merge the PR from inside VS Code.

#### Quick Verification Checklist

- `git --version` works in the terminal.
- Accounts icon shows you are signed in to GitHub.
- Source Control panel shows file changes when you edit.
- You can commit, push, and see the commit appear on github.com.

#### Common Gotchas

- **"Git not found":** install Git, then fully restart VS Code.
- **Auth fails on push:** sign out/in via the Accounts icon, or re-authorize VS Code in GitHub (Settings -> Applications -> Authorized OAuth Apps).
- **Wrong author on commits:** re-run the `git config --global user.email` command with your GitHub email.
- **Want VS Code as your merge/diff editor:** run `git config --global core.editor "code --wait"`.

### Clone the project repo

- Navigate to GitHub.
- Hit the **Code** dropdown and download the zip.
- Place the zip where you want it to exist.
  - Recommendation: go to Documents, create a new folder called `Code`, and place the folder in `Code`.
  - Unzip it.
  - Make new folders for specific projects.
  - Click and drag the folder into the VS Code icon and grant permission.

### Figma set up

- Select the Figma logo in the left side panel.
- When VS Code asks whether to open an external website, choose **Open**.
- Open Figma for VS Code.
- Files marked as dev can be viewed.

### Install Carbon MCP in VS Code

#### Step 1: Get an IBMid

You will authenticate via OAuth using your IBMid (w3id for IBMers). If you do not have one, create it at the IBM signup page. IBM product teams can alternatively use a functional ID.

#### Step 2: Get your access credentials

1. Visit the auth link to generate your token and session ID.
2. Request access if prompted (IBMers get credentials immediately; others must request access).
3. Check your email for the activation link.
4. Copy your two credentials: the access token and the session ID. Keep these handy.

#### Step 3: Install the MCP server in VS Code

**Option A - One-click install (easiest)**

1. On the Carbon onboarding page, click the "Install carbon-mcp" badge/button. It opens VS Code and pre-fills the config.
2. When prompted, paste your token and then your session ID.

**Option B - CLI install**

Run this in your terminal, replacing `<TOKEN>` and `<SESSION>` with your credentials:

```bash
code --add-mcp '{"name":"carbon-mcp","type":"http","url":"https://mcp.carbondesignsystem.com/mcp","headers":{"Authorization":"Bearer <TOKEN>","X-MCP-Session":"<SESSION>"}}'
```

Security tip: install at the user/global level, not in a project workspace, to avoid committing your token to a repo.

#### Step 4: Add the carbon-builder skill (recommended)

This gives the agent Carbon-specific context for better output.

1. Download the carbon-builder skill zip from the onboarding page and unzip it.
2. Place the `carbon-builder/` folder in one of these locations:

- Team/project-scoped: `.github/skills/` in your repo (commit it so teammates get it).

```bash
mkdir -p /path/to/your-project/.github/skills
cp -r carbon-builder /path/to/your-project/.github/skills/
```

- Global (all local projects): `~/.copilot/skills/`.

```bash
mkdir -p ~/.copilot/skills
cp -r carbon-builder ~/.copilot/skills/
```

VS Code also accepts `.claude/skills/` or `.agents/skills/` (project) and `~/.claude/skills/` or `~/.agents/skills/` (personal).

#### Step 5: Verify

- Open the Command Palette and run Chat: Open Chat Customizations, then check the Skills tab for carbon-builder. Or type `/skills` in chat.
- The MCP server appears in your MCP/tools list once VS Code reconnects. If tools do not show, reload VS Code.

VS Code auto-loads the skill when a task matches Carbon work, and the MCP server provides `code_search`, `docs_search`, and `get_charts` tools.

### Create a Markdown File

#### Step 1: Locate the source and destination

- In the Finder window, select the document to be converted into a Markdown file in VS Code. From here you have two options to place the file in VS Code:
  - Drag the file into the left side panel to the folder where you want the file to reside.
  - Open a second Finder window, find the folder connected to VS Code, and drag the file into it. The file then automatically populates in VS Code under the respective folder.

#### Step 2: VS Code input

- In the chat window, right-click the file and select "Copy Path". Right-click or press `Ctrl+V` in the chat and paste the copied path.
- After the path, type "Convert this file to a markdown (or MD)" and specify other actions. For example:
  - (Filename path) convert this file into a markdown file. Preserve the raw document and create a second document to serve as a summary.

#### Step 3: Save to the correct location

- Write the file into the project's raw-documents folder (or the appropriate write zone). Keep the verbatim conversion separate from any synthesized summary.

#### Step 4: (optional) Synthesize a summary

For PPD work, follow the conversion with a meeting-notes synthesis: extract TL;DR, Context, Key Discussion Points, Decisions, Action Items, and Open Questions, and save that summary to the meetings stage. The verbatim conversion stays as the source of truth; the summary is the usable context artifact.

#### Step 5: Verify

- Open the markdown in a preview (`Cmd+Shift+V` in VS Code) and confirm headings, lists, and tables render.
- Spot-check that no content was dropped during extraction.
- Clean up any temporary extraction folders.

## Reference

### What Agents Are

An agent is an AI system that can take actions on your behalf to accomplish a goal, not just generate text. It combines a language model (the reasoning engine) with tools (functions it can call) and a loop that lets it decide, act, observe results, and continue until the task is done.

Core characteristics:

- **Goal-directed:** you give it an objective ("fix this bug", "book a flight"), and it figures out the steps rather than needing each one spelled out.
- **Tool use:** it can call external functions - read/write files, run code, query APIs, search the web - to affect the real world and gather information.
- **Autonomy in a loop:** it works iteratively: plan -> act -> observe -> adjust. It self-corrects based on results instead of producing a single one-shot answer.
- **Memory/context:** it tracks what it has done and learned within a task (and sometimes across tasks) to inform later decisions.

How it differs from a plain chatbot:

| Plain LLM/chatbot | Agent |
|---|---|
| Responds with text only | Takes actions via tools |
| One turn in, one turn out | Runs multi-step loops |
| You direct each step | It plans and adapts |
| No side effects | Changes files, calls APIs, etc. |

Common types:

- Coding agents (like this one) - edit code, run commands, run tests.
- Subagents - specialized agents a main agent delegates to (e.g., a search agent or a design specialist).
- Assistants/copilots - embedded in apps to automate workflows.

Simple mental model:

Agent = LLM (brain) + Tools (hands) + Loop (persistence) aimed at a goal.

In this repo specifically, agents also route to skills (focused instruction sets) and subagents (like product-designer or design-method-finder) to handle specialized design tasks.

### Skill vs Agent

Skills and agents are two ways to apply the same specialized expertise. They are not competitors; an agent usually loads a skill. Knowing the difference tells you when to work inline versus when to delegate.

**What a skill is**

A skill is a packaged instruction set plus bundled resources (reference docs, templates, cheat sheets) that you load into your current chat. Loading a skill injects its guidance - its core model, operating rules, and pointers to resource files - directly into the context you are already working in. You stay in the driver's seat: you run each step, you see every file that gets read, and you decide how much of the skill's material to use.

**What an agent (subagent) is**

An agent is that same expertise packaged as a delegate that runs in its own isolated context. You hand it a written brief and it works autonomously - reading files, reasoning, and producing a deliverable - then returns a single final report. It is pre-loaded with its persona/skill and decides for itself which resource files to open. You do not see its intermediate steps; you get the result.

**How they compare**

| Dimension | Skill (inline) | Agent (delegated subagent) |
|---|---|---|
| Where it runs | Your main thread, in your current context | A separate, fresh context that is spawned |
| Visibility | You see every read and reasoning step | You see only the final report, not the intermediate work |
| Inputs | You pull the source material into your own context | You pass a brief; the agent reads the files itself |
| Resource use | You apply the skill's resources as needed, often lightly | The agent is more likely to open and apply the bundled resources itself |
| Autonomy | You make each move, step by step | The agent works on its own, then returns once |
| Correction | You self-correct continuously and can interrupt | One-shot and detached; you find out at the end if it drifted |
| Main-thread token cost | Higher - all source text sits in your context | Lower - source text stays in the agent's context; only its summary returns |

**When to use each**

- Use a **skill inline** when the task is bounded and well-specified, when you want to see and steer the reasoning, or when you already have the key source material in front of you. Inline work is best for tight iteration and full traceability.
- Dispatch an **agent** when the work is large, parallelizable, or context-heavy enough to crowd your main thread; when you want several deliverables produced at once; or when you want an independent second pass (for example, a critique). Delegation mainly saves main-context tokens and runs work autonomously.

**Writing a good agent brief**

Because an agent starts blind, its brief must be self-contained:

- Absolute paths to every input file, with an instruction to read them all.
- The exact deliverable and its constraints.
- The output path (in an approved write zone).
- A verification instruction so the agent checks its own work before returning.

**The bottom line**

The skill is the instruction set and resources; the agent is a delegate that loads that skill to handle a task autonomously in its own context window. Use the skill when working inline; dispatch the agent when you want to offload a self-contained deliverable.

### What a Markdown File Is

Markdown is a lightweight plain-text formatting syntax. A markdown file is a regular text file (extension `.md`) that uses simple punctuation marks to indicate structure - headings, lists, bold, links - which tools then render as formatted output.

Why it is used throughout this repo:

- **Plain text** - readable as-is, diff-friendly in git, and editable in any editor.
- **Portable** - renders on GitHub, in VS Code preview, and in most note tools, with no special software.
- **Agent-readable** - consistent headings and structure let AI agents grep, cite, and build on the content. This is why every PPD artifact (meeting notes, strategy, PDRs) is markdown.
- **Lossless source** - it stores structure without locking content inside a proprietary binary format like `.docx`.

### GitHub Basics

#### Core Concepts

- **Git** is the version control system that tracks changes to files. **GitHub** is a cloud platform that hosts Git repositories and adds collaboration features (pull requests, issues, reviews, CI/CD).
- **Repository (repo):** a project's folder plus its full history of changes.
- **Commit:** a saved snapshot of your changes with a message describing what changed.
- **Branch:** a parallel line of work. `main` (or `master`) is the default. You create feature branches to work without affecting `main`.
- **Remote:** the GitHub-hosted copy of your repo (usually named `origin`). Your machine has a local copy.

#### The Basic Workflow

- **Clone** a repo to your machine: `git clone <url>`
- **Create a branch:** `git checkout -b my-feature`
- **Make changes**, then **stage** them: `git add <files>`
- **Commit:** `git commit -m "Describe the change"`
- **Push** to GitHub: `git push origin my-feature`
- **Open a Pull Request (PR)** on GitHub to propose merging your branch into `main`.
- **Review and merge** the PR, then delete the branch.

#### Good Habits

- Commit small, logical chunks with clear messages.
- Pull before you start work to stay up to date.
- Use branches for new work; keep `main` stable.
- Never commit secrets (API keys, passwords); use `.gitignore`.

### How GitHub Works with VS Code

VS Code has Git and GitHub support built in, so you rarely need the terminal.

Built-in Git (no extension needed):

- **Source Control panel** (the branch icon in the left sidebar, `Ctrl/Cmd+Shift+G`) shows changed files.
- Stage files with the **+**, type a commit message, and click the checkmark to commit.
- The status bar (bottom-left) shows your current branch; click it to switch or create branches.
- **Sync** button pushes/pulls with one click.
- Edited, added, and deleted files are color-coded in the Explorer, and the gutter shows line-level changes.

GitHub integration (via the GitHub Pull Requests extension, often pre-installed):

- **Sign in to GitHub** directly in VS Code to authenticate.
- **Clone** a repo: Command Palette (`Ctrl/Cmd+Shift+P`) -> "Git: Clone" -> pick a GitHub repo.
- **Publish** a local project straight to a new GitHub repo with one command.
- Create, review, and merge Pull Requests without leaving the editor.
- View and comment on issues, and create branches directly from an issue.
- Merge conflicts get a visual editor with "Accept Current / Incoming / Both" buttons.

Typical VS Code flow:

- Clone or open a repo.
- Edit files; changes appear in Source Control.
- Stage, write a message, commit.
- Click **Publish Branch** / **Sync** to push.
- Use the GitHub PR extension to open and manage the pull request.

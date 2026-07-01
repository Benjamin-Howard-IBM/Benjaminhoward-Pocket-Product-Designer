# GitHub Basics

## Core Concepts

- **Git** is the version control system that tracks changes to files. **GitHub** is a cloud platform that hosts Git repositories and adds collaboration features (pull requests, issues, reviews, CI/CD).
- **Repository (repo):** A project's folder plus its full history of changes.
- **Commit:** A saved snapshot of your changes with a message describing what changed.
- **Branch:** A parallel line of work. `main` (or `master`) is the default. You create feature branches to work without affecting `main`.
- **Remote:** The GitHub-hosted copy of your repo (usually named `origin`). Your machine has a local copy.

## The Basic Workflow

1. **Clone** a repo to your machine: `git clone <url>`
2. **Create a branch:** `git checkout -b my-feature`
3. **Make changes**, then **stage** them: `git add <files>`
4. **Commit:** `git commit -m "Describe the change"`
5. **Push** to GitHub: `git push origin my-feature`
6. **Open a Pull Request (PR)** on GitHub to propose merging your branch into `main`.
7. **Review and merge** the PR, then delete the branch.

## Key Terms

| Term | Meaning |
|---|---|
| **Fork** | Your own copy of someone else's repo under your account |
| **Pull Request** | A request to merge changes; where review and discussion happen |
| **Issue** | A tracked task, bug, or feature request |
| **Pull / Fetch** | Download changes from GitHub (`git pull` fetches + merges) |
| **Merge conflict** | When two changes touch the same lines and Git needs you to resolve them |
| **`.gitignore`** | A file listing things Git should not track (build output, secrets) |

## How GitHub Works with VS Code

VS Code has Git and GitHub support built in, so you rarely need the terminal.

**Built-in Git (no extension needed):**

- **Source Control panel** (the branch icon in the left sidebar, `Ctrl/Cmd+Shift+G`) shows changed files.
- Stage files with the `+`, type a commit message, and click the checkmark to commit.
- The **status bar** (bottom-left) shows your current branch; click it to switch or create branches.
- **Sync** button pushes/pulls with one click.
- Edited, added, and deleted files are color-coded in the Explorer, and the gutter shows line-level changes.

**GitHub integration (via the GitHub Pull Requests extension, often pre-installed):**

- **Sign in to GitHub** directly in VS Code to authenticate.
- **Clone** a repo: Command Palette (`Ctrl/Cmd+Shift+P`) -> "Git: Clone" -> pick a GitHub repo.
- **Publish** a local project straight to a new GitHub repo with one command.
- **Create, review, and merge Pull Requests** without leaving the editor.
- **View and comment on issues**, and create branches directly from an issue.
- Merge conflicts get a visual editor with "Accept Current / Incoming / Both" buttons.

**Typical VS Code flow:**

1. Clone or open a repo.
2. Edit files; changes appear in Source Control.
3. Stage, write a message, commit.
4. Click **Publish Branch** / **Sync** to push.
5. Use the GitHub PR extension to open and manage the pull request.

## Good Habits

- Commit small, logical chunks with clear messages.
- Pull before you start work to stay up to date.
- Use branches for new work; keep `main` stable.
- Never commit secrets (API keys, passwords); use `.gitignore`.

# Setting Up GitHub in VS Code - Walkthrough

## Prerequisites

1. **Install Git** (required for VS Code's Git features):
   - macOS: run `git --version` in Terminal. If it's missing, it'll prompt you to install Xcode Command Line Tools, or install via Homebrew: `brew install git`
   - Verify: `git --version` should print a version number.
2. **Install VS Code** if you haven't: https://code.visualstudio.com
3. **Have a GitHub account:** https://github.com

## Step 1: Tell Git who you are

Run these once in the terminal (VS Code terminal works: `` Ctrl/Cmd+` ``). This stamps your commits with your identity.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the same email as your GitHub account so commits link to your profile.

## Step 2: Sign in to GitHub from VS Code

VS Code has built-in GitHub authentication.

1. Click the **Accounts** icon (the person icon at the bottom-left of the Activity Bar).
2. Choose **Sign in with GitHub** (or "Turn on Cloud Settings Sync... with GitHub").
3. Your browser opens; **Authorize** Visual Studio Code.
4. The browser hands you back to VS Code. You're now signed in.

This authorizes both general GitHub access and the Pull Requests extension.

## Step 3: Install the GitHub Pull Requests extension (recommended)

1. Open the **Extensions** panel (`Ctrl/Cmd+Shift+X`).
2. Search for **"GitHub Pull Requests"** (publisher: GitHub).
3. Click **Install**. (It's often pre-bundled, but confirm it's enabled.)

This adds PR and issue management directly inside VS Code.

## Step 4: Get a repository into VS Code

You have three common paths:

**A) Clone an existing GitHub repo**

1. Open the Command Palette (`Ctrl/Cmd+Shift+P`).
2. Type **"Git: Clone"** and select it.
3. Choose **"Clone from GitHub"** (since you're signed in) and pick a repo, or paste a repo URL.
4. Choose a local folder. VS Code clones it and offers to open it.

**B) Open a local folder that's already a Git repo**

- File -> Open Folder. The Source Control panel lights up automatically.

**C) Turn a local folder into a repo and publish it**

1. File -> Open Folder (your project).
2. Open **Source Control** (`Ctrl/Cmd+Shift+G`).
3. Click **Initialize Repository**.
4. Stage and commit your files (see next step).
5. Click **Publish Branch** -> choose **public** or **private**. VS Code creates the GitHub repo and pushes for you.

## Step 5: Make your first commit

1. Edit or add a file. Changed files appear in the **Source Control** panel.
2. Hover a file and click **+** to stage it (or stage all with the **+** next to "Changes").
3. Type a **commit message** in the box at the top.
4. Click the **checkmark** (Commit) button.

## Step 6: Push to GitHub

- If the branch isn't on GitHub yet, click **Publish Branch**.
- Otherwise click **Sync Changes** (the circular arrows in the status bar or Source Control header). This pushes your commits and pulls any new ones.

## Step 7: Work with branches

- The **status bar bottom-left** shows your current branch.
- Click it to **switch branches** or **create a new branch**.
- Typical flow: create a feature branch, commit work, publish it, then open a PR.

## Step 8: Open a Pull Request (without leaving VS Code)

1. After pushing a feature branch, open the **GitHub** view in the Activity Bar (added by the PR extension).
2. Click **Create Pull Request**.
3. Set the base branch (usually `main`), title, and description.
4. Submit. You can then review comments, see CI checks, and **merge** the PR from inside VS Code.

## Quick Verification Checklist

- `git --version` works in the terminal.
- Accounts icon shows you're signed in to GitHub.
- Source Control panel shows file changes when you edit.
- You can commit, push, and see the commit appear on github.com.

## Common Gotchas

- **"Git not found":** Install Git, then fully restart VS Code.
- **Auth fails on push:** Sign out/in via the Accounts icon, or re-authorize VS Code in GitHub (Settings -> Applications -> Authorized OAuth Apps).
- **Wrong author on commits:** Re-run the `git config --global user.email` command with your GitHub email.
- **Want VS Code as your merge/diff editor:** run `git config --global core.editor "code --wait"`.

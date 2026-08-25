import type { Lesson } from '@/types';

export const GIT_LESSONS: Lesson[] = [
  {
    id: 'git-basics',
    moduleKey: 'git',
    title: 'Git Fundamentals — Version Control',
    slug: 'basics',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['git', 'version-control', 'init', 'commit', 'staging'],
    explanation: 'Git is the world\'s most widely used distributed version control system. It tracks every change you make to your code, lets you travel back in time to any previous state, and enables multiple developers to collaborate without overwriting each other\'s work.',
    beginnerExplanation: 'Think of Git as a powerful "undo" button combined with a time machine for your code. Every time you make a significant change, you take a "snapshot" called a commit. If something breaks, you can instantly go back to any previous snapshot — even from months ago. Without Git, you\'d be stuck saving files like "project_final_v3_REAL_FINAL.zip".',
    technicalExplanation: 'Git is a distributed VCS (DVCS) where every developer has a full copy of the repository including all history. It uses a DAG (Directed Acyclic Graph) of commit objects, each containing a SHA-1 hash pointer to its parent commit(s), a tree object (file snapshot), author metadata, and a message. The three working areas are: Working Directory (your files), Staging Area (index), and Repository (.git directory).',
    keyPoints: [
      'git init — Creates a new empty .git repository in the current folder',
      'git add <file> — Stages changes from Working Directory to the Staging Area',
      'git commit -m "message" — Saves staged snapshot permanently to repository history',
      'git status — Shows which files are modified, staged, or untracked',
      'git log — Displays commit history with hashes, authors, dates, and messages',
      'git diff — Shows exact line-by-line changes not yet staged'
    ],
    codeExample: `# Initialize a new Git repository
git init my-java-project
cd my-java-project

# Check current status (untracked files)
git status

# Stage all files for commit
git add .

# Create your first commit snapshot
git commit -m "feat: initial project setup with Main.java"

# View commit history
git log --oneline

# See line-by-line changes since last commit
git diff

# Configure your identity (first time only)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"`,
    codeLanguage: 'bash',
    codeLines: [
      { code: 'git init', token: 'init', explanation: 'Creates a hidden .git/ folder with the complete repository structure.' },
      { code: 'git add .', token: 'add .', explanation: 'Stages ALL changes in the current directory — the dot means "everything here".' },
      { code: 'git commit -m "feat: ..."', token: 'commit', explanation: 'Permanently saves the staged snapshot. The -m flag provides the required commit message inline.' },
      { code: 'git log --oneline', token: 'log', explanation: 'Shows a compact one-line-per-commit history with short SHA hashes.' }
    ],
    visualizer: 'git-workflow',
    quiz: [
      {
        id: 'q-git-1',
        type: 'mcq',
        question: 'What does "git add ." do in a Git repository?',
        options: [
          'Creates a new commit with all changes',
          'Stages all changes in the current directory for the next commit',
          'Uploads files to GitHub',
          'Initializes a new Git repository'
        ],
        answer: 1,
        explanation: '"git add ." moves all modified and new files from the Working Directory into the Staging Area. The dot means "this entire directory". You must stage before you can commit.',
        points: 15
      },
      {
        id: 'q-git-2',
        type: 'mcq',
        question: 'Which command shows the full history of commits in a repository?',
        options: ['git status', 'git diff', 'git log', 'git show'],
        answer: 2,
        explanation: '"git log" displays all commits in reverse chronological order showing SHA hash, author, date, and message. Add --oneline for a compact single-line view.',
        points: 10
      },
      {
        id: 'q-git-3',
        type: 'mcq',
        question: 'What is the CORRECT sequence to save changes in Git?',
        options: [
          'commit → add → push',
          'add → commit → push',
          'push → add → commit',
          'init → commit → add'
        ],
        answer: 1,
        explanation: 'The correct Git workflow is: (1) Make changes, (2) git add to stage them, (3) git commit to save the snapshot, (4) git push to upload to remote.',
        points: 15
      }
    ],
    practice: [
      {
        id: 'p-git-1',
        type: 'predict-output',
        question: 'You run "git log --oneline" after making 3 commits. How many lines of output do you expect?',
        answer: '3 lines — one for each commit',
        hint: '--oneline displays exactly one line per commit, so 3 commits = 3 lines.'
      },
      {
        id: 'p-git-2',
        type: 'find-bug',
        question: 'A developer runs these commands and gets an error on the last step:\ngit init\ngit commit -m "first commit"\nWhat went wrong?',
        code: 'git init\ngit commit -m "first commit"',
        answer: 'Missing "git add ." step. You cannot commit without staging files first. Git will say "nothing to commit" or error.',
        hint: 'You must always stage (add) files before committing them.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-git-1',
        question: 'Explain the difference between "git add", "git commit", and "git push".',
        level: 'beginner',
        answer: '"git add" moves changes from your working directory to the staging area (index). "git commit" permanently saves those staged changes as a snapshot in your local repository with a message. "git push" uploads your local commits to a remote repository like GitHub so others can see your changes.',
        example: 'Think of it as: add = pack your suitcase, commit = lock the suitcase, push = ship it to the destination.'
      },
      {
        id: 'iq-git-2',
        question: 'What is the purpose of .gitignore?',
        level: 'beginner',
        answer: '.gitignore is a file that tells Git which files and folders to completely ignore — never track, stage, or commit them. Commonly ignored items include: /target (compiled Java output), .env files (secrets), node_modules/, *.log files, and IDE config files like .idea/ or .vscode/.',
        example: 'Example .gitignore for Java:\n/target\n*.class\n.env\n.idea/'
      }
    ],
    xpReward: 40
  },
  {
    id: 'git-workflow',
    moduleKey: 'git',
    title: 'Branching, Merging & Collaboration',
    slug: 'workflow',
    difficulty: 'beginner',
    duration: 14,
    order: 2,
    prerequisites: ['git-basics'],
    tags: ['git', 'branch', 'merge', 'pull-request', 'remote', 'github'],
    explanation: 'Git branches let multiple features be developed simultaneously without interfering with each other. The main branch holds production-ready code while feature branches contain work-in-progress changes. GitHub Pull Requests (PRs) provide a formal code review process before merging.',
    beginnerExplanation: 'Imagine you\'re writing a book and your colleague wants to add a new chapter while you fix typos in the existing chapters. With Git branches, you each get your own "copy" of the book to work on simultaneously. When both are done, you merge them back into one complete book. Branches prevent stepping on each other\'s work.',
    technicalExplanation: 'A Git branch is simply a lightweight movable pointer to a specific commit SHA. When you create a branch, Git creates a new pointer — no files are copied. HEAD is a special pointer indicating your current working branch. Merging combines two branch histories using three-way merge (finding the common ancestor commit). Fast-forward merge simply moves the pointer forward when no divergence exists.',
    keyPoints: [
      'git branch feature-login — Creates a new branch (pointer) named feature-login',
      'git checkout -b feature-login — Creates AND switches to the new branch in one step',
      'git merge feature-login — Merges the feature branch commits into the current branch',
      'git pull origin main — Fetches remote changes AND merges them into local branch',
      'git push origin feature-login — Pushes local branch to GitHub for Pull Request',
      'Merge Conflict: occurs when both branches modified the same line — must be resolved manually'
    ],
    codeExample: `# See all branches (* marks current branch)
git branch -a

# Create and switch to a new feature branch
git checkout -b feature/user-authentication

# Make changes on this branch, then stage and commit
git add .
git commit -m "feat: implement JWT login endpoint"

# Switch back to main branch
git checkout main

# Merge the feature branch into main
git merge feature/user-authentication

# Push to GitHub
git push origin main

# Handle a merge conflict:
# After git merge shows CONFLICT, open the file:
# <<<<<<< HEAD (your version)
# String token = jwtService.generateToken(user);
# =======
# String token = tokenProvider.create(user);
# >>>>>>> feature/user-authentication
# Choose one version, remove the markers, then:
git add .
git commit -m "fix: resolve merge conflict in AuthController"`,
    codeLanguage: 'bash',
    codeLines: [
      { code: 'git checkout -b feature/user-authentication', token: 'checkout -b', explanation: 'The -b flag creates a new branch AND switches to it simultaneously. Without -b, you switch to an existing branch.' },
      { code: 'git merge feature/user-authentication', token: 'merge', explanation: 'Integrates all commits from the named branch into the current branch using three-way merge algorithm.' },
      { code: 'git push origin main', token: 'push origin', explanation: '"origin" is the default alias for your remote repository URL (GitHub). "main" is the branch name to push.' }
    ],
    visualizer: 'git-workflow',
    quiz: [
      {
        id: 'q-git-4',
        type: 'mcq',
        question: 'What does "git checkout -b feature/login" do?',
        options: [
          'Deletes the feature/login branch',
          'Switches to an existing branch called feature/login',
          'Creates AND switches to a new branch called feature/login',
          'Merges feature/login into main'
        ],
        answer: 2,
        explanation: 'The -b flag means "create branch". "git checkout -b <name>" is a shortcut combining "git branch <name>" (create) + "git checkout <name>" (switch).',
        points: 15
      },
      {
        id: 'q-git-5',
        type: 'mcq',
        question: 'When does a merge conflict occur?',
        options: [
          'When you push to GitHub for the first time',
          'When two branches modified the same line of the same file',
          'When a branch has more commits than main',
          'When you forget to run git add'
        ],
        answer: 1,
        explanation: 'A merge conflict occurs when Git cannot automatically determine which version to keep because both branches modified the same line(s) in a file. You must manually choose the correct version.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-git-3',
        type: 'choose-correct',
        question: 'Which command correctly creates a feature branch AND immediately switches to it?',
        code: 'A: git branch feature/api\nB: git checkout -b feature/api\nC: git merge feature/api\nD: git push origin feature/api',
        answer: 'B: git checkout -b feature/api — The -b flag combines branch creation and checkout in one step.',
        hint: 'Look for the command that does TWO things at once.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-git-3',
        question: 'What is the difference between "git merge" and "git rebase"?',
        level: 'intermediate',
        answer: 'git merge creates a new "merge commit" that joins two branch histories, preserving the exact history of when branches diverged and merged. git rebase replays your commits on top of another branch, rewriting commit history to create a linear sequence. Merge is safer for shared/public branches; rebase creates cleaner history but should only be used on local/private branches.',
        example: 'Team rule: Never rebase main or any shared branch — it rewrites history others depend on.'
      },
      {
        id: 'iq-git-4',
        question: 'Explain the GitHub Pull Request workflow used in professional teams.',
        level: 'beginner',
        answer: '1. Developer creates a feature branch locally. 2. Pushes branch to GitHub. 3. Opens a Pull Request (PR) comparing feature branch to main. 4. Team members review code, leave comments, request changes. 5. CI/CD pipeline runs automated tests. 6. After approvals and passing tests, PR is merged into main. 7. Branch is deleted. This ensures no unreviewed code reaches production.',
        example: 'Branch protection rules on GitHub can require 1-2 approvals + passing CI before any PR can merge into main.'
      }
    ],
    xpReward: 50
  }
];

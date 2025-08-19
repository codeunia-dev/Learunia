# Git Cheatsheet

## Getting Started

```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone <repository-url>
git clone <repository-url> <directory-name>

# Check repository status
git status

# View commit history
git log
git log --oneline
git log --graph --oneline --all
```

## Basic Commands

### Configuration

```bash
# Set user information
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# View configuration
git config --list
git config user.name

# Set default branch name
git config --global init.defaultBranch main
```

### File Operations

```bash
# Add files to staging area
git add <filename>
git add .                    # Add all files
git add *.js                # Add all JavaScript files
git add -p <filename>       # Interactive add

# Remove files from staging area
git reset <filename>
git reset HEAD <filename>

# Remove files from working directory
git rm <filename>
git rm --cached <filename>  # Remove from Git but keep locally
```

### Committing

```bash
# Create a commit
git commit -m "Commit message"
git commit -am "Commit message"  # Add and commit tracked files

# Amend last commit
git commit --amend -m "New message"
git commit --amend --no-edit     # Keep same message

# View commit details
git show <commit-hash>
git show HEAD
```

## Branching

### Creating and Switching

```bash
# List branches
git branch
git branch -a                # Show all branches (local and remote)

# Create new branch
git branch <branch-name>
git checkout -b <branch-name>  # Create and switch to new branch

# Switch between branches
git checkout <branch-name>
git switch <branch-name>       # Modern alternative

# Delete branch
git branch -d <branch-name>    # Safe delete (won't delete unmerged changes)
git branch -D <branch-name>    # Force delete
```

### Merging

```bash
# Merge branch into current branch
git merge <branch-name>

# Merge with no-fast-forward (creates merge commit)
git merge --no-ff <branch-name>

# Abort merge if conflicts occur
git merge --abort

# View merge history
git log --merges
```

### Rebasing

```bash
# Rebase current branch onto another branch
git rebase <base-branch>

# Interactive rebase (last n commits)
git rebase -i HEAD~n

# Abort rebase
git rebase --abort

# Continue rebase after resolving conflicts
git rebase --continue
```

## Remote Operations

### Managing Remotes

```bash
# List remote repositories
git remote -v

# Add remote repository
git remote add <name> <url>
git remote add origin https://github.com/user/repo.git

# Remove remote
git remote remove <name>

# Rename remote
git remote rename <old-name> <new-name>
```

### Fetching and Pulling

```bash
# Fetch updates from remote
git fetch <remote-name>
git fetch origin

# Pull changes from remote
git pull <remote-name> <branch-name>
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

### Pushing

```bash
# Push to remote
git push <remote-name> <branch-name>
git push origin main

# Push new branch to remote
git push -u origin <branch-name>

# Force push (use with caution)
git push --force origin <branch-name>
git push --force-with-lease origin <branch-name>  # Safer force push

# Delete remote branch
git push origin --delete <branch-name>
```

## Stashing

```bash
# Save changes to stash
git stash
git stash push -m "Stash message"

# List stashes
git stash list

# Apply stash
git stash apply              # Apply most recent stash
git stash apply stash@{n}    # Apply specific stash
git stash pop                # Apply and remove most recent stash

# View stash contents
git stash show
git stash show -p

# Remove stash
git stash drop stash@{n}
git stash clear              # Remove all stashes
```

## History and Logs

### Viewing History

```bash
# Basic log
git log
git log --oneline
git log --graph --oneline --all

# Filter by author
git log --author="Author Name"

# Filter by date
git log --since="2023-01-01"
git log --until="2023-12-31"

# Filter by file
git log -- <filename>

# Show changes in commits
git log -p
git log --stat
```

### Comparing Changes

```bash
# Compare working directory with staging area
git diff

# Compare staging area with last commit
git diff --staged
git diff --cached

# Compare two commits
git diff <commit1> <commit2>

# Compare branches
git diff <branch1>..<branch2>

# Show file changes between commits
git diff <commit1> <commit2> -- <filename>
```

## Undoing Changes

### Reset

```bash
# Soft reset (keep changes in staging area)
git reset --soft HEAD~1

# Mixed reset (keep changes in working directory)
git reset HEAD~1
git reset --mixed HEAD~1

# Hard reset (discard all changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard <commit-hash>
```

### Revert

```bash
# Create new commit that undoes changes
git revert <commit-hash>

# Revert multiple commits
git revert <commit1>..<commit2>

# Revert without committing
git revert -n <commit-hash>
```

### Checkout

```bash
# Discard changes in working directory
git checkout -- <filename>

# Switch to specific commit (detached HEAD)
git checkout <commit-hash>

# Return to latest commit on current branch
git checkout <branch-name>
```

## Tags

```bash
# Create lightweight tag
git tag <tag-name>

# Create annotated tag
git tag -a <tag-name> -m "Tag message"

# List tags
git tag
git tag -l "v1.*"           # Filter tags

# Delete tag
git tag -d <tag-name>

# Push tags to remote
git push origin <tag-name>
git push origin --tags       # Push all tags
```

## Advanced Features

### Cherry-pick

```bash
# Apply specific commit to current branch
git cherry-pick <commit-hash>

# Cherry-pick without committing
git cherry-pick -n <commit-hash>

# Cherry-pick multiple commits
git cherry-pick <commit1> <commit2>
```

### Bisect

```bash
# Start bisect to find bad commit
git bisect start
git bisect bad <bad-commit>
git bisect good <good-commit>

# Mark current commit as good or bad
git bisect good
git bisect bad

# Reset bisect
git bisect reset
```

### Submodules

```bash
# Add submodule
git submodule add <repository-url> <path>

# Initialize submodules
git submodule init
git submodule update

# Clone repository with submodules
git clone --recursive <repository-url>
```

## Workflows

### Feature Branch Workflow

```bash
# Start new feature
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push feature branch
git push -u origin feature/new-feature

# Create pull request (on GitHub/GitLab)
# After review and merge, clean up locally
git checkout main
git pull origin main
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Hotfix Workflow

```bash
# Create hotfix branch from main
git checkout -b hotfix/urgent-fix main

# Make fix and commit
git add .
git commit -m "Fix urgent issue"

# Merge to main and develop
git checkout main
git merge hotfix/urgent-fix
git push origin main

git checkout develop
git merge hotfix/urgent-fix
git push origin develop

# Clean up
git branch -d hotfix/urgent-fix
```

## Best Practices

### Commit Messages

```bash
# Good commit message format
git commit -m "feat: add user authentication system

- Implement JWT token generation
- Add login/logout endpoints
- Include password hashing with bcrypt
- Add user validation middleware

Closes #123"
```

### .gitignore

```bash
# Common .gitignore entries
node_modules/
.env
*.log
dist/
build/
.DS_Store
*.tmp
*.cache
```

### Aliases

```bash
# Useful Git aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

## Troubleshooting

### Common Issues

```bash
# Fix detached HEAD
git checkout main

# Recover deleted branch
git reflog
git checkout -b <branch-name> <commit-hash>

# Clean untracked files
git clean -n              # Preview what will be deleted
git clean -f              # Force delete untracked files
git clean -fd             # Delete untracked files and directories

# Fix merge conflicts
git status                # See conflicted files
# Edit files to resolve conflicts
git add <resolved-files>
git commit -m "Resolve merge conflicts"
```

# CNAT Production Server Git Deployment Guide

## Purpose

This guide documents the safe procedure for synchronizing the CNAT React/Vite frontend on the cPanel server with the GitHub repository while preserving the production API and Apache configuration.

### Current setup

- Server web root: `~/public_html`
- GitHub repository: `https://github.com/sukantahui/cnat.git`
- Git branch: `main`
- API directory: `~/public_html/cnat_api`
- Apache configuration: `~/public_html/.htaccess`

The important rule is:

**Keep `.git`, `.htaccess`, and `cnat_api`. The frontend files can be restored from GitHub.**

---

## 1. Enter the web root

```bash
cd ~/public_html
```

`cd` means change directory.

Check the current directory:

```bash
pwd
```

---

## 2. Inspect all files

```bash
ls -la
```

`-l` gives detailed information and `-a` includes hidden files such as `.git` and `.htaccess`.

---

## 3. Check Git status

```bash
git status
```

This shows modified, deleted, staged, and untracked files.

After manually deleting old frontend files, Git may show many entries as:

```text
deleted: index.html
deleted: assets/...
deleted: robots.txt
...
```

That is expected: the files are tracked by Git but have been removed from the working directory.

---

## 4. Confirm the branch

```bash
git branch --show-current
```

Expected:

```text
main
```

---

## 5. Confirm the GitHub remote

```bash
git remote -v
```

Expected:

```text
origin  https://github.com/sukantahui/cnat.git (fetch)
origin  https://github.com/sukantahui/cnat.git (push)
```

This confirms that the server repository points to the correct GitHub repository.

---

## 6. Important: do not blindly run `git clean -fd`

Avoid:

```bash
git clean -fd
```

on this production directory unless you have verified exactly what will be deleted.

`git clean -fd` removes untracked files and directories. Production resources such as an API directory or server configuration may be untracked.

---

## 7. Remove old frontend files while protecting production resources

From `~/public_html`, the safe cleanup command used for this setup is:

```bash
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.htaccess' ! -name 'cnat_api' -exec rm -rf -- {} +
```

This removes entries directly inside `public_html`, except:

- `.git`
- `.htaccess`
- `cnat_api`

### Command breakdown

`find .`
Search the current directory.

`-mindepth 1`
Do not select the current directory itself.

`-maxdepth 1`
Only select items directly inside `public_html`.

`! -name '.git'`
Protect the Git repository.

`! -name '.htaccess'`
Protect Apache configuration.

`! -name 'cnat_api'`
Protect the backend API.

`-exec rm -rf -- {} +`
Delete the selected files/directories.

**Warning:** This is a destructive command. Always verify the directory and protected names before executing it.

---

## 8. Verify the cleanup

```bash
ls -la
```

After cleanup, the important remaining entries should be:

```text
.git/
.htaccess
cnat_api/
```

---

## 9. Fetch the latest GitHub information

```bash
git fetch origin
```

`git fetch` downloads the latest information from GitHub and updates references such as `origin/main`.

It does not normally change the working files.

---

## 10. Restore the tracked frontend from GitHub

```bash
git reset --hard origin/main
```

This makes the tracked working tree match the commit currently referenced by `origin/main`.

It restores frontend files such as:

```text
index.html
assets/
logos/
teachers/
docs/
robots.txt
sitemap.xml
...
```

if they exist in the GitHub `main` branch.

### Why use `reset --hard` instead of `git pull`?

The goal in this deployment is not to merge local server changes.

The goal is:

> Make the tracked website files on the server match GitHub `main`.

The workflow is therefore:

```text
GitHub
  ↓
git fetch origin
  ↓
origin/main
  ↓
git reset --hard origin/main
  ↓
server working tree
```

---

## 11. Verify Git

```bash
git status
```

Ideally:

```text
nothing to commit, working tree clean
```

Then:

```bash
ls -la
```

Confirm that:

```text
cnat_api/
.htaccess
```

are still present.

---

# Recommended future deployment sequence

When the GitHub `main` branch contains the desired production version:

```bash
cd ~/public_html
git status
git branch --show-current
git remote -v
git fetch origin
git reset --hard origin/main
git status
ls -la
```

If a full frontend cleanup is necessary before synchronization:

```bash
cd ~/public_html
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.htaccess' ! -name 'cnat_api' -exec rm -rf -- {} +
git fetch origin
git reset --hard origin/main
git status
```

---

# Backup procedure

Before major production cleanup, back up the API:

```bash
cp -a ~/public_html/cnat_api ~/cnat_api_backup
```

Back up `.htaccess`:

```bash
cp ~/public_html/.htaccess ~/htaccess_backup
```

For a larger backup:

```bash
cp -a ~/public_html ~/public_html_backup
```

Check backups:

```bash
ls -la ~/
```

---

# Useful Git commands

### Status

```bash
git status
```

Shows the state of the working tree.

### Current branch

```bash
git branch --show-current
```

### Remote repository

```bash
git remote -v
```

### Download remote information

```bash
git fetch origin
```

### Recent commits

```bash
git log --oneline -10
```

### Remote branches

```bash
git branch -r
```

### Synchronize with GitHub main

```bash
git reset --hard origin/main
```

Use this only when local tracked changes should be discarded.

---

# Dangerous commands

## `rm -rf`

Example:

```bash
rm -rf directory_name
```

Permanently removes files/directories.

## `git clean -fd`

Removes untracked files and directories.

Do not use it blindly on a production server.

## `git reset --hard`

Discards local modifications to tracked files and makes the working tree match the specified commit.

---

# Final production structure

The intended structure is:

```text
public_html/
├── .git/          ← KEEP
├── .htaccess      ← KEEP
├── cnat_api/      ← KEEP
├── index.html     ← Git-controlled frontend
├── assets/        ← Git-controlled frontend
├── logos/
├── teachers/
├── docs/
└── other frontend files
```

The key separation is:

```text
GitHub repository
    └── React/Vite frontend

Server
    ├── React/Vite frontend ← synchronized from GitHub
    ├── .htaccess           ← server-specific, preserve
    └── cnat_api            ← backend, preserve
```

## Final checklist

Before cleanup:

- [ ] Confirm `pwd`
- [ ] Run `ls -la`
- [ ] Run `git status`
- [ ] Confirm branch is `main`
- [ ] Confirm GitHub remote
- [ ] Back up `cnat_api`
- [ ] Back up `.htaccess`

During cleanup:

- [ ] Preserve `.git`
- [ ] Preserve `.htaccess`
- [ ] Preserve `cnat_api`
- [ ] Remove obsolete frontend files only

After cleanup:

- [ ] Run `git fetch origin`
- [ ] Run `git reset --hard origin/main`
- [ ] Run `git status`
- [ ] Verify `cnat_api/`
- [ ] Verify `.htaccess`
- [ ] Test the website
- [ ] Test API requests


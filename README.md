# GIT Exercise

This fork repo contains solutions for the problems presented in the original [repo](https://github.com/wojciech-panek/git-exercise).

## TODO
- git bisect
- add to gitignore npm-debug.log
- remove release branch
- merge all branches
- rebase onto home-newsletter and home-list branches
- add changelog.md
- fix version in the package.json
- fix hotfix
  + remove from master
  + create git flow hotfix
  + increase version
  + fix commit message
- fix bugfix commit message
- fix Username in some commits
- rename feature branches

## Fix author name in commits:

Based on [this answer](http://stackoverflow.com/questions/3042437/change-commit-author-at-one-specific-commit) on stackoverflow:

Checkout the commit we are trying to modify.
```
git co 6e623a4
```

Make the author change.
```
git commit --amend --author "Good Username <goodusername@email.com>"
```

Replace the old commit with the new one locally.
```
git replace 6e623a4 9c2a3bc
```

Rewrite all future commits based on the replacement.
> Lets you rewrite Git revision history by rewriting the branches mentioned in the <rev-list options>, applying custom filters on each revision.

```
git filter-branch -- --all
```

Remove the replacement for cleanliness.
```
git replace -d 6e623a4
```

Push the new history (after sanity checking with git log).
```
git co master
git push -f
git co develop
git push -f
```

Repeat this commands for all bad commits.

Another way to use rebase:

```
git rebase -i -p HASH_TO_START
```

then replace pick with edit

```
edit 023322g Some bad commit
pick 23422j2 Good commit
edit 02sd22g Other bad commit
```

Correct the author information and then continue to the next concerned commit:
```
git commit --amend --author "Good Username <goodusername@email.com>"
git rebase --continue
```

Then push changes:
```
git push -f
```

## Update commit(#447d281) message (replace 'bugfix'):

```
git rebase -i -p 447d281^
```

Before:
```
pick 447d281 bugfix
pick ff3a2f1 Change section header color to blue
pick 2fac738 fix typo in the home component
pick 0d77ba5 Bumped version to v0.2.1
```

After:
```
reword 447d281 bugfix
pick ff3a2f1 Change section header color to blue
pick 2fac738 fix typo in the home component
pick 0d77ba5 Bumped version to v0.2.1
```

And then in the editor you need type new commit message.
We use ```-p``` to recreate merge commits.

Rebase git [docs](https://git-scm.com/docs/git-rebase.html):
> Recreate merge commits instead of flattening the history by replaying commits a merge commit introduces. Merge conflict resolutions or manual amendments to merge commits are not preserved.

You can always reset you changes on local branch using command:
```
git reset origin/master --hard
```

## Fix wrong hotfix branch

Checkout to master:
```
git co master
```

Undo last hotfix commit and stash changes:
```
git reset HEAD~
git stash
```

Need to push with force to rewrite history:
```
git push -f
```

We need to remove tag to create proper hotfix branch:
```
git tag -d v0.3.0
git push origin :refs/tags/v0.3.0
```

Create release apply changes and bump version:
```
git flow release start v0.2.1
git stash apply
git add .
git cm "message text"
```

Increase only patch version because it is bugfix.
```
git add package.json
git cm "Bumped version to v0.2.1"
```

Finish hotfix:
```
git flow hotfix finish
git co master
git push
git co develop
git push
git push --tags
```

## Finish feature/myapi:

Rebase develop onto feature/myapi:
```
git co feature/myapi
git purrod
```

Resolve confilicts:
```
git rm .idea/workspace.xml
git rebase --continue
```

Push with force:
```
git push -f
```
[--force-with-lease](https://github.com/k88hudson/git-flight-rules/issues/8)

Create pull request on GitHub then merge it.

Remove branch localy:
```
git branch -d feature/myapi
```

## Delete merged branches - release and feature/home-css:

Delete it from GitHub page.
You can prune it with terminal:
```
git remote prune origin
```
git remote [docs](https://git-scm.com/docs/git-remote.html):
>  Deletes all stale remote-tracking branches under <name>. These stale branches have already been removed from the remote repository referenced by <name>, but are still locally available in "remotes/<name>". With --dry-run option, report what branches will be pruned, but do not actually prune them.

## Add npm-debug.log to .gitignore
Add ```npm-debug.log``` line to .gitignore file. Then remove npm-debug.log file and commit changes.
```
vim .gitignore
rm npm-debug.log
git add .
git cm "add npm-debug.log to git ignore"
git push
```

## Finish feature/home-newsletter and feature/home-list features:

Rebase develop onto feature/home-newsletter:
```
git co feature/home-newsletter
git purrod
```

Resolve conflicts and then:
```
git push -f
```

Create pull request and merge it then pull develop and use --onto option to rebase feature/home-list to develop:
```
git co develop
git pull
git rebase --onto develop feature/home-newsletter feature/home-list
git co feture/home-list
git push -f
```

Create pull request wih feature/home-list changes and merge it.
Remove merged branches.

## Add CHANGELOG.md

We decide to create CHANGELOG file in accordance with [Keep a CHANGELOG](http://keepachangelog.com/en/0.3.0/).



# Git

# Git tag

```bash
git tag # show tags
git tag -a v1.4 -m "my version 1.4" # Annotated tags
git show v1.4
git push origin v1.4
git checkout v1.4
```

# Squashing multiple commits

`git rebase -i HEAD~3` or however many commits instead of 3.

Turn this
```
pick YourCommitMessageWhatever
pick YouGetThePoint
pick IdkManItsACommitMessage
```
into this
```
pick YourCommitMessageWhatever
s YouGetThePoint
s IdkManItsACommitMessage
```
Save and come out.

It's a lot easier than it looks. There are plenty of helpful comments to guide you once the rebase starts.

# Delete Submodule

1. Delete the relevant section from the .gitmodules file.
2. Stage the .gitmodules changes git add .gitmodules
3. Delete the relevant section from .git/config.
4. Run `git rm --cached path_to_submodule` (no trailing slash).
5. Run `rm -rf .git/modules/path_to_submodule`
6. Commit git commit -m "Removed submodule <name>"
7. Delete the now untracked submodule files
`rm -rf path_to_submodule`

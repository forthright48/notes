# SSH

- **Create SSH Key**: `ssh-keygen -t rsa -C EMAIL`
- **Add machine as trusted machine on server**: Create a file `~/.ssh/authorized_keys` and add public keys to it, one in each line.
- You can create `~/.ssh/config` to create shortcuts like `ssh SHORTCUT-NAME`.

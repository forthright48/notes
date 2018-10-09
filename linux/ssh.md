# SSH


## Create SSH Key

```
ssh-keygen -t rsa -C EMAIL
ssh-keygen -t rsa -f CUSTOM_FILE_NAME
```

## Remove PassPhrase from existing key

```
ssh-keygen -p # Then it wil ask for existing key path, old pass and new pass
```

## Add machine as trusted machine on server
 
Create a file `~/.ssh/authorized_keys` and add public keys to it, one in each line.

You can create `~/.ssh/config` to create shortcuts like `ssh SHORTCUT-NAME`.

## Config File

Create a file: `~/.ssh/config`

```ssh
Host example
    HostName 192.168.0.1
    port 22
    User forthright48
    IdentityFile ~/.ssh/id_rsa
```
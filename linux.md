# Bash

- [Double Quotes vs Single Quotes](https://stackoverflow.com/questions/6697753/difference-between-single-and-double-quotes-in-bash): Single quotes do not interpolate special characters. You can't use single quote inside single quote.

# Curl

- **-o** flag for redirecting output
- **-i** flag for showing hidden headers
- **--head** flag for getting only headers
- **--next** flag to separate multiple request
- **--data|-d KEY=VALUE** to send post request

# Environment Variables

The environment is implemented as strings that represent key-value pairs. If multiple values are passed, they are typically separated by colon (:) characters

`KEY=value1:value2:...`

If the value contains significant white-space, quotations are used:

`KEY="value with spaces"`

The keys in these scenarios are variables. They can be one of two types, environmental variables or shell variables.

**Environmental variables** are variables that are defined for the current shell and are inherited by any child shells or processes. Environmental variables are used to pass information into processes that are spawned from the shell.

**Shell variables** are variables that are contained exclusively within the shell in which they were set or defined. They are often used to keep track of ephemeral data, like the current working directory.

By convention, these types of variables are usually defined using all capital letters. This helps users distinguish environmental variables within other contexts.

- **Printing Environment Variables**: use `printenv` to print all variables or `printenv VARIABLE` to print value of particular variable.
- **Printing Shell Variables**: `set | grep VARIABLE` or `echo $VARIABLE`
- **Creating Environment Variable**: `export VARIABLE`
- **Demoting Environment Variable**: `export -n VARIABLE`
- **Remove Variable**: `unset VARIABLE`

**Process environment variables**: Each process has its corresponding env values located at `/proc/PID/environ`.

# File Compression

Zip files: `zip -r FILENAME FILE-LIST-TO-ZIP`

Extract: `extract [tar.gz,tgz,zip] ARCHIVE`

`extract` is my own shell script.

# SSH

- **Create SSH Key**: `ssh-keygen -t rsa -C EMAIL`
- **Add machine as trusted machine on server**: Create a file `~/.ssh/authorized_keys` and add public keys to it, one in each line.
- You can create `~/.ssh/config` to create shortcuts like `ssh SHORTCUT-NAME`.

# Procfile Management Tool

Create a file named `Procfile`

goreman (golang)

# Webmin

A GUI through browser that allows us to configure our linux systems easily. For example, we can easily configure startup processes using webmin.

[How to install](https://www.digitalocean.com/community/tutorials/how-to-install-webmin-on-ubuntu-16-04)

You can stop/start/restart webmin from `/etc/webmin`

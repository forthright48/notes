# Virtualenv

```
pip3 install --user virtualenv         # Install
virtualenv mycoolproject               # Create new project
source mycoolproject/bin/activate      # Activate virtuaenv
deactivate                             # Deactivate virtualenv
```

# Virtualenvwrapper

It's a wrapper over basic virtualenv. Has extra features such as postactivate and postdeactivate scripts for maintaining environment variables.

```
pip3 install --user virtualenv
pip3 install --user virtualenvwrapper
mkdir ~/.virtualenvs

# Add these to .bashrc
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/me/projects/python
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
source $HOME/.local/bin/virtualenvwrapper.sh

# Basic usage
mkvirtualenv xyz        # Creates new virtualenv
workon                  # Displays list of all environment
workon xyz              # Switches to xyz environment
```

If you perviously installed virtualenvwrapper using apt, and now its showing errors, try deleting the file in `/etc/bash_completion/virtualenvwrapper` file.

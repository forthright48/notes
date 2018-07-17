# Tmux

A multiplexer for terminal

# Install
```
apt install tmux
```

# Tmux commands
```
tmux -V             # Check version
tmux ls             # Check running sessions
```

# Start new session
```
tmux new
tmux new -s [name]
```

# Attach, Detach and Kill
```
ctrl+b d            # Detach
tmux a -t 3         # Attach session
tmux a -t [name]
tmux a #            # Attach to last session
```

# Pane
```
ctrl+b "            # Horizontal
ctrl+b %            # Vertical

$resize-pane -D/U/L/R [line number]
```

# Exit
```
exit
```


# Tmuxinator

A script manager for handling tmux sessions.

# Resources

1. **Book** - Tmux 2: Productive Mouse-Free Development
1. [Oh My Tmux!](https://github.com/gpakosz/.tmux) - configuration for tmux.

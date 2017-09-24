# Vim

# Cut, Copy, Paste and Select

- `V` for selecting a line
- `v` for selecting characters
- `d` for cutting and `y` for copying. `d` stands for delete in vim and `y` stands for yank
- `yy` for copying a line. `y$` for copying line without newline.
- Prefix `"+` to use clipboard
- `P` for pasting before cursor and `p` for pasting after

Install `vim-gnome` so that you can copy to clipboard.

**Undo**: `u`
**Redo**: `ctrl + r`

# Search and Replace

- Number of times a pattern matched: `:%s/PATTERN//gn` for all matches or `:%s/PATTERN//n` for just number of lines.

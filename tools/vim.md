# Vim

## vimrc

`.vimrc` should be created in $HOME directory.

Get vimrc from [Ultimate vimrc](https://github.com/amix/vimrc)

## Movement

- `G`: Move to last line

## Cut, Copy, Paste and Select

- `V` for selecting a line
- `v` for selecting characters
- `d` for cutting and `y` for copying. `d` stands for delete in vim and `y` stands for yank
- `yy` for copying a line. `y$` for copying line without newline.
- Prefix `"+` to use clipboard
- `P` for pasting before cursor and `p` for pasting after

Install `vim-gnome` so that you can copy to clipboard.

**Undo**: `u`
**Redo**: `ctrl + r`

## Search and Replace

- Number of times a pattern matched: `:%s/PATTERN//gn` for all matches or `:%s/PATTERN//n` for just number of lines.

## Mapping Commands

`:map` and `:noremap` are recursive and non-recursive versions of the various mapping commands. What that means is that if you do:

```bash
:map j gg
:map Q j
:noremap W j
```

- j will be mapped to gg. 
- Q will also be mapped to gg, because j will be expanded for the recursive mapping.
- W will be mapped to j (and not to gg) because j will not be expanded for the non-recursive mapping.

Now remember that Vim is a modal editor. It has a **normal** mode, **visual** mode and other modes.

- For each of these sets of mappings, there is a mapping that works in normal, visual, select and operator modes (:map and :noremap)
- one that works in normal mode (:nmap and :nnoremap)
- one in visual mode (:vmap and :vnoremap) and so on.

# Plugin

## NerdTree

- Change window back to nerdTree: <Ctrl-W> w
- Toggle NerdTree: <leader> nn
- [Create folder/file in nerdTree](https://sookocheff.com/post/vim/creating-a-new-file-or-directoryin-vim-using-nerdtree): go to the folder and press "m" to bring out the menu.
- Toggle buffer using: <leader> + o


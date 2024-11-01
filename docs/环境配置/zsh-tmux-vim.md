oh-my-zsh
oh-my-tmux
oh-my-vim
GNOME
fzf
xclipe
vivid
nvim
verilog-mode
花里胡哨的东西一大堆

lazy.vim
lazy vim手动离线安装插件，只需要将插件下载下来，放到 .local/share/nvim/lazy下面，然后在 .config/nvim/lua/plugin中增加 对应的 xxx.lua ，里面加上
```
return {
  {
    "xxx/xxx"
    -- config and keys
  }
}
```

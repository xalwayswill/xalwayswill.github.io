* 综合类
https://www.zymseo.com/file_352868
https://www.cnblogs.com/forest-wow/p/6916531.html

* 插件集合
https://vimawesome.com/

* NERD_Tree  map
NERD_Tree  map绑定快捷键
```
nnoremap <F2> :NERDTreeToggle %<CR>
let g:NERDTreeDirArrowExpandable = '>'
let g:NERDTreeDirArrowCollapsible = '|'
" Exit Vim if NERDTree is the only window remaining in the only tab.
autocmd BufEnter * if tabpagenr('$') == 1 && winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() | quit | endif
```
[GitHub - preservim/nerdtree: A tree explorer plugin for vim.](https://github.com/preservim/nerdtree)

* Tabbar
Tabbar  ALT+数字切换tab

* Tabular
https://github.com/godlygeek/tabular
Tabular 代码对齐（下载后整个文件夹放在plugin下），之后选择需要对齐的区域，:Tab / + 需要对齐的字符，例如 : Tab /\s\w*\S*;对齐多个信号声明，信号对齐可以考虑使用后面的，或者； 

* 语法
[verilog_systemverilog.vim - Extending Verilog syntax highlighting for SystemVerilog : vim online](https://www.vim.org/scripts/script.php?script_id=1586)

* automatic
https://github.com/HonkW93/automatic-verilog

* vim - powerline
```
set laststatus=2 ""powerline always on
set t_Co=256 "powerline background color
```
* vim-airline（推荐用这个而不是powerline）
Plugin 'vim-airline/vim-airline'
```
" Vim 在与屏幕/键盘交互时使用的编码(取决于实际的终端的设定)        
set encoding=utf-8
set langmenu=zh_CN.UTF-8
" 设置打开文件的编码格式  
set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1 
set fileencoding=utf-8
" 解决菜单乱码
source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim
" 解决consle输出乱码
"set termencoding = cp936  
" 设置中文提示
language messages zh_CN.utf-8 
" 设置中文帮助
set helplang=cn
" 设置为双字宽显示，否则无法完整显示如:☆
set ambiwidth=double
" 总是显示状态栏 
let laststatus = 2
let g:airline_powerline_fonts = 1   " 使用powerline打过补丁的字体
let g:airline_theme="dark"      " 设置主题
" 开启tabline
let g:airline#extensions#tabline#enabled = 1      "tabline中当前buffer两端的分隔字符
let g:airline#extensions#tabline#left_sep = ' '   "tabline中未激活buffer两端的分隔字符
let g:airline#extensions#tabline#left_alt_sep = '|'      "tabline中buffer显示编号
let g:airline#extensions#tabline#buffer_nr_show = 1      
" 映射切换buffer的键位
nnoremap [b :bp<CR>
nnoremap ]b :bn<CR>
" 设置字体 
set guifont=Powerline_Consolas:h14:cANSI
```
[GitHub - Lokaltog/vim-powerline: Moved to powerline/powerline.](https://github.com/Lokaltog/vim-powerline)

* emac哪些autowire 插件

* supertab
`let g:SuperTabRetainCompletionType=2`

* ctags
ctags -R -f ~/tags/xxx --languages=systemverilog /project/root/dir 
`set tags=./tags`
`set tags+=/tags_route`
ctags https://coderwall.com/p/fy7stg/vim-and-systemverilog
https://blog.csdn.net/foreverling/article/details/80329586

* indentLine
显示缩进线
```
let g:indentLine_enabled = 1			" 使插件生效
let g:indentLine_char = '¦'				" 设置缩进线字符，也可以为 '|', '┆', '┊' 等
let g:indentLine_conceallevel = 2 		" 使插件正常运行
```

* neocomplcache（对于vim版本及lua有要求）
```
let g:neocomplcache_enable_at_startup = 1
let g:neocomplcache_enable_auto_select = 1 "select the first option
```
https://vimawesome.com/plugin/neocomplete-vim
https://github.com/Shougo/neocomplcache.vim
也可用vim自带的补全，主要用c+x c+f来补全文件路径，都是在插入模式下使用
1. 以本文件中的关键字补全：Ctrl-X Ctrl-N，会以当前文件中的词汇来匹配你已经输入的部分。
2. 以当前文件及包含文件中的关键字补全：Ctrl-X Ctrl-I，类似于1，其中包含文件如`#include<stdio.h>`。
3. 文件名称补全：**Ctrl-X Ctrl-F**，可能以当前目录下的文件名为基础来匹配你的输入。
4. 以字典补全：Ctrl-X Ctrl-K，以字典中的词汇为基础来匹配你的输入。

```
set fdm=marker "设置根据marker进行折叠  //{{{  //}}}
set nocompatible
filetype on
syntax enable
set softtabstop=4
set expandtab
set hlsearch
set showmatch
set linespace=4
set nu
set ignorecase
set backspace=2
set ruler
set guifont=Monospace\ 14
set cursorline
set cursorcolumn
set history=100
set showcmd

set tabstop=4
set shiftwidth=4
set autoindent
set smartindent
set cindent
filetype plugin indent on

"###### Theme
if has('gui_running')
    set background=dark
    colorscheme solarized
else
    set background=light
endif

let g:solarized_termcolors=256

“###### Plugin
"NERDTree
nnoremap <F2> :NERDTreeToggle %<CR>
"Powerline
set laststatus=2 "Powerline always on
set t_Co=256 "powerline background color


"进行版权声明的设置
"添加或更新头
map <F4> :call TitleDet()<cr>'s
function AddTitle()
    call append(0,"/*=============================================================================")
    call append(1,"#")
    call append(2,"# Author: ")
    call append(3,"#")
    call append(4,"# Last modified: ".strftime("%Y-%m-%d %H:%M"))
    call append(5,"#")
    call append(6,"# Filename: ".expand("%:t"))
    call append(7,"#")
    call append(8,"# Description: ")
    call append(9,"#")
    call append(10,"=============================================================================*/")
    echohl WarningMsg | echo "Successful in adding the copyright." | echohl None
endf
"更新最近修改时间和文件名
function UpdateTitle()
    normal m'
    "正则表达式匹配，然后替换，相当于直接按:再VIM中输入
    execute '/# *Last modified:/s@:.*$@\=strftime(":\t%Y-%m-%d %H:%M")@'
    normal ''
    normal mk
    execute '/# *Filename:/s@:.*$@\=":\t\t".expand("%:t")@'
    execute "noh"
    normal 'k
    echohl WarningMsg | echo "Successful in updating the copy right." | echohl None
endfunction
"判断前10行代码里面，是否有Last modified这个单词，
"如果没有的话，代表没有添加过作者信息，需要新添加；
"如果有的话，那么只需要更新即可
function TitleDet()
    let n=1
    "默认为添加
    while n < 10
        let line = getline(n)
        if line =~ '^\#\s*\S*Last\smodified:\S*.*$'
            call UpdateTitle()
            return
        endif
        let n = n + 1
    endwhile
    call AddTitle()
endfunction

function Always_ff() "{{{1
    let lnum = line(".")
    call append(lnum-1,"always_ff @(posedge i_sclk or negedge i_rst_n) begin")
    call append(lnum+0,"  if(!i_rst_n) begin")
    call append(lnum+1,"      ")
    call append(lnum+2,"  end")
    call append(lnum+3,"  else begin")
    call append(lnum+4,"      ")
    call append(lnum+5,"  end")
    call append(lnum+6,"end")
    call cursor(lnum+3,13)
endfunction "}}}1
map ff :call Always_ff()<CR>
```

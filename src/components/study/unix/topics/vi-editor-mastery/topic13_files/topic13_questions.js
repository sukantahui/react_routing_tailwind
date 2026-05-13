const questions = [
  {
    question: "What is the purpose of .vimrc?",
    shortAnswer: "It stores Vim configuration settings that are applied at startup.",
    explanation: "Without .vimrc, Vim starts with default settings. With .vimrc, you can customize everything from line numbers to color schemes, making your editing environment consistent.",
    hint: "Think of it as a startup script for Vim.",
    level: "basic",
    codeExample: "echo 'set number' >> ~/.vimrc"
  },
  {
    question: "Where is the .vimrc file located?",
    shortAnswer: "In your home directory: `~/.vimrc` (Linux/macOS) or `$HOME/_vimrc` (Windows).",
    explanation: "You can also use `~/.vim/vimrc` (Vim searches that too). System‑wide config is `/etc/vim/vimrc`.",
    hint: "Run `:echo $MYVIMRC` inside Vim to see the exact path Vim is using.",
    level: "basic",
    codeExample: ":echo $MYVIMRC"
  },
  {
    question: "How do I create a .vimrc from scratch?",
    shortAnswer: "`touch ~/.vimrc` then edit it with Vim itself: `vim ~/.vimrc`.",
    explanation: "Start by adding one setting at a time, save, and restart Vim (or `:source ~/.vimrc`) to test.",
    hint: "Don't copy huge configs blindly – add incrementally.",
    level: "basic",
    codeExample: "vim ~/.vimrc\n:sp\n:so %   // source the file you're editing"
  },
  {
    question: "How do I show line numbers permanently?",
    shortAnswer: "Add `set number` to your .vimrc.",
    explanation: "Alternatively `set relativenumber` shows relative numbers, useful for motions like `5j`. Many use `set number` and `set relativenumber` together.",
    hint: "Reload with `:so ~/.vimrc` to see effect without restart.",
    level: "basic",
    codeExample: "set number\nset relativenumber"
  },
  {
    question: "What does `set tabstop=4` do?",
    shortAnswer: "Sets the number of spaces that a <Tab> character displays as.",
    explanation: "It does not change the file; it only changes how Vim displays tabs. Use `set expandtab` to insert spaces instead of tab characters.",
    hint: "For Python, PEP8 recommends 4 spaces – use `set tabstop=4 expandtab`.",
    level: "intermediate",
    codeExample: "set tabstop=4\nset expandtab"
  },
  {
    question: "How can I enable syntax highlighting permanently?",
    shortAnswer: "Add `syntax on` to your .vimrc.",
    explanation: "Vim detects file types and applies colors. You can also customize the color scheme with `colorscheme desert`.",
    hint: "If syntax highlighting is slow, try `syntax sync minlines=200`.",
    level: "basic",
    codeExample: "syntax on\ncolorscheme elflord"
  },
  {
    question: "How do I toggle a setting quickly from within Vim?",
    shortAnswer: "Use `:set invsetting` (e.g., `:set invnumber` toggles line numbers).",
    explanation: "You can also create mappings in .vimrc, like `nnoremap <F5> :set invnumber<CR>`.",
    hint: "Check current value with `:set setting?`",
    level: "intermediate",
    codeExample: ":set invnumber\n:set number?\n:set invhlsearch"
  },
  {
    question: "How can I have different settings for different file types?",
    shortAnswer: "Use `autocmd FileType` or filetype plugins.",
    explanation: "Example: `autocmd FileType python set tabstop=4 expandtab` applies only to Python files.",
    hint: "Enable filetype detection first with `filetype plugin indent on`.",
    level: "advanced",
    codeExample: "filetype plugin indent on\nautocmd FileType javascript set tabstop=2 shiftwidth=2"
  },
  {
    question: "What is the difference between `set number` and `set relativenumber`?",
    shortAnswer: "`number` shows absolute line numbers; `relativenumber` shows distance from cursor.",
    explanation: "Many Vim users set both: current line shows absolute number, others show relative. This helps with motions like `10j`.",
    hint: "Use `set number relativenumber` together for hybrid mode.",
    level: "intermediate",
    codeExample: "set number\nset relativenumber"
  },
  {
    question: "How do I save changes to .vimrc without restarting Vim?",
    shortAnswer: "Run `:source ~/.vimrc` or `:so %` if you're editing the file.",
    explanation: "This re‑executes all commands in the file, applying new settings immediately.",
    hint: "You can create a mapping: `nnoremap <leader>s :source $MYVIMRC<CR>`",
    level: "basic",
    codeExample: ":source ~/.vimrc"
  },
  {
    question: "How do I stop Vim from creating backup files (file~)?",
    shortAnswer: "Add `set nobackup` and `set nowritebackup` to .vimrc.",
    explanation: "By default Vim creates a backup when overwriting a file. Some find it clutter; others rely on it. You can redirect backup to a specific directory with `set backupdir=~/.vim/backup`.",
    hint: "Disabling backups is risky – better to put them in a hidden folder.",
    level: "intermediate",
    codeExample: "set nobackup\nset nowritebackup\nset backupdir=~/.vim/backup"
  },
  {
    question: "How do I enable mouse support permanently?",
    shortAnswer: "Add `set mouse=a` to .vimrc.",
    explanation: "`a` enables mouse in all modes (Normal, Insert, Visual, Command). You can click to position cursor, select text, and resize splits.",
    hint: "If your terminal doesn't support mouse, `set mouse=` disables it.",
    level: "basic",
    codeExample: "set mouse=a"
  },
  {
    question: "What is the role of `set encoding=utf-8`?",
    shortAnswer: "It sets the character encoding Vim uses internally and for files.",
    explanation: "UTF‑8 is the modern standard. Without it, non‑ASCII characters (like accents or emojis) may display incorrectly.",
    hint: "Also set `set fileencoding=utf-8` to write new files as UTF‑8.",
    level: "intermediate",
    codeExample: "set encoding=utf-8\nset fileencoding=utf-8"
  },
  {
    question: "How can I make Vim remember the last cursor position in a file?",
    shortAnswer: "Add an `autocmd` that jumps to the last known position when opening a file.",
    explanation: "Standard snippet: `au BufReadPost * if line(\"'\\\"\") > 1 && line(\"'\\\"\") <= line(\"$\") | exe \"normal! g'\\\"\" | endif`",
    hint: "Put this in your .vimrc after `filetype on`.",
    level: "advanced",
    codeExample: "au BufReadPost * if line(\"'\\\"\") > 1 && line(\"'\\\"\") <= line(\"$\") | exe \"normal! g'\\\"\" | endif"
  },
  {
    question: "How do I change the color scheme from .vimrc?",
    shortAnswer: "Use `colorscheme name` (e.g., `colorscheme desert`).",
    explanation: "Vim comes with several built‑in schemes: `desert`, `elflord`, `ron`, `evening`, `morning`, etc. You can also install third‑party schemes.",
    hint: "Set `set background=dark` or `light` to help Vim choose appropriate colors.",
    level: "basic",
    codeExample: "colorscheme desert\nset background=dark"
  },
  {
    question: "How do I comment multiple lines in .vimrc?",
    shortAnswer: "Start each line with a double quote `\"`.",
    explanation: "Vim treats everything after `\"` on a line as a comment. There is no block comment; use line comments.",
    hint: "You can use `:normal I\"` to comment a range of lines in visual mode.",
    level: "basic",
    codeExample: "\" This is a comment\nset number   \" this is also a trailing comment"
  },
  {
    question: "What is the difference between `set autoindent`, `set smartindent`, and `set cindent`?",
    shortAnswer: "`autoindent` copies indent from previous line; `smartindent` adds extra indentation for C‑like code; `cindent` is full C/C++ indentation.",
    explanation: "For most programming, `filetype plugin indent on` automatically selects the best indent method. Don't mix these manually.",
    hint: "Use `set noautoindent` to turn off all auto‑indentation temporarily.",
    level: "advanced",
    codeExample: "filetype plugin indent on   \" recommended\nset autoindent                \" minimal"
  },
  {
    question: "How do I set a different tab width for a specific file type?",
    shortAnswer: "Use `autocmd FileType` as in `autocmd FileType ruby set tabstop=2 shiftwidth=2 expandtab`.",
    explanation: "This keeps global settings for most files and overrides for specific languages.",
    hint: "Create `~/.vim/ftplugin/` and place filetype‑specific scripts there.",
    level: "advanced",
    codeExample: "autocmd FileType python set tabstop=4 shiftwidth=4 expandtab\nautocmd FileType javascript set tabstop=2 shiftwidth=2 expandtab"
  },
  {
    question: "Can I have a .vimrc that works on different machines (e.g., Linux and macOS)?",
    shortAnswer: "Yes, use conditional checks like `if has('unix')` or `if has('win32')`.",
    explanation: "For example, `if has('clipboard')` to set clipboard integration only if available.",
    hint: "Also check `:version` to see features.",
    level: "advanced",
    codeExample: "if has('clipboard')\n  set clipboard=unnamedplus\nendif"
  },
  {
    question: "How do I restore .vimrc if I mess it up?",
    shortAnswer: "Start Vim without reading .vimrc: `vim -u NONE`. Then fix the file.",
    explanation: "`-u NONE` ignores all user and system configs. You can also use `vim -u /dev/null`.",
    hint: "After fixing, reload with `:source ~/.vimrc`.",
    level: "intermediate",
    codeExample: "vim -u NONE ~/.vimrc   // edit with no config"
  }
];

export default questions;
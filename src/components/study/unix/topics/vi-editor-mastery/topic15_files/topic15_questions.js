const questions = [
  {
    question: "How do I enable syntax highlighting in Vim?",
    shortAnswer: "Run `:syntax on` or add `syntax on` to your .vimrc.",
    explanation: "This loads Vim's built‑in syntax definitions. It also respects filetype if filetype detection is on.",
    hint: "Check if it's already on with `:syntax` – Vim will say 'Syntax highlighting enabled'.",
    level: "basic",
    codeExample: ":syntax on\n:syntax off"
  },
  {
    question: "What does `:filetype on` do?",
    shortAnswer: "Turns on file type detection, enabling language‑specific settings (indentation, syntax, etc.).",
    explanation: "It reads the file extension or shebang line to decide the 'filetype', then loads rules from `$VIMRUNTIME/filetype.vim`.",
    hint: "Usually you want `filetype plugin indent on` for full features.",
    level: "basic",
    codeExample: ":filetype on\n:filetype plugin indent on"
  },
  {
    question: "How can I see which filetype Vim detected?",
    shortAnswer: "Type `:set filetype?` or `:echo &filetype`.",
    explanation: "If empty, detection didn't work; you can manually set it.",
    hint: "Use `:filetype detect` to re‑detect after changing content.",
    level: "basic",
    codeExample: ":set ft?\n:echo &filetype"
  },
  {
    question: "What if Vim detects the wrong filetype?",
    shortAnswer: "Manually override with `:set filetype=correct_type`.",
    explanation: "You can also add a modeline inside the file or configure an autocmd in .vimrc for a specific pattern.",
    hint: "Use `:set ft=` with nothing to turn off filetype.",
    level: "intermediate",
    codeExample: ":set ft=json\n:set ft=sh"
  },
  {
    question: "How do I change the colour scheme?",
    shortAnswer: "Use `:colorscheme name`, where `name` is one of the built‑in schemes (desert, elflord, etc.).",
    explanation: "You can install third‑party schemes in `~/.vim/colors/`. Preview with `:colorscheme` + Tab.",
    hint: "After changing scheme, you may need `:syntax on` again.",
    level: "basic",
    codeExample: ":colorscheme desert\n:colorscheme ron"
  },
  {
    question: "What does `set background=dark` do?",
    shortAnswer: "Tells Vim that your terminal uses a dark background; it adjusts colours for better contrast.",
    explanation: "If you have a light background, use `set background=light`. Many colour schemes use this variable.",
    hint: "Set it in .vimrc before your colorscheme command.",
    level: "basic",
    codeExample: "set background=dark\ncolorscheme desert"
  },
  {
    question: "Why is syntax highlighting not working in my terminal?",
    shortAnswer: "Possible reasons: `syntax off`, unsupported terminal (set $TERM correctly), or colours disabled.",
    explanation: "Run `:echo has('syntax')` – if it returns 0, your Vim wasn't compiled with syntax support (rare). For colour issues, check `:set t_Co?`.",
    hint: "Try `set t_Co=256` to enable 256 colours, then `:syntax on`.",
    level: "intermediate",
    codeExample: ":set t_Co=256\n:syntax on"
  },
  {
    question: "How can I temporarily disable syntax highlighting?",
    shortAnswer: "`:syntax off` will turn it off until you `:syntax on` again.",
    explanation: "Useful for editing very large files where highlighting slows down scrolling.",
    hint: "You can also toggle with a mapping: `nnoremap <F6> :if exists('g:syntax_on')<Bar>syntax off<Bar>else<Bar>syntax on<Bar>endif<CR>`",
    level: "basic",
    codeExample: ":syntax off\n:syntax clear   // clears all existing groups"
  },
  {
    question: "What are syntax groups?",
    shortAnswer: "Syntax groups are named categories (e.g., `Comment`, `String`, `Function`) that Vim uses to define colours.",
    explanation: "You can change the colour of a group with `:highlight`. Example: `:highlight Comment ctermfg=Green`.",
    hint: "List all groups with `:highlight` or `:syn list`.",
    level: "intermediate",
    codeExample: ":highlight Comment ctermfg=LightCyan\n:highlight Function cterm=bold"
  },
  {
    question: "How do I add syntax highlighting for a custom file type?",
    shortAnswer: "Create `~/.vim/syntax/mycustom.vim` and define rules, then set filetype to `mycustom`.",
    explanation: "You also need `~/.vim/ftdetect/mycustom.vim` to map extensions. See `:help new-filetype`.",
    hint: "Start by copying an existing syntax file and modifying.",
    level: "advanced",
    codeExample: "echo 'syn keyword myKeyword TODO' > ~/.vim/syntax/mytype.vim\n:set ft=mytype"
  },
  {
    question: "Can syntax highlighting slow down Vim?",
    shortAnswer: "Yes, especially on very large files (e.g., 10MB logs) or complex languages (C++ templates).",
    explanation: "You can limit with `:set synmaxcol=200` (don't highlight beyond column 200) or turn it off temporarily.",
    hint: "Use `:syntax sync minlines=200` to improve performance.",
    level: "intermediate",
    codeExample: ":set synmaxcol=200\n:syntax sync minlines=200"
  },
  {
    question: "How do I see which colours are available in my terminal?",
    shortAnswer: "Run a colour script or use `:runtime syntax/colortest.vim` inside Vim.",
    explanation: "This shows a table of available colours. It helps when picking custom highlighting colors.",
    hint: "Also `:echo &t_Co` tells you the number of colours supported.",
    level: "basic",
    codeExample: ":runtime syntax/colortest.vim"
  },
  {
    question: "What is the difference between syntax highlighting and indent highlighting?",
    shortAnswer: "Syntax highlighting colours code elements; indent highlighting (like `:set cursorline`) highlights the line, not language tokens.",
    explanation: "They are independent. You can have syntax on but cursorline off, or vice versa.",
    hint: "Indent plugins like `indentLine` show vertical indentation guides.",
    level: "basic",
    codeExample: ":set cursorline\n:syntax on"
  },
  {
    question: "How do I make Vim automatically reload syntax after changing filetype?",
    shortAnswer: "Use `:doautoall FileType` or simply `:set ft=...` again.",
    explanation: "Changing filetype triggers the syntax loading if `filetype plugin on` is set.",
    hint: "Add `autocmd BufRead,BufNewFile *.myext set ft=mytype` to .vimrc.",
    level: "advanced",
    codeExample: ":set ft=python\n:doautoall FileType python"
  },
  {
    question: "Why do comments sometimes appear in the same colour as normal text?",
    shortAnswer: "Either syntax highlighting is off, or the syntax file does not define a Comment group.",
    explanation: "Try `:highlight Comment` to see if it's defined. Some filetypes lack complete syntax definitions.",
    hint: "Install third-party syntax plugins (e.g., `vim‑polyglot`).",
    level: "intermediate",
    codeExample: ":highlight Comment\n:hi Comment ctermfg=Cyan"
  },
  {
    question: "How do I export a file with syntax highlighting to HTML?",
    shortAnswer: "Use `:TOhtml` (built‑in). It creates a new buffer with HTML + CSS colours.",
    explanation: "Save the buffer as `.html` and open in a browser. Great for sharing code snippets.",
    hint: "You can also set `:html_use_css` to 1 for cleaner CSS.",
    level: "intermediate",
    codeExample: ":TOhtml\n:w colours.html"
  },
  {
    question: "Can I have different syntax highlighting for different file extensions that share the same type?",
    shortAnswer: "Yes, use `:autocmd` to set a custom filetype or custom syntax script.",
    explanation: "Example: treat `.h` as C++ while `.c` as C: `autocmd BufRead *.h set ft=cpp`.",
    hint: "You can also split syntax rules into multiple files and source them conditionally.",
    level: "advanced",
    codeExample: "autocmd BufRead,BufNewFile *.h set ft=cpp\n:set ft?   // now shows cpp"
  },
  {
    question: "What is the purpose of `:syn sync`?",
    shortAnswer: "It controls how Vim synchronises syntax highlighting across line breaks.",
    explanation: "Complex syntax (e.g., multi‑line comments) can break; `:syn sync fromstart` forces re‑scanning from the beginning.",
    hint: "Use `:syn sync maxlines=200` to limit scanning distance.",
    level: "advanced",
    codeExample: ":syn sync fromstart\n:syn sync minlines=100"
  },
  {
    question: "How do I highlight trailing whitespace permanently?",
    shortAnswer: "Add a syntax rule: `highlight ExtraWhitespace ctermbg=red guibg=red` and a match: `match ExtraWhitespace /\\s\\+$/`",
    explanation: "Put these in your .vimrc or create an autocmd for interesting file types.",
    hint: "Use `:match` to test, then convert to syntax rule.",
    level: "advanced",
    codeExample: "highlight ExtraWhitespace ctermbg=red\nmatch ExtraWhitespace /\\s\\+$/"
  },
  {
    question: "What does `:highlight clear` do?",
    shortAnswer: "Clears all syntax highlighting definitions (but does not turn off syntax).",
    explanation: "Essentially resets colours to default. Useful if a colour scheme made a mess.",
    hint: "Follow with `:syntax on` to reload defaults.",
    level: "intermediate",
    codeExample: ":highlight clear\n:syntax on"
  }
];

export default questions;
const questions = [
  {
    question: "What is the difference between a buffer and a window in Vim?",
    shortAnswer: "A buffer is file content in memory; a window is a viewport onto a buffer.",
    explanation: "You can have multiple windows showing the same buffer (different positions) or different buffers. Closing a window does not delete the buffer.",
    hint: "Think of buffers as open documents and windows as split panes in an IDE.",
    level: "basic",
    codeExample: ":ls          // list buffers\n:sp          // new window showing same buffer\n:vs #        // vertical split showing alternate buffer"
  },
  {
    question: "How do you open a horizontal split?",
    shortAnswer: "Use `:split` or `:sp`.",
    explanation: "The screen is divided into two panes, one above the other. The current buffer appears in both by default. You can then edit different files in each.",
    hint: "Try `:sp filename` to open a specific file in the new split.",
    level: "basic",
    codeExample: ":sp\n:sp /etc/hosts"
  },
  {
    question: "What command creates a vertical split?",
    shortAnswer: "`:vsplit` or `:vs`.",
    explanation: "Splits the window vertically (left/right). Useful for side‑by‑side comparisons.",
    hint: "Combine with `#` to open the alternate file: `:vs #`.",
    level: "basic",
    codeExample: ":vs\n:vs config.h"
  },
  {
    question: "How do you move the cursor between split windows?",
    shortAnswer: "Press `Ctrl+w` then one of the movement keys: `h`, `j`, `k`, `l` (or arrow keys).",
    explanation: "`j` moves down, `k` up, `h` left, `l` right. `Ctrl+w w` cycles through windows in order.",
    hint: "Practice: `Ctrl+w l` moves to the right window, `Ctrl+w h` back left.",
    level: "basic",
    codeExample: "Ctrl+w j   // move to window below\nCtrl+w k   // move up\nCtrl+w w   // next window"
  },
  {
    question: "How do you close only the current window?",
    shortAnswer: "Use `:q` or `Ctrl+w q`.",
    explanation: "If it's the last window, Vim will exit. To keep Vim running but close a window, ensure at least one other window remains open first.",
    hint: "`Ctrl+w o` closes all other windows, keeping only the current one.",
    level: "basic",
    codeExample: ":q\nCtrl+w q"
  },
  {
    question: "How can you open a new empty file in a split?",
    shortAnswer: "Use `:new` (horizontal) or `:vnew` (vertical).",
    explanation: "These create an unnamed buffer, which you can later save with `:w filename`. Useful for scratchpads.",
    hint: "`:new` is like `:split` but with an empty buffer instead of the current file.",
    level: "intermediate",
    codeExample: ":new\n:vnew"
  },
  {
    question: "How do you resize split windows?",
    shortAnswer: "Use `:resize +N` or `:resize -N` for height; preface with `:vertical` for width.",
    explanation: "You can also use `Ctrl+w +` (increase height) and `Ctrl+w -` (decrease height). For vertical resizing, `Ctrl+w >` and `<`.",
    hint: "Equalize all windows with `Ctrl+w =`.",
    level: "intermediate",
    codeExample: ":resize +5\n:vertical resize -10\nCtrl+w ="
  },
  {
    question: "Can you show the same buffer in two windows at different locations?",
    shortAnswer: "Yes, split the window with `:sp` or `:vs`. Each window can be scrolled independently.",
    explanation: "This is extremely useful when editing a long file – you can keep a reference at the top while working on the bottom.",
    hint: "Use `:set scrollbind` to synchronize scrolling between windows if needed.",
    level: "intermediate",
    codeExample: ":sp\n<Ctrl+w j>   // move to bottom window\nG            // go to end of file\n<Ctrl+w k>   // back to top window"
  },
  {
    question: "What does `Ctrl+w o` do?",
    shortAnswer: "Closes all other windows, leaving only the current one.",
    explanation: "`o` stands for 'only'. Great for focusing after creating many splits.",
    hint: "Equivalent to `:only`.",
    level: "intermediate",
    codeExample: "Ctrl+w o   // now only this window remains"
  },
  {
    question: "How do you start Vim with predefined splits from the command line?",
    shortAnswer: "Use `-o` (horizontal) or `-O` (vertical) followed by filenames.",
    explanation: "Example: `vim -O file1 file2 file3` opens three vertical splits. Very efficient for multi‑file workflows.",
    hint: "Combine with `-p` for tabs, but splits are better for comparisons.",
    level: "advanced",
    codeExample: "vim -O main.c util.c\nvim -o log1.log log2.log"
  },
  {
    question: "How can you move a window to a different position?",
    shortAnswer: "Use `Ctrl+w H`, `J`, `K`, `L` (capital letters).",
    explanation: "These move the current window to the far left, bottom, top, or right respectively. Rearranging splits avoids closing and reopening.",
    hint: "`Ctrl+w r` rotates windows, `Ctrl+w R` rotates backwards.",
    level: "advanced",
    codeExample: "Ctrl+w K   // move current window to top\nCtrl+w H   // move to far left"
  },
  {
    question: "What is the difference between `:sp` and `:new`?",
    shortAnswer: "`:sp` shows the current buffer in the new window; `:new` creates an empty buffer.",
    explanation: "`:new` is equivalent to `:enew` followed by `:sp`. Both are horizontal splits.",
    hint: "Use `:vnew` for vertical empty splits.",
    level: "intermediate",
    codeExample: ":sp        // current file in both windows\n:new       // top window empty, bottom window current file"
  },
  {
    question: "How can you switch to the next window without using `Ctrl+w` prefix?",
    shortAnswer: "Remap keys in `.vimrc` (e.g., `nnoremap <C-j> <C-w>j`).",
    explanation: "Many Vim users map `Ctrl+h/j/k/l` directly to window navigation, bypassing the `Ctrl+w` prefix.",
    hint: "Add those mappings to your vimrc for a smoother experience.",
    level: "advanced",
    codeExample: "nnoremap <C-h> <C-w>h\nnnoremap <C-l> <C-w>l"
  },
  {
    question: "Can you open a terminal inside a Vim split?",
    shortAnswer: "Yes, with `:term` (needs Vim 8+ or Neovim).",
    explanation: "`:term` opens a terminal emulator in a new split. You can run shell commands without leaving Vim.",
    hint: "Use `Ctrl+w N` to enter terminal Normal mode, then navigate as usual.",
    level: "advanced",
    codeExample: ":term\nls -la\nexit   // close terminal buffer"
  },
  {
    question: "How do you save the current window layout to restore later?",
    shortAnswer: "Use `:mksession session.vim`.",
    explanation: "Saves all windows, splits, and open files. Later, `vim -S session.vim` restores everything.",
    hint: "Add `set sessionoptions+=resize,winpos` to also save window sizes.",
    level: "advanced",
    codeExample: ":mksession mywork.vim\nvim -S mywork.vim"
  },
  {
    question: "How can you make all windows the same height/width?",
    shortAnswer: "Press `Ctrl+w =`.",
    explanation: "Equalizes the size of all windows based on available space. Useful after manual resizing.",
    hint: "If you want to give more space to a specific window, resize it first, then equalize others.",
    level: "intermediate",
    codeExample: "Ctrl+w ="
  },
  {
    question: "What does `:bufdo` do in relation to splits?",
    shortAnswer: "It runs a command on all buffers, not windows.",
    explanation: "Splits are views; `:bufdo` operates on the underlying buffers. Useful for substitutions across open files regardless of split arrangement.",
    hint: "Combine with `:wall` to save all buffers after `:bufdo`.",
    level: "advanced",
    codeExample: ":bufdo %s/foo/bar/g | update"
  },
  {
    question: "How do you open a file in a new split without leaving Normal mode?",
    shortAnswer: "Use `:sp filename` or `:vs filename` while in Normal mode.",
    explanation: "You can also use `Ctrl+w f` to open the file under the cursor in a new split (like `gf` but split).",
    hint: "`Ctrl+w F` opens in a new split and jumps to the line number after the filename.",
    level: "intermediate",
    codeExample: ":sp ../otherfile.txt\n:vs /var/log/syslog"
  },
  {
    question: "Can you have more than two splits?",
    shortAnswer: "Yes, unlimited splits (practically limited by screen size).",
    explanation: "You can mix horizontal and vertical splits. Each split can be further split.",
    hint: "Use `:help windows` to see the maximum (usually 100+).",
    level: "basic",
    codeExample: ":vs\n:sp\n:vs\nCtrl+w w"
  },
  {
    question: "What is the quickest way to maximize a split temporarily?",
    shortAnswer: "Press `Ctrl+w _` (height) or `Ctrl+w |` (width), then `Ctrl+w =` to restore.",
    explanation: "Maximizing a split lets you focus on one area without closing others.",
    hint: "To toggle maximize, use a plugin like `vim-maximizer` or write a simple mapping.",
    level: "advanced",
    codeExample: "Ctrl+w _   // full height for current window\nCtrl+w |   // full width"
  }
];

export default questions;
// topic9_questions.js – 20 FAQ questions about search and line replace

const questions = [
  {
    question: "How do I search forward for a word in vi?",
    shortAnswer: "Type `/word` and press Enter.",
    explanation: "In Normal mode, `/` begins a forward search. Type the pattern and press Enter. The cursor moves to the first match. Use `n` for next match, `N` for previous.",
    hint: "After searching, the pattern remains active until you search for something else.",
    level: "beginner",
    codeExample: "`/function` finds the next occurrence of 'function'."
  },
  {
    question: "How do I search backward?",
    shortAnswer: "Use `?word` (question mark) instead of slash.",
    explanation: "`?` searches backward from the cursor position. `n` continues backward, `N` reverses to forward. Useful when you know the match is before the cursor.",
    hint: "`?` is great for scanning up in a file.",
    level: "moderate",
    codeExample: "`?error` finds previous 'error'."
  },
  {
    question: "What does `n` do after a search?",
    shortAnswer: "Repeats the last search in the same direction (forward for `/`, backward for `?`).",
    explanation: "`n` is extremely efficient for jumping through matches without re‑typing. You can also use a count: `3n` jumps to the third match ahead.",
    hint: "Hold `n` to quickly scroll through matches.",
    level: "beginner",
    codeExample: "After `/the`, pressing `n` repeatedly moves through each 'the'."
  },
  {
    question: "What does `N` do?",
    shortAnswer: "Repeats the last search in the opposite direction.",
    explanation: "If you overshoot a match, `N` goes back one. It's the reverse of `n`. With counts, `3N` moves three matches backward.",
    hint: "`N` = opposite direction.",
    level: "moderate",
    codeExample: "After `/foo`, `n` forward, `N` backward."
  },
  {
    question: "How do I replace the first occurrence of 'old' with 'new' on the current line?",
    shortAnswer: "Use `:s/old/new/` (no 'g' flag).",
    explanation: "The substitute command `:s` works on the current line by default. Without `g`, it changes only the first match on the line.",
    hint: "The cursor can be anywhere on the line; the replacement affects the first match regardless.",
    level: "moderate",
    codeExample: "Line 'foo foo', `:s/foo/bar/` → 'bar foo'."
  },
  {
    question: "How do I replace all occurrences of 'old' with 'new' on the current line?",
    shortAnswer: "Use `:s/old/new/g` (with `g` flag).",
    explanation: "The `g` stands for 'global' (on the line). It replaces every match on the line, not just the first.",
    hint: "Remember `g` for 'all on line' – think 'global line'.",
    level: "moderate",
    codeExample: "Line 'foo foo', `:s/foo/bar/g` → 'bar bar'."
  },
  {
    question: "How can I replace with confirmation (ask before each change)?",
    shortAnswer: "Add `c` flag: `:s/old/new/gc`. Vi will ask 'y/n' for each match.",
    explanation: "The `c` flag prompts: 'replace with new (y/n/a/q/l/^E/^Y)?' You can answer `y` for yes, `n` for no, `a` for all remaining, `q` to quit, etc.",
    hint: "Very useful for careful refactoring where you want to skip some matches.",
    level: "expert",
    codeExample: "`:s/false/true/gc` asks before each replacement."
  },
  {
    question: "What does `//` (empty pattern) mean in substitute?",
    shortAnswer: "It reuses the last search pattern.",
    explanation: "If you searched for `/foo`, then `:s//bar/g` replaces all 'foo' with 'bar' on the current line. Very handy to avoid retyping.",
    hint: "Alternatively, you can use `:s/` then up arrow to recall previous substitute.",
    level: "expert",
    codeExample: "`/pattern` then `:s//replacement/g` works without re‑typing 'pattern'."
  },
  {
    question: "How do I search for a literal dot (.) instead of any character?",
    shortAnswer: "Escape it: `\\.` (backslash dot).",
    explanation: "In search patterns, `.` matches any character. To match a literal dot, use `\\.`. Similarly, `*`, `[`, `]`, `^`, `$` have special meanings and need escaping.",
    hint: "Use `:set hlsearch` to see matches highlighted; test your patterns.",
    level: "moderate",
    codeExample: "`/\\.txt` finds lines containing '.txt'."
  },
  {
    question: "How do I search for a whole word (not part of another word)?",
    shortAnswer: "Use `\<` and `\>`: `/\<word\>`",
    explanation: "`\<` matches start of word, `\>` matches end of word. This ensures you don't match 'word' inside 'password'.",
    hint: "In vim, you can also use `/\v<word>` after `:set magic`.",
    level: "expert",
    codeExample: "`/\<the\>` finds 'the' but not 'then' or 'other'."
  },
  {
    question: "Can I use search patterns with `:s`?",
    shortAnswer: "Yes, the same pattern syntax works: `:s/\\<old\\>/new/g` replaces whole words.",
    explanation: "All regex features (`.*`, `\\+`, `\\?`, `\\|` for alternation, etc.) work in substitute patterns. You just need to escape certain characters.",
    hint: "Learn basic regex – it's a superpower in vi.",
    level: "expert",
    codeExample: "`:s/h[ae]llo/hello/g` replaces 'hallo' or 'hello' with 'hello'."
  },
  {
    question: "What does `:s/old/new/` do if 'old' contains slashes?",
    shortAnswer: "Use a different delimiter, like `:s|old/path|new/path|` or escape the slashes: `s/old\\/path/new\\/path/`.",
    explanation: "vi allows any non‑alphanumeric character as delimiter after `s`. Common alternatives are `|`, `+`, `:`, `#`. This avoids 'leaning toothpick' syndrome.",
    hint: "When replacing paths, use `:s#/usr/local#/opt#g` for readability.",
    level: "expert",
    codeExample: "`:s+/usr/bin+/opt/bin+` (using + as delimiter)."
  },
  {
    question: "How do I repeat the last substitute command on the current line?",
    shortAnswer: "Use `&` (ampersand) in Normal mode, or `:s` with no arguments.",
    explanation: "`&` repeats the last substitute without flags? Actually `&` repeats the last `:s` with the same flags. In vim, `:s` alone repeats the last substitute on the current line.",
    hint: "`&` works in vi; `:s` with empty pattern also works.",
    level: "expert",
    codeExample: "After `:s/foo/bar/g`, typing `&` repeats it on the current line."
  },
  {
    question: "How do I search case-insensitively?",
    shortAnswer: "Set `:set ignorecase` before searching, or add `\\c` to the pattern: `/pattern\\c`.",
    explanation: "`\\c` makes the pattern case-insensitive for that search only. `:set ignorecase` makes all searches case-insensitive until `:set noignorecase`.",
    hint: "Use `:set smartcase` to ignore case only if the pattern is all lowercase.",
    level: "moderate",
    codeExample: "`/hello\\c` matches 'Hello', 'HELLO', 'hello'."
  },
  {
    question: "How can I see all search matches highlighted?",
    shortAnswer: "Use `:set hlsearch`. Highlights all matches of the last search pattern.",
    explanation: "`hlsearch` is very helpful for understanding where your pattern matches. To clear highlight, use `:nohlsearch` or `:noh`.",
    hint: "Add `set hlsearch` to `.vimrc`.",
    level: "moderate",
    codeExample: "`:set hlsearch` then `/foo` – every 'foo' is highlighted."
  },
  {
    question: "What is the difference between `n` and `;`?",
    shortAnswer: "`n` repeats the last search. `;` repeats the last `f`/`F`/`t`/`T` (character search).",
    explanation: "`;` is for repeating a character‑find on the same line (e.g., `fx` finds 'x', `;` finds next 'x'). `n` is for `/pattern` search. Do not confuse them.",
    hint: "`n` for pattern search, `;` for single‑character search.",
    level: "expert",
    codeExample: "`/foo` then `n`; `fo` then `;` (second finds 'o') – different."
  },
  {
    question: "How do I delete from cursor to the next occurrence of a pattern?",
    shortAnswer: "Use `d/pattern` (delete forward to pattern).",
    explanation: "This combines delete motion with search: `d/foo` deletes from cursor to just before the next 'foo'. The pattern is not deleted.",
    hint: "You can also use `y/pattern` to yank, `c/pattern` to change.",
    level: "expert",
    codeExample: "Cursor at start of line, `d/end` deletes everything up to 'end'."
  },
  {
    question: "How can I replace only the second occurrence of 'old' on a line?",
    shortAnswer: "Use `:s/old/new/2` (with a count instead of `g`).",
    explanation: "The substitute command can take a count: `:s/old/new/2` replaces the second occurrence. `:s/old/new/3` replaces the third, etc. This is rarely used but possible.",
    hint: "You can also combine: `:s/old/new/g2` replaces from second to end.",
    level: "expert",
    codeExample: "Line 'a a a', `:s/a/b/2` → 'a b a'."
  },
  {
    question: "What does `:noh` mean?",
    shortAnswer: "`:nohlsearch` or `:noh` turns off search highlighting until the next search.",
    explanation: "After `:set hlsearch`, matches remain highlighted. `:noh` clears the highlight without disabling the setting. Very handy to reduce visual clutter.",
    hint: "Map `:noh` to a key: `nnoremap <F2> :noh<CR>`.",
    level: "moderate",
    codeExample: "`:noh` removes current search highlights."
  },
  {
    question: "How can I search for a pattern that includes a newline?",
    shortAnswer: "Use `\\n` in your pattern: `/foo\\nbar` finds 'foo' at end of line and 'bar' at start of next line.",
    explanation: "In vi, `\\n` represents a newline character in search patterns. This allows multi‑line searches. Note: `:s` cannot replace across newlines that simply; need `\\_s` or use global command.",
    hint: "Search across lines is advanced; start with single‑line searches.",
    level: "expert",
    codeExample: "`/error\\n\\s*line` finds 'error' then newline then optional spaces then 'line'."
  }
];

export default questions;
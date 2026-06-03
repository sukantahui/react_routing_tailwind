const questions = [
  {
    question: "What does the `pr` command do?",
    shortAnswer: "Formats text files for printing by adding headers, footers, page numbers, and multi-column layout.",
    explanation: "`pr` paginates a file, adds a header with date/time and filename (or custom text), and can arrange text into columns.",
    hint: "Think of it as a pre-processor for line printers.",
    level: "basic",
    codeExample: "pr file.txt"
  },
  {
    question: "How do you display a file in 3 columns using `pr`?",
    shortAnswer: "`pr -3 file.txt`",
    explanation: "The `-num` flag (where num is a number) creates that many columns.",
    hint: "`pr -2` gives two columns, `pr -4` gives four.",
    level: "basic",
    codeExample: "pr -3 data.txt"
  },
  {
    question: "What is the default page length for `pr`?",
    shortAnswer: "66 lines (traditional line printer page length).",
    explanation: "You can change it with `-l` option, e.g., `pr -l 50`.",
    hint: "Most terminal windows are around 24 lines, so you may need `-l 24` for on-screen paging.",
    level: "intermediate",
    codeExample: "pr -l 30 file.txt"
  },
  {
    question: "How do you suppress the header and footer in `pr` output?",
    shortAnswer: "Use `-T` option.",
    explanation: "`-T` eliminates page headers and footers, providing raw pagination only.",
    hint: "Useful when piping to `less` or another pager.",
    level: "basic",
    codeExample: "pr -T file.txt"
  },
  {
    question: "How can you add a custom header instead of the default?",
    shortAnswer: "`pr -h \"My Header\" file.txt`",
    explanation: "The `-h` option sets a header string; it appears centered at the top of each page.",
    hint: "Enclose multi-word header in quotes.",
    level: "intermediate",
    codeExample: "pr -h \"Sales Report 2025\" sales.txt"
  },
  {
    question: "What does `pr -d` do?",
    shortAnswer: "Double-spaces the output.",
    explanation: "Equivalent to inserting a blank line after every line of input.",
    hint: "Same as `sed G`.",
    level: "intermediate",
    codeExample: "pr -d letter.txt"
  },
  {
    question: "How do you create line numbers on the left margin?",
    shortAnswer: "`pr -n` or `--number-lines`.",
    explanation: "Each line gets a 5-digit number, a tab, and then the original text.",
    hint: "Combine with `-l` to control page length.",
    level: "intermediate",
    codeExample: "pr -n script.sh"
  },
  {
    question: "Can `pr` handle files wider than 72 columns?",
    shortAnswer: "Yes, using `-W` (GNU pr) to set page width, or `-w` (older).",
    explanation: "Default width is 72; use `-W 200` to avoid truncation.",
    hint: "`-W` is specific to GNU coreutils. On BSD/macOS, `-w` works differently.",
    level: "expert",
    codeExample: "pr -W 120 wide_data.txt"
  },
  {
    question: "What is the difference between `pr` and `column`?",
    shortAnswer: "`pr` is for pagination and printing; `column` is for formatting into columns without pagination.",
    explanation: "`pr` adds headers, footers, page breaks; `column` just rearranges columns.",
    hint: "Use `column -t` for table alignment.",
    level: "advanced",
    codeExample: "column -t data.txt"
  },
  {
    question: "How do you send `pr` output directly to a printer?",
    shortAnswer: "Pipe to `lpr`: `pr file.txt | lpr`",
    explanation: "`lpr` sends to the default printer. Use `-P` to specify a printer.",
    hint: "`pr -l 66` matches typical paper length.",
    level: "intermediate",
    codeExample: "pr -h \"Report\" data.txt | lpr -P office_printer"
  },
  {
    question: "What does the `-o` option do?",
    shortAnswer: "Indent lines by a given number of spaces (offset margins).",
    explanation: "`pr -o 5` adds 5 spaces to the left of every line.",
    hint: "Useful for binding or hole-punch margin.",
    level: "intermediate",
    codeExample: "pr -o 10 letter.txt"
  },
  {
    question: "How can you make `pr` output start at a specific page number?",
    shortAnswer: "`pr -f` (form feed) combined with `-N` (starting page number) in GNU pr.",
    explanation: "`pr -N 10` starts numbering pages from 10.",
    hint: "Not all versions support `-N`.",
    level: "expert",
    codeExample: "pr -N 5 -h 'Continuation' report.txt"
  },
  {
    question: "Does `pr` modify the original file?",
    shortAnswer: "No, `pr` only produces output on stdout (or redirected file).",
    explanation: "The original file remains unchanged.",
    hint: "Always redirect to a new file if you want to save formatting.",
    level: "basic",
    codeExample: "pr myfile.txt > formatted.txt"
  },
  {
    question: "How do you display a file with both line numbers and double-spacing?",
    shortAnswer: "`pr -n -d file.txt`",
    explanation: "Options can be combined. Order generally doesn't matter.",
    hint: "`pr -nd` also works (combine flags).",
    level: "intermediate",
    codeExample: "pr -n -d script.sh"
  },
  {
    question: "What is the purpose of `pr -t`?",
    shortAnswer: "Suppress page headers and footers (similar to `-T` in GNU).",
    explanation: "In POSIX, `-t` suppresses headers/footers. GNU accepts both `-T` and `-t`.",
    hint: "Check `man pr` to see which works on your system.",
    level: "advanced",
    codeExample: "pr -t data.txt"
  },
  {
    question: "How can you merge two files side by side using `pr`?",
    shortAnswer: "`pr -m file1.txt file2.txt`",
    explanation: "The `-m` (merge) option displays files in parallel columns.",
    hint: "Useful for comparing two versions of a file.",
    level: "expert",
    codeExample: "pr -m -t left.txt right.txt"
  },
  {
    question: "What is the default header format of `pr`?",
    shortAnswer: "Date and time on left, filename on right, page number centered.",
    explanation: "Example: '2025-03-18 14:30              myfile.txt              Page 1'",
    hint: "Override with `-h`.",
    level: "basic",
    codeExample: "pr sample.txt | head -5"
  },
  {
    question: "How do you get `pr` to output a form feed after each page?",
    shortAnswer: "Use `-f` option.",
    explanation: "`-f` outputs form feed characters (`\f`) between pages, useful for actual printers.",
    hint: "Without `-f`, `pr` uses line feeds and a header for each page.",
    level: "advanced",
    codeExample: "pr -f -l 60 report.txt | lpr"
  },
  {
    question: "Can `pr` accept input from stdin?",
    shortAnswer: "Yes, if no filename is given, `pr` reads from standard input.",
    explanation: "`cat file.txt | pr -3` works.",
    hint: "Useful in pipelines.",
    level: "intermediate",
    codeExample: "ls -1 | pr -4 -h 'Directory Listing'"
  },
  {
    question: "What is the difference between `pr -2` and `pr -a -2`?",
    shortAnswer: "`-a` (across) fills columns row by row instead of down each column.",
    explanation: "Default is down each column; `-a` fills left to right across the page.",
    hint: "Try with a numbered list to see difference.",
    level: "expert",
    codeExample: "seq 1 12 | pr -3 -a   # across\nseq 1 12 | pr -3     # down"
  },
  {
    question: "How would you use `pr` to print a wide spreadsheet?",
    shortAnswer: "Use `pr -W` to set width, and `-l` to set page length.",
    explanation: "For very wide data, consider `pr -W 200 -l 30 data.csv`.",
    hint: "Also combine with `column -t` first.",
    level: "expert",
    codeExample: "column -t -s, data.csv | pr -W 150 -l 40"
  },
  {
    question: "Why does `pr` sometimes add extra blank pages?",
    shortAnswer: "Because the page length (`-l`) is too small or the input ends exactly at page boundary causing trailing form feeds.",
    explanation: "Adjust `-l` or use `-T` to suppress headers that cause extra pages.",
    hint: "Test with `-l 10` on a 20-line file to see behavior.",
    level: "intermediate",
    codeExample: "pr -l 10 sample.txt | wc -l"
  },
  {
    question: "How can you make `pr` honor tabs and not expand them?",
    shortAnswer: "Use `-e` to specify tab expansion; or preprocess with `expand`.",
    explanation: "By default, `pr` may expand tabs to spaces. Use `-e` to control.",
    hint: "`pr -e 4` sets tab stops every 4 columns.",
    level: "expert",
    codeExample: "pr -e 4 file_with_tabs.txt"
  },
  {
    question: "What does `pr -s` do?",
    shortAnswer: "Separate columns by a single character (e.g., tabs).",
    explanation: "When using multi-column output, `-s` changes the column separator (default is space).",
    hint: "`pr -3 -s','` creates comma-separated columns.",
    level: "advanced",
    codeExample: "pr -3 -s$'\t' data.txt"
  },
  {
    question: "Can `pr` rotate the output landscape?",
    shortAnswer: "No, `pr` does not rotate. Use `enscript -r` for landscape.",
    explanation: "Landscape rotation is a printer feature; `pr` only formats text.",
    hint: "`enscript -r -2 file.txt | lpr` gives two-up landscape.",
    level: "expert",
    codeExample: "pr -2 file.txt | enscript -r -o - | lpr"
  },
  {
    question: "How do you get `pr` to start a new page after a specific line pattern?",
    shortAnswer: "`pr` cannot insert page breaks based on content; use `sed` to insert form feeds, then pipe to `pr -f`.",
    explanation: "Example: `sed '/^$/s//\\f/' file.txt | pr -f` starts new page on blank lines.",
    hint: "Combine `sed` and `pr` for advanced pagination.",
    level: "expert",
    codeExample: "sed '/==SECTION==/s//\\f\\n&/' report.txt | pr -f"
  },
  {
    question: "What is the difference between `pr` and `a2ps`?",
    shortAnswer: "`pr` is basic text formatting; `a2ps` is a full 'any to PostScript' converter with fonts, frames, and multiple pages per sheet.",
    explanation: "`a2ps` is far more powerful for generating professional printouts.",
    hint: "Use `a2ps` if you need pretty printing with syntax highlighting.",
    level: "expert",
    codeExample: "a2ps --columns=2 file.txt -o output.ps"
  },
  {
    question: "How would you use `pr` to create a booklet?",
    shortAnswer: "`pr` alone cannot create booklets; combine with `psbook` and `psnup` from psutils.",
    explanation: "First paginate with `pr`, then convert to PostScript, then arrange into booklet.",
    hint: "`pr -2 file.txt | enscript -o - | psbook | psnup -2 | lpr`",
    level: "expert",
    codeExample: "pr -l 60 report.txt | enscript -o temp.ps && psbook temp.ps | psnup -2 | lpr"
  },
  {
    question: "What does the `-i` option do in `pr`?",
    shortAnswer: "Replace spaces with tabs in output (for column padding).",
    explanation: "`-i` reduces output size by using tabs instead of multiple spaces.",
    hint: "Useful for reducing file size when printing source code.",
    level: "advanced",
    codeExample: "pr -i -2 script.sh"
  },
  {
    question: "Why does `pr -3 sample.txt` sometimes misalign columns?",
    shortAnswer: "Because lines have varying lengths; `pr` does not auto-adjust column widths dynamically.",
    explanation: "Use `-W` to set a fixed width, or pre-format with `column -t` before piping to `pr`.",
    hint: "`column -t sample.txt | pr -3` usually aligns better.",
    level: "intermediate",
    codeExample: "column -t data.txt | pr -3 -h 'Aligned Columns'"
  },
  {
    question: "How do you create a `pr` output that can be viewed on a terminal without scrolling?",
    shortAnswer: "Match page length to terminal height, e.g., `pr -l $(tput lines) -T file.txt | less`.",
    explanation: "Use `tput lines` to get terminal height, and `-T` to suppress extra headers.",
    hint: "Pipe to `less` anyway for manual scrolling.",
    level: "expert",
    codeExample: "pr -l $(tput lines) -T longfile.txt | less"
  }
];

export default questions;
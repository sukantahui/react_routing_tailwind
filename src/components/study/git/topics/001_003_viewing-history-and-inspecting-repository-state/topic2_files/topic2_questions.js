// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 2: Custom Log Formatting with Pretty Print: git log --pretty=format:'%h %ad | %s%d [%an]' --date=short
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What does the placeholder token '%h' represent in a git log --pretty=format string?",
    options: [
      "The full 40-character commit hash",
      "The abbreviated commit hash (usually 7 characters)",
      "The author's home directory",
      "The commit's root tree hash"
    ],
    correctAnswer: 1,
    explanation: "'%h' expands to the abbreviated commit hash, whereas '%H' produces the full 40-character hexadecimal SHA."
  },
  {
    id: 2,
    question: "Which placeholder token outputs the author's name in a custom format string?",
    options: [
      "%an",
      "%cn",
      "%au",
      "%name"
    ],
    correctAnswer: 0,
    explanation: "'%an' represents Author Name. In contrast, '%cn' represents Committer Name."
  },
  {
    id: 3,
    question: "What is the effect of adding '--date=short' when using '%ad' in a format string?",
    options: [
      "Dates are formatted as 'YYYY-MM-DD'",
      "Dates are truncated to the first 3 letters of the month",
      "Dates display in relative terms like '2 hours ago'",
      "Timestamps are printed in Unix epoch seconds"
    ],
    correctAnswer: 0,
    explanation: "'--date=short' formats timestamps in the ISO date standard 'YYYY-MM-DD' without time or timezone offsets."
  },
  {
    id: 4,
    question: "How do you insert an ASCII tab character into a git log custom format string for TSV file exporting?",
    options: [
      "\\t",
      "%x09",
      "%tab",
      "&tab;"
    ],
    correctAnswer: 1,
    explanation: "'%x09' outputs a byte corresponding to hexadecimal 09, which is the ASCII horizontal tab character. '%x00' to '%xFF' can output any hex byte."
  },
  {
    id: 5,
    question: "What is the difference between '%ar' and '%ad'?",
    options: [
      "'%ar' shows relative author date (e.g. '2 weeks ago'), while '%ad' outputs the author date styled by --date flag",
      "'%ar' shows author repository URL, while '%ad' shows author domain",
      "'%ar' is reserved for committer date",
      "'%ar' stands for author region"
    ],
    correctAnswer: 0,
    explanation: "'%ar' provides human-friendly relative time (e.g., '5 minutes ago', '3 days ago'), whereas '%ad' formats the author timestamp according to '--date'."
  },
  {
    id: 6,
    question: "Which token is used to reset terminal text color back to default inside a '%C(...)' sequence?",
    options: [
      "%C(none)",
      "%C(reset)",
      "%C(clear)",
      "%C(default)"
    ],
    correctAnswer: 1,
    explanation: "'%C(reset)' outputs the ANSI reset escape code, preventing previously applied colors from bleeding into subsequent text."
  },
  {
    id: 7,
    question: "What does the placeholder '%s' represent in git log format?",
    options: [
      "The commit subject line (first line of commit message)",
      "The file size of the commit",
      "The GPG signature status",
      "The stash pointer"
    ],
    correctAnswer: 0,
    explanation: "'%s' extracts the single-line subject of the commit message (the first line prior to any blank line)."
  },
  {
    id: 8,
    question: "If a developer wants to include the full multi-line commit message including the body, which token should be used?",
    options: [
      "%s",
      "%b",
      "%B",
      "%m"
    ],
    correctAnswer: 2,
    explanation: "'%B' outputs the raw, unabbreviated commit message including both subject and multi-paragraph body. '%b' outputs only the body."
  },
  {
    id: 9,
    question: "What token displays ref names (branches, tags, HEAD) enclosed in parentheses?",
    options: [
      "%d",
      "%D",
      "%r",
      "%ref"
    ],
    correctAnswer: 0,
    explanation: "'%d' prints ref decorations enclosed in parentheses like '(HEAD -> main, origin/main)'. '%D' prints them without parentheses."
  },
  {
    id: 10,
    question: "Which date flag produces an exact ISO 8601 timestamp with strict timezone formatting?",
    options: [
      "--date=iso-strict",
      "--date=utc",
      "--date=system",
      "--date=epoch"
    ],
    correctAnswer: 0,
    explanation: "'--date=iso-strict' formats timestamps strictly according to ISO 8601 (e.g., '2026-09-14T18:30:15+05:30')."
  },
  {
    id: 11,
    question: "What does '%C(auto)%d%C(reset)' accomplish in a format string?",
    options: [
      "It renders branch and tag decorations in their default Git color scheme (green for local, red for remote, yellow for tags)",
      "It disables decorations on automated CI systems",
      "It converts dates into local computer timezone",
      "It deletes stale branches"
    ],
    correctAnswer: 0,
    explanation: "'%C(auto)' instructs Git to colorize following tokens (especially '%d' and '%D') using standard branch/tag color rules."
  },
  {
    id: 12,
    question: "What token outputs the parent commit SHA hashes of a commit?",
    options: [
      "%P (or %p for short)",
      "%par",
      "%ancestor",
      "%root"
    ],
    correctAnswer: 0,
    explanation: "'%P' prints full parent SHA hashes separated by spaces; '%p' prints abbreviated parent hashes."
  },
  {
    id: 13,
    question: "How can Sukanta Sir configure a permanent Git alias named 'git lgs' for the short-date pretty log?",
    options: [
      "git config --global alias.lgs \"log --pretty=format:'%h %ad | %s%d [%an]' --date=short\"",
      "git alias add lgs = format short",
      "git log --alias lgs",
      "git set lgs format"
    ],
    correctAnswer: 0,
    explanation: "Using 'git config --global alias.lgs \"log --pretty=format:'%h %ad | %s%d [%an]' --date=short\"' defines the global alias."
  },
  {
    id: 14,
    question: "What is the output of the placeholder '%ae'?",
    options: [
      "Author Email",
      "Author Epoch time",
      "Author Entity ID",
      "Author Enterprise domain"
    ],
    correctAnswer: 0,
    explanation: "'%ae' expands to the Author's email address (e.g. 'debangshu@barrackpore-devs.org')."
  },
  {
    id: 15,
    question: "What is the output of '%cn' vs '%an' on a commit created via GitHub Pull Request merge button?",
    options: [
      "%an is the original PR author, while %cn is 'GitHub' or the reviewer who clicked merge",
      "%an and %cn are always identical in Git",
      "%an is undefined on web merges",
      "%cn is the Git server IP address"
    ],
    correctAnswer: 0,
    explanation: "The original contributor is '%an', while the person or automated bot applying the merge commit to main is '%cn'."
  },
  {
    id: 16,
    question: "Which token can be used to output a newline character in pretty format strings?",
    options: [
      "%n",
      "\\n",
      "%newline",
      "%break"
    ],
    correctAnswer: 0,
    explanation: "'%n' inserts a literal newline in custom pretty format strings."
  },
  {
    id: 17,
    question: "What is the purpose of the '%t' placeholder token?",
    options: [
      "Abbreviated Tree object hash pointing to the repository snapshot directory structure",
      "Terminal title string",
      "Total number of modified files",
      "Execution time in milliseconds"
    ],
    correctAnswer: 0,
    explanation: "'%t' represents the abbreviated Tree SHA-1 hash referenced by the commit object."
  },
  {
    id: 18,
    question: "What does '--date=format:\"%Y/%m/%d %H:%M\"' allow developers to do?",
    options: [
      "Specify a fully customized C-style strftime timestamp representation",
      "Change the operating system clock before committing",
      "Filter commits by date ranges",
      "Compress old commits"
    ],
    correctAnswer: 0,
    explanation: "'--date=format:...' accepts standard strftime format tokens (%Y, %m, %d, %H, %M, %S) for custom date layouts."
  },
  {
    id: 19,
    question: "If Debangshu wants to generate a release changelog in Markdown list format, which format string should he use?",
    options: [
      "git log --pretty=format:'- %s ([%h](https://github.com/org/repo/commit/%H)) - @%an'",
      "git log --markdown",
      "git export markdown-log",
      "git changelog --md"
    ],
    correctAnswer: 0,
    explanation: "Custom format strings can directly embed Markdown hyperlink syntax linking short hashes to web commit URLs."
  },
  {
    id: 20,
    question: "What happens if an invalid placeholder like '%xyz' is passed to git log --pretty=format?",
    options: [
      "Git prints '%xyz' literally as raw text or ignores the unknown characters",
      "Git deletes the commit history",
      "Git crashes with a fatal segmentation fault",
      "Git resets HEAD to master"
    ],
    correctAnswer: 0,
    explanation: "Unrecognized characters in custom format strings are treated as literal characters and printed as-is."
  },
  {
    id: 21,
    question: "How can you combine '--graph' with a custom '--pretty=format:' string?",
    options: [
      "Simply supply both flags: git log --graph --pretty=format:'%h %ad | %s [%an]' --date=short",
      "You cannot use --graph with custom formats",
      "By installing a third-party Python plugin",
      "Only when exporting to XML"
    ],
    correctAnswer: 0,
    explanation: "'--graph' works harmoniously with custom format strings, placing ASCII tree markers to the left of the formatted lines."
  },
  {
    id: 22,
    question: "What is the token for GPG signature verification status in pretty formats?",
    options: [
      "%G?",
      "%sig",
      "%gpg",
      "%key"
    ],
    correctAnswer: 0,
    explanation: "'%G?' shows the GPG signature verification status ('G' for good, 'B' for bad, 'U' for untrusted, 'N' for no signature)."
  },
  {
    id: 23,
    question: "What is the token for the committer email?",
    options: [
      "%ce",
      "%ae",
      "%email",
      "%cmail"
    ],
    correctAnswer: 0,
    explanation: "'%ce' stands for Committer Email."
  },
  {
    id: 24,
    question: "Why is '--format=' often preferred over '--pretty=format:' in modern shell scripts?",
    options: [
      "'--format=' is shorter and adds an implicit newline after each commit",
      "'--format=' runs twice as fast",
      "'--format=' bypasses Git configuration files",
      "'--format=' converts text to UTF-8 automatically"
    ],
    correctAnswer: 0,
    explanation: "'--format=...' is equivalent to '--pretty=tformat:...', which cleanly terminates every commit output with a newline."
  },
  {
    id: 25,
    question: "Which of the following creates a clean single-line log showing short hash in yellow, relative date in cyan, subject in green, and author in blue?",
    options: [
      "git log --pretty=format:'%C(yellow)%h%C(reset) %C(cyan)%ar%C(reset) %C(green)%s%C(reset) [%C(blue)%an%C(reset)]'",
      "git log --color-all",
      "git log --pretty=colors",
      "git log --palette=rainbow"
    ],
    correctAnswer: 0,
    explanation: "This format string uses %C(color)...%C(reset) sequences around %h, %ar, %s, and %an for high-contrast colorized readability."
  }
];

export default questions;

const questions = [
  {
    question: "What does the `cal` command display by default when run without arguments?",
    shortAnswer: "The calendar of the current month, with today's date highlighted if supported.",
    explanation: "`cal` shows a simple ASCII calendar of the current month, aligning days under weekdays (Sun to Sat by default). It highlights the current day in many terminal emulators using reverse video.",
    hint: "Think about what you'd want to see when you just type `cal` on a random day.",
    level: "basic",
    codeExample: "cal\n# Outputs current month's calendar"
  },
  {
    question: "How can you display the calendar for a specific month and year, e.g., December 1998?",
    shortAnswer: "`cal 12 1998` or `cal dec 1998`",
    explanation: "The `cal` command accepts month (1-12 or name) and year (1-9999). Month first, then year. For December 1998: `cal 12 1998` or `cal dec 1998`.",
    hint: "Remember that month comes before year, unlike the `date` command.",
    level: "basic",
    codeExample: "cal 12 1998\ncal dec 1998"
  },
  {
    question: "What does the `-3` option do in `cal -3`?",
    shortAnswer: "Displays the previous, current, and next month side by side.",
    explanation: "The `-3` option shows three months: last month, current month, and next month, arranged in three columns. Very useful for planning across month boundaries.",
    hint: "Think of seeing three months at a glance – last, now, next.",
    level: "basic",
    codeExample: "cal -3"
  },
  {
    question: "How can you display the entire year 2025 using `cal`?",
    shortAnswer: "`cal 2025` or `cal -y 2025`",
    explanation: "Passing only a year to `cal` shows all 12 months of that year. Also the `-y` option forces year view even if current year is default.",
    hint: "Try `cal 2025` and compare with `cal -y` (same result).",
    level: "basic",
    codeExample: "cal 2025\ncal -y 2025"
  },
  {
    question: "What is the purpose of the `-j` option?",
    shortAnswer: "Displays Julian dates (day-of-year numbers, 1-366) instead of day-of-month.",
    explanation: "Julian date mode shows each day as a number from 1 to 365 (or 366 in leap years), counting from January 1. Useful for day-of-year calculations.",
    hint: "If you need to know 'the 150th day of the year', `cal -j` gives you that mapping.",
    level: "intermediate",
    codeExample: "cal -j\n# March 1 becomes 60 (in non-leap year)"
  },
  {
    question: "How would you make Monday the first day of the week in the calendar?",
    shortAnswer: "Use the `-m` option: `cal -m`",
    explanation: "By default, many systems start the week on Sunday. `-m` shifts the display to Monday-first, which is common in many countries (ISO 8601).",
    hint: "Look up 'Monday first day of week cal' – the option is simple.",
    level: "intermediate",
    codeExample: "cal -m"
  },
  {
    question: "Why does `cal 9 1752` show missing days (Sept 3-13)?",
    shortAnswer: "The Gregorian calendar reform caused 11 days to be skipped when switching from Julian to Gregorian.",
    explanation: "In September 1752, Britain and its colonies adopted the Gregorian calendar, skipping September 3-13 to realign dates. The `cal` command accurately models this historical change.",
    hint: "Think about calendar reforms – not a bug but a history lesson.",
    level: "expert",
    codeExample: "cal 9 1752\n# Output shows days 1,2, then 14-30"
  },
  {
    question: "How can you disable highlighting of the current day?",
    shortAnswer: "Use `cal -h`",
    explanation: "The `-h` option turns off the highlighting (reverse video) of today's date. Useful when redirecting output to a file or when highlight codes cause issues in scripts.",
    hint: "Sometimes you don't want escape characters in logs.",
    level: "intermediate",
    codeExample: "cal -h > calendar.txt"
  },
  {
    question: "How would you show only the previous, current, and next month in Julian date format?",
    shortAnswer: "`cal -j -3`",
    explanation: "Options can be combined. `-j -3` gives the three-month view with Julian day numbers.",
    hint: "Combine any options that make sense together.",
    level: "intermediate",
    codeExample: "cal -j -3"
  },
  {
    question: "What happens if you give `cal 0 2025`?",
    shortAnswer: "It shows December of the previous year (2024).",
    explanation: "Month 0 is interpreted as December of the year before the provided year. This is a quirky but useful feature for looping.",
    hint: "Try `cal 0 2025` and compare with `cal 12 2024`.",
    level: "expert",
    codeExample: "cal 0 2025\n# Same as cal 12 2024"
  },
  {
    question: "How can you determine if a given year is a leap year using `cal`?",
    shortAnswer: "Check if February has 29 days: `cal 02 2024 | grep 29`",
    explanation: "If `cal 02 year` outputs a line with 29, it's a leap year. You can script this by counting lines containing '29'.",
    hint: "Leap year = February 29 exists.",
    level: "intermediate",
    codeExample: "if cal 02 2024 | grep -q 29; then echo 'Leap year'; fi"
  },
  {
    question: "What is the maximum year `cal` can handle on most Linux systems?",
    shortAnswer: "Usually 9999, but some versions go up to 999999.",
    explanation: "The `cal` command historically supports years 1-9999. GNU cal can handle up to year 999999, but output becomes unreadable due to column widths.",
    hint: "Try `cal 10000` on your system – an error may occur.",
    level: "expert",
    codeExample: "cal 9999  # works\ncal 10000 # may fail"
  },
  {
    question: "How can you display a calendar with week numbers?",
    shortAnswer: "Use `ncal` command (if available) with `-w` or `-W` options.",
    explanation: "The traditional `cal` does not show ISO week numbers. The `ncal` (new cal) utility offers `-w` to show week numbers. On some systems `cal -w` might work.",
    hint: "Check `man ncal` – not all systems have it.",
    level: "expert",
    codeExample: "ncal -w"
  },
  {
    question: "How would you extract today's day-of-month from `cal` output?",
    shortAnswer: "`cal | awk 'NR==3 {print $(NF-1)}'` (but fragile). Better: `date +%d`.",
    explanation: "Parsing `cal` for today's date is unreliable because highlighting adds escape codes. Use `date` instead. But for learning, you can try: `cal | tail -n +3 | grep -o '[0-9]*' | tail -1`.",
    hint: "There's a dedicated command for today's date: `date`.",
    level: "expert",
    codeExample: "date +%d   # recommended\ncal | grep $(date +%e)  # messy"
  },
  {
    question: "Can `cal` output in a single line for scripting?",
    shortAnswer: "Not directly, but you can use `cal | tr '\n' ' '` to flatten.",
    explanation: "`cal` is designed for humans, not scripting friendly. For machine-readable calendars, consider `date` or custom scripts. However, `cal -h | paste -s -d ' '` can produce a single line.",
    hint: "Think about why `cal` uses multiple columns – readability.",
    level: "expert",
    codeExample: "cal -h | tr '\n' ' ' | sed 's/ $//'"
  },
  {
    question: "Why does `cal` sometimes show a line like 'Su Mo Tu We Th Fr Sa' twice?",
    shortAnswer: "It's the header repeated for each month when showing multiple months (e.g., `cal -3`).",
    explanation: "When displaying side-by-side months, `cal` repeats the weekday header under each month column for clarity.",
    hint: "Observe the output of `cal -3` – there are three column headers.",
    level: "basic",
    codeExample: "cal -3 | head -4"
  },
  {
    question: "How can you highlight an arbitrary date in `cal` output without using a terminal's reverse video?",
    shortAnswer: "Pipe through `sed` and add ANSI color codes around that date.",
    explanation: "You can use `sed` to wrap a specific day number with color escape sequences. Example: `cal | sed 's/15/\\\x1b[42m&\\\x1b[0m/'` to highlight the 15th in green background.",
    hint: "ANSI escape codes are `\x1b[` followed by style and `m`.",
    level: "expert",
    codeExample: "cal | sed 's/15/\\\x1b[43m&\\\x1b[0m/'"
  },
  {
    question: "What is the difference between `cal` and `ncal` commands?",
    shortAnswer: "`ncal` is an alternative with different layout (Monday first, week numbers, sideways orientation).",
    explanation: "`ncal` (new cal) shows a calendar from Monday to Sunday, includes week numbers, and can rotate the output. Many systems include both.",
    hint: "Try `ncal -b` for the classic cal style.",
    level: "intermediate",
    codeExample: "ncal\nncal -b  # similar to cal"
  },
  {
    question: "How would you generate a calendar of the next 12 months starting from the current month?",
    shortAnswer: "Use a loop with `date` to add months, then call `cal` for each month-year.",
    explanation: "`cal` cannot show a rolling year; you'd need a script: `for i in {0..11}; do date -d \"+$i months\" +%m\\ %Y; done | xargs -n2 cal`",
    hint: "Combine `date` arithmetic with `cal`.",
    level: "expert",
    codeExample: "for i in {0..11}; do cal $(date -d \"+$i months\" +%m) $(date -d \"+$i months\" +%Y); echo '---'; done"
  },
  {
    question: "Why does `cal` show the year 1900 as not having a February 29?",
    shortAnswer: "1900 is not a leap year (divisible by 100 but not by 400).",
    explanation: "The Gregorian rule: leap year if divisible by 4, except centuries not divisible by 400. 1900 fails the century rule.",
    hint: "Check `cal 02 1900 | grep 29` – no output.",
    level: "intermediate",
    codeExample: "cal 02 1900\n# February has 28 days"
  },
  {
    question: "How can you display only the current month's calendar without any escape codes (plain ASCII)?",
    shortAnswer: "`cal -h` disables highlighting, but for complete safety, also pipe through `cat -A` or redirect to file.",
    explanation: "`-h` stops reverse video, but some terminals might still add codes. Use `cal -h 2>/dev/null` or `cal -h | col -b` to strip.",
    hint: "For logs, always use `cal -h`.",
    level: "intermediate",
    codeExample: "cal -h > plain_cal.txt"
  },
  {
    question: "What does the `cal` command do when given three arguments, e.g., `cal 25 12 2025`?",
    shortAnswer: "It shows the calendar for December 2025, and highlights the 25th if it exists.",
    explanation: "Three arguments: day, month, year. The day must be 1-31. It shows the month calendar with that day highlighted (if terminal supports).",
    hint: "Try `cal 25 12 2025` – December 25, 2025 is highlighted.",
    level: "advanced",
    codeExample: "cal 25 12 2025"
  },
  {
    question: "How can you count how many Sundays are in the current month using `cal` and shell commands?",
    shortAnswer: "`cal | awk '/^Su/ {print $2, $3, $4, $5, $6, $7}' | wc -w` (inexact) – Better: `cal | grep -c '^.[0-9]'`",
    explanation: "Because Sunday is the first column, you can count lines in the calendar body that have a number in the first field. A reliable way: `cal | sed -n '3,8p' | awk '{print $1}' | grep -c '[0-9]'`",
    hint: "Sundays appear in the first column of each week row.",
    level: "expert",
    codeExample: "cal | tail -n +3 | head -6 | awk '{print $1}' | grep -c '[0-9]'"
  },
  {
    question: "What is the origin of the `cal` command?",
    shortAnswer: "It first appeared in Version 7 Unix (1979), written by Dennis Ritchie.",
    explanation: "The calendar utility was part of the original Unix toolbox. Its implementation in C has influenced all later versions.",
    hint: "Think of Unix's philosophy: small, focused tools.",
    level: "basic",
    codeExample: "man cal | head -5  # shows history on some systems"
  },
  {
    question: "How does `cal` handle years before 1582 (pre-Gregorian)?",
    shortAnswer: "It proleptically extends the Gregorian calendar backward, ignoring Julian calendar.",
    explanation: "Most `cal` implementations assume the Gregorian calendar rules for all years, even before 1582. So historical dates may not match actual ancient calendars.",
    hint: "Check `cal 10 1582` – it shows the month when Gregorian started.",
    level: "expert",
    codeExample: "cal 10 1582  # October 1582 had 15-31 only"
  },
  {
    question: "Can `cal` display a calendar in a different language?",
    shortAnswer: "Yes, by setting the `LC_TIME` locale, e.g., `LC_TIME=fr_FR cal`.",
    explanation: "The `cal` command respects locale settings for month and weekday names. Install language packs and set `LC_TIME` to get translated calendars.",
    hint: "Try `LC_TIME=es_ES cal` for Spanish month names.",
    level: "advanced",
    codeExample: "LC_TIME=de_DE cal"
  },
  {
    question: "How would you create an infinite loop that displays the current month's calendar and refreshes every hour?",
    shortAnswer: "`while true; do clear; cal; sleep 3600; done`",
    explanation: "Combine `clear` to overwrite the screen, `sleep` for interval. Use `watch -n 3600 cal` even simpler.",
    hint: "`watch` is built for periodic commands.",
    level: "intermediate",
    codeExample: "watch -n 3600 cal"
  },
  {
    question: "Why might `cal` produce different output on macOS vs Linux?",
    shortAnswer: "macOS uses BSD `cal`; Linux generally uses GNU `cal`. Options differ (e.g., `-m` for Monday start on GNU, but macOS uses different flags).",
    explanation: "GNU cal has options like `-m`, while BSD cal might use `-C` or other. Always check `man cal` for your system.",
    hint: "Cross-platform scripts should test for available options.",
    level: "expert",
    codeExample: "cal --version  # GNU\ncal -V          # BSD"
  },
  {
    question: "How can you embed the current month's calendar into a web page using server-side scripting?",
    shortAnswer: "Use `exec('cal -h')` in PHP or `subprocess` in Python to capture output and wrap in `<pre>`.",
    explanation: "Because `cal` outputs plain text, you can execute it from any language, capture stdout, and present it inside `<pre>` tags. Disable highlighting (`-h`) to avoid escape codes.",
    hint: "Sanitize output for web (no ANSI codes).",
    level: "expert",
    codeExample: "<?php echo '<pre>' . shell_exec('cal -h') . '</pre>'; ?>"
  },
  {
    question: "What is the difference between `cal` and `gcal` (GNU calendar)?",
    shortAnswer: "`gcal` is a more feature-rich calendar program supporting holidays, reminders, and complex recurrences.",
    explanation: "GNU `gcal` can display calendars for multiple years, highlight holidays, and parse calendar files. `cal` is minimal; `gcal` is advanced but not always installed.",
    hint: "If you need holiday lists, look into `gcal`.",
    level: "expert",
    codeExample: "gcal -H  # show today with holidays"
  }
];

export default questions;
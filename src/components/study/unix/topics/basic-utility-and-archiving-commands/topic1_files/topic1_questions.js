const questions = [
  {
    question: "What does the `date` command display by default?",
    shortAnswer: "Current system date and time in the local timezone.",
    explanation: "Without options, `date` outputs the current date, time, timezone, and day of week (e.g., 'Tue Mar 18 14:30:00 IST 2025').",
    hint: "Try simply typing `date` in your terminal.",
    level: "basic",
    codeExample: "date"
  },
  {
    question: "How can you output the date in YYYY-MM-DD format?",
    shortAnswer: "`date +%Y-%m-%d`",
    explanation: "%Y = 4-digit year, %m = month (01-12), %d = day of month (01-31). Hyphens are literal characters.",
    hint: "Format specifiers are case-sensitive.",
    level: "basic",
    codeExample: "date +%Y-%m-%d"
  },
  {
    question: "What does `date +%s` output?",
    shortAnswer: "Seconds since the Unix epoch (1970-01-01 00:00:00 UTC).",
    explanation: "It's a machine-readable timestamp, very useful for calculating differences and sorting.",
    hint: "Try to convert it back using `date -d @timestamp`.",
    level: "intermediate",
    codeExample: "date +%s"
  },
  {
    question: "How do you display UTC time instead of local time?",
    shortAnswer: "`date -u` or `date --utc`",
    explanation: "The `-u` flag forces UTC, ignoring local timezone settings.",
    hint: "Useful for logs across servers in different timezones.",
    level: "basic",
    codeExample: "date -u"
  },
  {
    question: "How can you display yesterday's date?",
    shortAnswer: "`date -d 'yesterday'` or `date -d '1 day ago'`",
    explanation: "The `-d` option allows date string manipulation (GNU date).",
    hint: "Try `date -d 'last Friday'` for weekly reports.",
    level: "intermediate",
    codeExample: "date -d 'yesterday' +%F"
  },
  {
    question: "What is the purpose of the `-d` option?",
    shortAnswer: "To display a specified date/time instead of the current one.",
    explanation: "You can give relative strings (yesterday, next week) or absolute dates (2025-12-25).",
    hint: "Also known as `--date`.",
    level: "intermediate",
    codeExample: "date -d '2025-12-25'"
  },
  {
    question: "How do you get the day of the week (e.g., Monday) from a date?",
    shortAnswer: "`date +%A`",
    explanation: "%A gives full weekday name; %a gives abbreviated (Mon, Tue).",
    hint: "Works for any date when combined with `-d`.",
    level: "basic",
    codeExample: "date +%A"
  },
  {
    question: "What is the difference between `%H` and `%I` format specifiers?",
    shortAnswer: "%H is 24-hour (00-23), %I is 12-hour (01-12).",
    explanation: "Use `%p` for AM/PM indicator when using 12-hour format.",
    hint: "Try `date +'%I:%M %p'`.",
    level: "basic",
    codeExample: "date +'%H:%M' vs date +'%I:%M %p'"
  },
  {
    question: "How can you set the system date using `date`?",
    shortAnswer: "`sudo date -s '2025-03-18 10:30:00'`",
    explanation: "Setting requires root privileges. The format is generally 'YYYY-MM-DD HH:MM:SS'.",
    hint: "Be careful – changing time can break cron and logs.",
    level: "expert",
    codeExample: "sudo date -s '2025-03-18 10:30:00'"
  },
  {
    question: "Why does `date -d '2025-02-30'` produce an error?",
    shortAnswer: "February 30 is an invalid date.",
    explanation: "`date` validates the date; invalid ones cause 'invalid date' error.",
    hint: "Always use `date -d` with valid dates.",
    level: "intermediate",
    codeExample: "date -d '2025-02-30'"
  },
  {
    question: "How can you parse a custom format string into a date?",
    shortAnswer: "Use `date -d` with a human-readable format or convert with `date --date='...'`.",
    explanation: "GNU date is flexible, but not all formats are accepted. Use `date -d '03/18/2025'` for US style.",
    hint: "BSD date (macOS) may require different syntax.",
    level: "expert",
    codeExample: "date -d 'March 18 2025'"
  },
  {
    question: "What is the ISO 8601 format and how to get it?",
    shortAnswer: "`date -Iseconds` (or `-Iminutes`, `-Idate`).",
    explanation: "ISO 8601 standard: YYYY-MM-DDTHH:MM:SS+tz. Great for logs and APIs.",
    hint: "Also `date --iso-8601=seconds`.",
    level: "intermediate",
    codeExample: "date -Iseconds"
  },
  {
    question: "How do you get the last second of the current month?",
    shortAnswer: "`date -d 'next month - 1 second'`",
    explanation: "Combination of relative offsets: first day of next month minus one second.",
    hint: "Try `date -d '$(date -d 'next month' +%Y-%m-01) - 1 second'`",
    level: "expert",
    codeExample: "date -d 'next month - 1 second'"
  },
  {
    question: "What does the `%j` specifier do?",
    shortAnswer: "Day of year (001-366).",
    explanation: "Useful for Julian date calculations.",
    hint: "Combine with `-d` to get day-of-year for any date.",
    level: "intermediate",
    codeExample: "date +%j"
  },
  {
    question: "How can you display the date in a different timezone without changing system time?",
    shortAnswer: "Set the `TZ` environment variable: `TZ='America/New_York' date`",
    explanation: "TZ overrides the system timezone for that command only.",
    hint: "Use `TZ=UTC date` for UTC without `-u`.",
    level: "advanced",
    codeExample: "TZ='Asia/Tokyo' date"
  },
  {
    question: "Why does my `date -d '2 days ago'` not work on macOS?",
    shortAnswer: "macOS uses BSD date which has different `-j` flags; `-d` expects a different format.",
    explanation: "On macOS, use `date -j -v-2d` (additive) or `date -j -f` for parsing.",
    hint: "Always check `man date` on your system.",
    level: "expert",
    codeExample: "date -j -v-2d +%F"
  },
  {
    question: "How can you calculate the difference between two dates in seconds?",
    shortAnswer: "Convert both to epoch seconds and subtract.",
    explanation: "`echo $(( $(date -d '2025-12-31' +%s) - $(date +%s) ))`",
    hint: "Divide by 86400 for days.",
    level: "expert",
    codeExample: "diff=$(( $(date -d '2025-12-31' +%s) - $(date +%s) )); echo $diff"
  },
  {
    question: "What is the purpose of `date -R`?",
    shortAnswer: "Outputs date in RFC 2822 email format.",
    explanation: "Commonly used in HTTP headers and email Date: fields.",
    hint: "Example: 'Tue, 18 Mar 2025 14:30:00 +0530'",
    level: "intermediate",
    codeExample: "date -R"
  },
  {
    question: "How do you prevent `date` from adding newline?",
    shortAnswer: "Use `printf` or `echo -n` with command substitution, or `date | tr -d '\n'`.",
    explanation: "`date` always adds a newline; you can strip it.",
    hint: "`printf '%s' \"$(date)\"` works.",
    level: "advanced",
    codeExample: "printf '%s' \"$(date)\""
  },
  {
    question: "Can `date` show nanoseconds?",
    shortAnswer: "Yes, with `%N` specifier (GNU date).",
    explanation: "%N outputs nanoseconds (9 digits). Not available on all platforms.",
    hint: "`date +%s.%N` gives high-resolution timestamp.",
    level: "expert",
    codeExample: "date +%s.%N"
  },
  {
    question: "How do you get the current week number (ISO)?",
    shortAnswer: "`date +%V`",
    explanation: "ISO week number: weeks start Monday, first week has Thursday.",
    hint: "Also `%U` (Sunday-first, week 00) and `%W` (Monday-first, week 00).",
    level: "intermediate",
    codeExample: "date +%V"
  },
  {
    question: "What does the `--debug` option do?",
    shortAnswer: "Shows how `date` interprets the `-d` string (GNU date).",
    explanation: "Useful for debugging relative expressions.",
    hint: "Try `date --debug -d 'last Monday'`.",
    level: "expert",
    codeExample: "date --debug -d 'next month'"
  },
  {
    question: "How can you generate a timestamp for a filename that includes seconds?",
    shortAnswer: "`date +%Y%m%d_%H%M%S`",
    explanation: "No spaces, sorts lexicographically.",
    hint: "Combine with `-u` for UTC timestamps.",
    level: "basic",
    codeExample: "backup_$(date +%Y%m%d_%H%M%S).tar.gz"
  },
  {
    question: "Why does `date` show a different time than my system clock?",
    shortAnswer: "Possibly because of timezone or NTP drift; also check if hardware clock is set.",
    explanation: "Run `timedatectl` (Linux) to see system time settings.",
    hint: "`date -u` shows UTC for comparison.",
    level: "intermediate",
    codeExample: "timedatectl"
  },
  {
    question: "What is the maximum future date `date` can handle?",
    shortAnswer: "Depends on system; typically year 9999 or 2^63-1 seconds (year 292 billion).",
    explanation: "GNU date uses 64-bit time_t, so extremely far future.",
    hint: "Try `date -d '1000000-01-01'` – may work.",
    level: "expert",
    codeExample: "date -d '292278994-08-17' # near limit"
  },
  {
    question: "How do you format date to show only the time in 12-hour format?",
    shortAnswer: "`date +'%I:%M:%S %p'`",
    explanation: "%I = hour (01-12), %p = AM/PM.",
    hint: "Capital I, not lowercase L.",
    level: "basic",
    codeExample: "date +'%I:%M:%S %p'"
  },
  {
    question: "Can `date` be used to parse dates from strings?",
    shortAnswer: "Yes, with `-d` followed by a string, e.g., `date -d 'March 18 2025'`.",
    explanation: "GNU `date` is quite flexible; BSD `date` is less so.",
    hint: "Use `date -d '2025-03-18'` for unambiguous parsing.",
    level: "intermediate",
    codeExample: "date -d '2025-03-18' +%A"
  },
  {
    question: "What is the difference between `date` and `hwclock`?",
    shortAnswer: "`date` shows system time (kernel); `hwclock` shows hardware clock (RTC).",
    explanation: "Hardware clock persists when powered off; system time is used by running OS.",
    hint: "`hwclock -s` sets system time from hardware.",
    level: "expert",
    codeExample: "sudo hwclock --show"
  },
  {
    question: "How do you convert an epoch timestamp to readable date?",
    shortAnswer: "`date -d @1609459200`",
    explanation: "The '@' prefix tells `date` to interpret as seconds since epoch.",
    hint: "Also works with milliseconds if you divide.",
    level: "intermediate",
    codeExample: "date -d @1700000000"
  },
  {
    question: "What does `date +%Z` output?",
    shortAnswer: "Current timezone abbreviation (e.g., IST, UTC, EDT).",
    explanation: "Useful for scripts that need to know the active timezone.",
    hint: "Combine with `%z` for numeric offset.",
    level: "basic",
    codeExample: "date +%Z"
  }
];

export default questions;
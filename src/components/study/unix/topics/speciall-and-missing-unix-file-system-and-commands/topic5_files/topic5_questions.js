// topic5_questions.js - 30 questions about touch -d and -t options

const questions = [
  {
    question: "What is the difference between `touch -d` and `touch -t`?",
    shortAnswer: "`-d` accepts human-readable date strings; `-t` accepts a compact numeric format [[CC]YY]MMDDhhmm[.ss].",
    explanation: "`-d` is GNU extension, very flexible. `-t` is POSIX, more portable but less intuitive.",
    hint: "Use `-d` for interactive use, `-t` for scripts that must run on BSD or macOS.",
    level: "basic",
    codeExample: "touch -d '2024-12-31 12:00' file    # GNU\ntouch -t 202412311200 file       # POSIX"
  },
  {
    question: "How can you set a file's timestamp to exactly 3:45 PM on Christmas Day 2025 using `-t`?",
    shortAnswer: "`touch -t 202512251545.00 file` (or `-t 2512251545` using 2-digit year).",
    explanation: "Format: YYYYMMDDhhmm.ss (or YYMMDDhhmm.ss). Ensure 24-hour clock: 3:45 PM = 15:45.",
    hint: "Use `date +%Y%m%d%H%M.%S` to generate current timestamp for comparison.",
    level: "intermediate",
    codeExample: "touch -t 202512251545.00 christmas.txt"
  },
  {
    question: "What does `touch -d 'last Monday 09:00' file` do?",
    shortAnswer: "Sets file timestamp to 09:00 on the most recent Monday (could be today if today is Monday before 09:00, otherwise previous Monday).",
    explanation: "GNU date parser resolves 'last Monday' relative to current date and time. The time component overrides the hour/minute.",
    hint: "Run `date -d 'last Monday 09:00'` to see what it evaluates to.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Is `-d` available on all Unix-like systems?",
    shortAnswer: "No, `-d` is a GNU extension; BSD `touch` uses `-d` differently (sets date as YYYYMMDDhhmm.ss) or not at all.",
    explanation: "On macOS (BSD), `touch -t` works, but `-d` expects a different format. For portability, use `-t`.",
    hint: "Check `man touch` on your system to see supported options.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the meaning of the optional `.ss` in `touch -t`?",
    shortAnswer: "Specifies seconds (00-59). If omitted, seconds default to 00.",
    explanation: "Example: `touch -t 202512311200.30` sets seconds to 30. Including the dot and two digits is mandatory for seconds.",
    hint: "Sub-second precision is not stored by traditional Unix timestamps; it's truncated.",
    level: "intermediate",
    codeExample: "touch -t 202512311200.30 precise.txt"
  },
  {
    question: "How do you set a file's timestamp to 2 hours from now using `-d`?",
    shortAnswer: "`touch -d '+2 hours' file`",
    explanation: "The `+` and `-` signs work with units: hours, days, minutes, seconds, weeks.",
    hint: "Also `touch -d '2 hours' file` works without plus.",
    level: "basic",
    codeExample: "touch -d '+2 hours' later.txt"
  },
  {
    question: "Can `touch -d` understand timezone abbreviations like EST?",
    shortAnswer: "Yes, GNU date parser understands many timezone names (e.g., EST, UTC, PST) but not all. Safer to use numeric offsets like `UTC+5` or ISO with offset.",
    explanation: "`touch -d '2024-12-31 12:00 EST'` works on GNU systems. For portability, avoid timezone names; use UTC or numeric offset.",
    hint: "Test with `date -d` first.",
    level: "expert",
    codeExample: "touch -d '2024-07-04 12:00 UTC' independence.txt"
  },
  {
    question: "What is the range of years for the 2-digit form in `-t`?",
    shortAnswer: "69-99 => 1969-1999; 00-68 => 2000-2068 (POSIX).",
    explanation: "This matches the `date` command's interpretation. For unambiguous dates, use 4-digit year.",
    hint: "Example: `touch -t 6901010000` creates a file with timestamp Jan 1, 1969, 00:00.",
    level: "advanced",
    codeExample: "touch -t 7001010000   # 1970-01-01"
  },
  {
    question: "How can you copy timestamps from one file and then adjust them by one day using `-d`?",
    shortAnswer: "Combine `-r` and `-d`: `touch -r reference -d '+1 day' target`",
    explanation: "`-r` reads reference timestamps, then `-d` applies an offset to those timestamps (GNU touch).",
    hint: "Not all versions support both; test on your system.",
    level: "expert",
    codeExample: "touch -r oldfile -d '+1 day' newfile"
  },
  {
    question: "What happens if you specify an invalid date string with `-d`?",
    shortAnswer: "`touch` prints an error message, does not change the file, and exits with non-zero status.",
    explanation: "Check `$?` in scripts to detect errors. Always validate dynamic date strings before use.",
    hint: "Use `date -d 'string' >/dev/null 2>&1` to test validity.",
    level: "intermediate",
    codeExample: "touch -d 'invalid date' file 2>/dev/null || echo 'Failed'"
  },
  {
    question: "Does `touch -t` allow setting nanoseconds?",
    shortAnswer: "No, traditional `touch` only supports whole seconds. Nanoseconds are not part of POSIX file timestamps.",
    explanation: "Some filesystems support nanosecond granularity, but `touch` does not provide an interface to set them. Use `utimensat()` system call for sub-second.",
    hint: "`stat` may show nanoseconds with `%x`, `%y`, `%z` format specifiers.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you set a file's timestamp to midnight of the current day using `-d`?",
    shortAnswer: "`touch -d '00:00' file` or `touch -d 'today 00:00:00' file`",
    explanation: "Omitting date defaults to today, time overrides the time part.",
    hint: "`touch -d '0:00'` also works.",
    level: "intermediate",
    codeExample: "touch -d '00:00' midnight.txt"
  },
  {
    question: "What does `touch -d 'next month' file` do?",
    shortAnswer: "Sets timestamp to the same day and time next month (if the next month has that day; otherwise adjusts).",
    explanation: "GNU date handles month rollover: Jan 31 +1 month = Mar 3 or Feb 28? Behavior depends on implementation.",
    hint: "Use `date -d 'next month'` to see the result.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why might you use `touch -t` over `-d` in a cron job?",
    shortAnswer: "`-t` is POSIX and guaranteed to work on any Unix without GNU extensions, making it more reliable in diverse environments.",
    explanation: "Cron jobs may run on BSD, AIX, Solaris, etc. Using `-t` ensures no dependency on GNU date parsing.",
    hint: "For cross-platform scripts, always prefer `-t`.",
    level: "intermediate",
    codeExample: "touch -t $(date +%Y%m%d%H%M.%S) file"
  },
  {
    question: "Can `touch -d` use the same format as `date -d`?",
    shortAnswer: "Yes, GNU `touch` uses the same date parser as GNU `date`. Any string accepted by `date -d` works with `touch -d`.",
    explanation: "This includes 'last Friday', 'next week', '2000-01-01 12:00 UTC', '5 days ago', etc.",
    hint: "Test with `date -d` first; if it works, `touch -d` will work.",
    level: "basic",
    codeExample: "date -d 'yesterday'   # test\ntouch -d 'yesterday' file"
  },
  {
    question: "How do you set only the access time using `-d`?",
    shortAnswer: "`touch -a -d '2024-01-01' file`",
    explanation: "`-a` restricts change to access time (atime). Modification time remains unchanged.",
    hint: "Use `-m` for modification time only.",
    level: "intermediate",
    codeExample: "touch -a -d '2023-01-01' old_access.txt"
  },
  {
    question: "Does `-d` accept week numbers?",
    shortAnswer: "Yes, e.g., `touch -d '2024-W01-1'` sets to Monday of week 1, 2024. But format is not intuitive; better to use explicit dates.",
    explanation: "GNU date supports ISO week dates. Example: `2024-W12-3` = Wednesday of week 12, 2024.",
    hint: "Use `date -d` to experiment.",
    level: "expert",
    codeExample: "touch -d '2024-W15-3' week15_wed.txt"
  },
  {
    question: "What is the exit code of `touch -t` if the file does not exist and you have write permissions in the directory?",
    shortAnswer: "0 (success) – it creates the file and sets the timestamp.",
    explanation: "`touch` always succeeds in creating a file (unless permission denied or other error). The timestamp setting is part of the operation.",
    hint: "Check `$?` after `touch`.",
    level: "basic",
    codeExample: "touch -t 202001011200 newfile; echo $? # prints 0"
  },
  {
    question: "How can you set a file's timestamp to the epoch (1970-01-01 00:00:00) using `-t`?",
    shortAnswer: "`touch -t 197001010000.00 file` or `touch -t 7001010000` (if 2-digit allowed).",
    explanation: "Some systems may reject dates before 1970; GNU `touch` accepts them. POSIX may have undefined behavior.",
    hint: "Test with `touch -t 190001010000` – might fail on some systems.",
    level: "advanced",
    codeExample: "touch -t 197001010000 epoch.txt"
  },
  {
    question: "What is the purpose of the `--date=` long option?",
    shortAnswer: "Equivalent to `-d`. Example: `touch --date='yesterday' file` for better readability in scripts.",
    explanation: "GNU long options improve script clarity. `--date` is easier to understand than `-d`.",
    hint: "Combine with `--time=atime` to set only atime.",
    level: "intermediate",
    codeExample: "touch --date='2024-12-31' --time=mtime file"
  },
  {
    question: "Does `touch -d` affect the ctime?",
    shortAnswer: "Yes, because updating atime and/or mtime is a metadata change, so ctime updates to the current time (not the specified date).",
    explanation: "You cannot set ctime arbitrarily; it always reflects the last metadata change. The timestamp you set with `-d` or `-t` applies to atime/mtime, but ctime becomes 'now'.",
    hint: "Run `stat` after `touch` and observe ctime is current time.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you set a file's timestamp to 10:00 AM on the same day but 10 minutes ago?",
    shortAnswer: "`touch -d '10:00 -10 minutes' file` or `touch -d '09:50' file` if currently after 09:50.",
    explanation: "Relative offsets can be combined with absolute times. The parser evaluates left to right.",
    hint: "Better to use exact time if known: `touch -d '09:50'`.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the benefit of using the ISO 8601 format with `-d`?",
    shortAnswer: "Unambiguous and language-independent: `YYYY-MM-DD HH:MM:SS`. Avoids confusion between MM/DD and DD/MM.",
    explanation: "Recommended for scripts to ensure consistent parsing across locales.",
    hint: "Example: `touch -d '2025-12-31 23:59:59'`",
    level: "intermediate",
    codeExample: "touch -d '2024-02-29 12:00' leapday.txt"
  },
  {
    question: "Can `touch -d` handle leap seconds?",
    shortAnswer: "No, Unix timestamps ignore leap seconds. The date string '23:59:60' is invalid.",
    explanation: "Leap seconds are not stored; time is continuous monotonic seconds since epoch. `-d` will reject '60' seconds.",
    hint: "Check `date` documentation for leap second handling.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How would you create a file with timestamp exactly 5 minutes before a given reference file?",
    shortAnswer: "`touch -r ref -d '-5 minutes' target` (GNU touch).",
    explanation: "First read reference times with `-r`, then apply offset with `-d`. Not all versions support this combination.",
    hint: "Fallback: compute epoch diff and use `-t`.",
    level: "expert",
    codeExample: "touch -r original -d '-5 min' earlier"
  },
  {
    question: "What is the maximum date `touch -t` can handle?",
    shortAnswer: "Depends on system; typically up to year 9999 (some systems stop at 2038 due to 32-bit time_t if not 64-bit).",
    explanation: "On modern 64-bit systems, year 292277026596 is theoretically possible (signed 64-bit). But `touch` may have internal limits.",
    hint: "`touch -t 999912312359.59` works on many systems.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why does `touch -d '2024-02-31'` fail?",
    shortAnswer: "February 31 is an invalid date; GNU date parser returns an error.",
    explanation: "The date must be calendrically valid. Errors include month day overflow, out-of-range month, etc.",
    hint: "Always test with `date -d` to avoid surprises.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How can you use `touch -t` in a loop to generate files for each hour of a day?",
    shortAnswer: "Loop hour from 0 to 23, format with two digits, and use `touch -t YYYYMMDDhh00 file`.",
    explanation: "Example: `for h in {00..23}; do touch -t 20250101${h}00 hour_${h}.txt; done`",
    hint: "Use `printf` to pad numbers.",
    level: "advanced",
    codeExample: "for h in {0..23}; do printf -v hh '%02d' $h; touch -t \"20250101${hh}00\" \"hour_${hh}.txt\"; done"
  },
  {
    question: "What does the `--time=WORD` option do with `-d`?",
    shortAnswer: "Specifies which timestamp to set: `--time=atime` (access), `--time=mtime` (modify), or `--time=use` (use the `-d`/`-t` value for both).",
    explanation: "Long option alternative to `-a` and `-m`. Example: `touch --time=atime --date='yesterday' file`.",
    hint: "Not available on all systems; `-a` and `-m` are more portable.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Is there a way to set timestamps with nanosecond precision using `touch`?",
    shortAnswer: "No, standard `touch` only provides second precision. Use `utimensat()` or `touch -d` with fractional seconds (ignored).",
    explanation: "GNU `touch` accepts `-d` with nanoseconds in the string (e.g., '2024-01-01 12:00:00.123456789') but the kernel may truncate to microseconds or nanoseconds depending on filesystem.",
    hint: "`stat` may show nanoseconds but they may be ignored or truncated.",
    level: "expert",
    codeExample: null
  }
];

export default questions;
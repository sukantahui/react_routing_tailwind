const questions = [
  {
    question: "What does the `who` command do?",
    shortAnswer: "Displays a list of users currently logged into the system.",
    explanation: "`who` reads the utmp file (/var/run/utmp) and shows each user's name, terminal, login time, and optional remote host.",
    hint: "Try `who` on any Linux system to see who else is logged in.",
    level: "basic",
    codeExample: "who"
  },
  {
    question: "What is the difference between `who` and `w`?",
    shortAnswer: "`w` shows additional information like system load average, idle time, and current command of each user.",
    explanation: "`w` is more verbose and shows what each user is doing; `who` is a simpler listing.",
    hint: "Run both and compare outputs.",
    level: "basic",
    codeExample: "w\nwho"
  },
  {
    question: "How can you display only the usernames of logged-in users?",
    shortAnswer: "`who | awk '{print $1}'` or `users` command.",
    explanation: "`users` prints space-separated usernames; `who` can be piped to `cut` or `awk` to extract the first column.",
    hint: "`who -q` also shows usernames and a count.",
    level: "intermediate",
    codeExample: "who | cut -d' ' -f1 | sort -u"
  },
  {
    question: "What does `who -b` display?",
    shortAnswer: "The last system boot time.",
    explanation: "`-b` tells when the system was last booted (from utmp's boot record).",
    hint: "Useful to know uptime without calculating.",
    level: "basic",
    codeExample: "who -b"
  },
  {
    question: "How can you see the idle time of logged-in users?",
    shortAnswer: "`who -u` shows idle time (in minutes) in the third column.",
    explanation: "A dot (.) means less than 1 minute idle; a colon (:) means idle time > 24h; otherwise a number (e.g., 02:30) indicates hours:minutes idle.",
    hint: "Idle time is since last keystroke on that terminal.",
    level: "intermediate",
    codeExample: "who -u"
  },
  {
    question: "What does `who am i` display?",
    shortAnswer: "The user associated with the current standard input (the user who ran the command).",
    explanation: "It shows the login name, terminal, and login time of the user who invoked `who am i`, even within `sudo` or `su`.",
    hint: "Contrast with `whoami` which prints only the effective username.",
    level: "advanced",
    codeExample: "who am i\nwhoami"
  },
  {
    question: "Where does `who` read its information from?",
    shortAnswer: "Typically from `/var/run/utmp` (or `/var/log/wtmp` for historical).",
    explanation: "`/var/run/utmp` contains information about current logins. `/var/log/wtmp` stores historical login/logout records.",
    hint: "Use `utmpdump` to view raw binary data.",
    level: "advanced",
    codeExample: "file /var/run/utmp"
  },
  {
    question: "How do you count the number of logged-in users?",
    shortAnswer: "`who | wc -l` or `who -q | grep -v '^#' | tail -1`",
    explanation: "`who -q` outputs usernames then a line like `# users=5`; you can parse that.",
    hint: "`who -q` is simplest: it prints count at the end.",
    level: "basic",
    codeExample: "who -q"
  },
  {
    question: "What is the purpose of `who -r`?",
    shortAnswer: "Displays the current system runlevel.",
    explanation: "On Linux, runlevels 0-6; `who -r` shows current runlevel and the time it was entered.",
    hint: "Runlevel 5 is graphical multi-user; 3 is text multi-user.",
    level: "intermediate",
    codeExample: "who -r"
  },
  {
    question: "How can you see which users are logged in from remote hosts?",
    shortAnswer: "`who | grep -E '\\([0-9]+\\.'` or `who -u` and look for IP addresses in parentheses.",
    explanation: "Local login terminals (tty) show `(:0)` or `(console)`; remote logins (pts) show an IP address.",
    hint: "Use `who --lookup` to resolve IPs to hostnames (if configured).",
    level: "intermediate",
    codeExample: "who | grep -v '(:0)' | grep -v 'tty[0-9]'"
  },
  {
    question: "What is the difference between `who`, `users`, and `last`?",
    shortAnswer: "`who` shows current logins; `users` shows only usernames; `last` shows historical logins from wtmp.",
    explanation: "`last` reads `/var/log/wtmp` and lists login sessions including reboot and shutdown.",
    hint: "`last | head` gives recent logins.",
    level: "basic",
    codeExample: "last -5"
  },
  {
    question: "Can `who` show the PID of the login shell?",
    shortAnswer: "Yes, with `who -u` it shows the process ID (PID) of the login process.",
    explanation: "The PID column can be used to signal or monitor the user's shell.",
    hint: "`ps -p PID` to see more details.",
    level: "intermediate",
    codeExample: "who -u"
  },
  {
    question: "What does a plus (+) or minus (-) in the `-T` option output mean?",
    shortAnswer: "+ means the terminal is writable (messages allowed), - means write permission disabled (e.g., `mesg n`).",
    explanation: "The `-T` option adds a column showing terminal writability status.",
    hint: "Use `mesg` command to change your own terminal's writability.",
    level: "advanced",
    codeExample: "who -T"
  },
  {
    question: "How can you see only users who have been idle for more than 30 minutes?",
    shortAnswer: "Parse `who -u` idle times using awk: `who -u | awk '$5 ~ /[0-9]+:[0-9]+/ {split($5, t, \":\"); if(t[1]>=30 || (t[1]==0 && t[2]>=30)) print}'`.",
    explanation: "Idle times are in hours:minutes format. You need to convert or compare.",
    hint: "Idle time '01:15' means 1 hour 15 minutes.",
    level: "expert",
    codeExample: "who -u | awk '$5 ~ /:/ {if($5+0>0.5) print $1, $5}'   # approximate"
  },
  {
    question: "Why does `who` sometimes show the same user multiple times?",
    shortAnswer: "Because the user has multiple active sessions (e.g., several terminal windows or SSH connections).",
    explanation: "Each login session gets its own entry in utmp, even for the same username.",
    hint: "Use `who | grep username` to see all sessions.",
    level: "basic",
    codeExample: "who | grep tuhina"
  },
  {
    question: "What does `who -d` display?",
    shortAnswer: "Shows dead (zombie) processes that previously had a login.",
    explanation: "When a process terminates but utmp entry wasn't cleaned, it shows as dead.",
    hint: "Rarely used; more of a debugging option.",
    level: "expert",
    codeExample: "who -d"
  },
  {
    question: "How can you monitor logins in real-time?",
    shortAnswer: "Use `watch who` or `tail -f /var/log/auth.log` with login entries.",
    explanation: "`watch` runs `who` every 2 seconds; also `last -f /var/log/wtmp -F` can be tailed.",
    hint: "`pkill -HUP` on syslogd for immediate updates? Better: `journalctl -f`.",  
    level: "advanced",
    codeExample: "watch -n 1 who"
  },
  {
    question: "What is the difference between `pts` and `tty` in the terminal column?",
    shortAnswer: "`tty` (e.g., tty2) is a physical terminal (console); `pts` (pseudo-terminal slave) is used for SSH, terminal emulators, `screen`, `tmux`.",
    explanation: "PTS stands for pseudo-terminal slave; these are virtual terminals created by terminal multiplexers.",
    hint: "Most remote logins appear on `pts/*`.",
    level: "intermediate",
    codeExample: "who | awk '{print $2}'| sort | uniq -c"
  },
  {
    question: "How do you display the original user who logged in after using `su`?",
    shortAnswer: "`who am i` still shows the original user; `who` shows the `su` target user.",
    explanation: "The `su` command changes effective user but utmp retains the original login user.",
    hint: "`who am i` is the only reliable way to get the real logged-in user.",
    level: "expert",
    codeExample: "su - otheruser\nwho am i\nwho"
  },
  {
    question: "Can `who` read a different utmp file?",
    shortAnswer: "Yes, provide the file as argument: `who /var/log/wtmp` for historical logins.",
    explanation: "Any file in utmp format can be given; `who` will parse it.",
    hint: "`utmpdump /var/log/wtmp` also works.",
    level: "advanced",
    codeExample: "who /var/log/wtmp | head -10"
  },
  {
    question: "What is the significance of the `:0` in the comment field for some users?",
    shortAnswer: "It indicates a local X11 display (usually the console's graphical session).",
    explanation: "User logged in via graphical display manager (GDM, LightDM) will show `:0` or `:0.0`.",
    hint: "Those users are often not interactive on a text terminal.",
    level: "intermediate",
    codeExample: "who | grep ':0'"
  },
  {
    question: "How can you send a message to another logged-in user using `write`?",
    shortAnswer: "`write username ttyname` then type message; end with Ctrl+D.",
    explanation: "You need the terminal name from `who` and write permission on that terminal (+ in `who -T`).",
    hint: "`who -T` shows `+` for writable terminals.",
    level: "advanced",
    codeExample: "who -T\nwrite tuhina pts/1\nHello, how are you?\nCtrl+D"
  },
  {
    question: "What does `who --ips` do?",
    shortAnswer: "Displays IP addresses of remote users (GNU `who` extension).",
    explanation: "Shows remote hostnames or IPs directly instead of masking.",
    hint: "Not available on BSD/macOS.",
    level: "expert",
    codeExample: "who --ips"
  },
  {
    question: "Why might `who` slow down on a busy server?",
    shortAnswer: "Because it reads the entire utmp file; on systems with thousands of past entries, utmp can be large.",
    explanation: "Modern systems use `systemd-logind` which may implement `who` differently; still, large wtmp can cause slowdown.",
    hint: "Use `who -q` for a quick count, or `w` for less overhead.",
    level: "expert",
    codeExample: "time who\nls -lh /var/run/utmp"
  },
  {
    question: "How do you show the time since last system boot in a human-readable format?",
    shortAnswer: "`who -b | awk '{print $3,$4}'` gives boot time; then use `date` to compute difference.",
    explanation: "Combine with `date` and epoch seconds to get uptime.",
    hint: "`uptime -s` gives boot time on Linux.",
    level: "advanced",
    codeExample: "boot=$(who -b | awk '{print $3,$4}'); date -d \"$boot\" +%s"
  },
  {
    question: "What is the difference between `who -a` and plain `who`?",
    shortAnswer: "`-a` is equivalent to `-b -d -l -p -r -t -T -u` (all options).",
    explanation: "It shows boot time, dead processes, login, runlevel, and more.",
    hint: "`who -a` produces very verbose output.",
    level: "advanced",
    codeExample: "who -a | head -10"
  },
  {
    question: "How do you get the login time of a specific user in seconds since epoch?",
    shortAnswer: "Parse `who` output for that user, then use `date` to convert.",
    explanation: "Example: `who | grep username | awk '{print $3,$4}' | xargs -I{} date -d '{}' +%s`",
    hint: "Assumes GNU date and standard format.",
    level: "expert",
    codeExample: "who | grep swadeep | awk '{print $3,$4}' | while read dt; do date -d \"$dt\" +%s; done"
  },
  {
    question: "What is the purpose of `who -p`?",
    shortAnswer: "Show active processes spawned by `init` (or systemd).",
    explanation: "Lists processes that are kept alive by system init (like getty).",
    hint: "Not commonly used; output may be empty.",
    level: "expert",
    codeExample: "who -p"
  },
  {
    question: "Can `who` be used to detect if someone is using `screen` or `tmux`?",
    shortAnswer: "Indirectly: if a user has multiple `pts` sessions with the same username, they might be using multiplexers.",
    explanation: "`screen` and `tmux` create pseudo-terminals. `who` will show each window/session as a separate login.",
    hint: "Use `w` to see command column (e.g., `tmux`).",
    level: "expert",
    codeExample: "who | grep -v 'tty' | awk '{print $1}' | sort | uniq -c | sort -nr"
  },
  {
    question: "How would you produce a CSV file of currently logged-in users with username, terminal, and login time?",
    shortAnswer: "`who | awk '{print $1 \",\" $2 \",\" $3 \" \" $4}'`",
    explanation: "This creates a simple CSV. For more robust handling, use proper CSV quoting.",
    hint: "Pipe to `> users.csv` and open in spreadsheet.",
    level: "intermediate",
    codeExample: "who | awk -v OFS=',' '{print $1, $2, $3 \" \" $4}'"
  }
];

export default questions;
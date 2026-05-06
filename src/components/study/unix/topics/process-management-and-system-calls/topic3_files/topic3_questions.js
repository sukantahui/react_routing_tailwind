// topic3_questions.js
const questions = [
  {
    question: "What is the first process that displays the 'login:' prompt on a text console?",
    shortAnswer: "getty (or agetty, mingetty).",
    explanation: "init spawns getty on each virtual terminal. getty opens the terminal, sets its parameters, and displays the login prompt. After username entry, it execs the login program.",
    hint: "ps -ef | grep getty",
    level: "basic",
    codeExample: "ps -t tty1 -o comm="
  },
  {
    question: "What does the login program do after receiving username and password?",
    shortAnswer: "Verifies credentials, sets environment (HOME, SHELL, PATH, etc.), changes to home directory, and executes the user's shell.",
    explanation: "It uses PAM (or traditional crypt) to check password, then logs the login in wtmp/btmp, runs /etc/motd, and finally execs the shell.",
    hint: "tail -f /var/log/auth.log during login",
    level: "intermediate",
    codeExample: "strings /bin/login | grep -i pam"
  },
  {
    question: "What is the difference between /etc/passwd and /etc/shadow?",
    shortAnswer: "/etc/passwd stores basic user info (publicly readable); /etc/shadow stores encrypted passwords and expiration data (root-readable only).",
    explanation: "Modern Unix systems use shadow passwords to improve security. The password hash is stored in shadow, and /etc/passwd contains 'x' as placeholder.",
    hint: "ls -l /etc/passwd /etc/shadow",
    level: "basic",
    codeExample: "sudo grep swadeep /etc/shadow"
  },
  {
    question: "What is PAM (Pluggable Authentication Modules)?",
    shortAnswer: "A flexible framework for authentication, account management, session setup, and password changing.",
    explanation: "Instead of hardcoding authentication methods, PAM allows system administrators to stack modules (e.g., pam_unix.so, pam_ldap.so).",
    hint: "/etc/pam.d/login controls login behavior",
    level: "intermediate",
    codeExample: "man pam.conf"
  },
  {
    question: "How is a graphical login (display manager) different from console login?",
    shortAnswer: "Display managers (GDM, SDDM, LightDM) handle graphical login, then start the user's desktop environment instead of a shell.",
    explanation: "They still use getty only for virtual consoles. Display managers often authenticate via PAM and manage user sessions.",
    hint: "ps -ef | grep -E 'gdm|sddm|lightdm'",
    level: "intermediate",
    codeExample: "systemctl status display-manager"
  },
  {
    question: "What is the purpose of /etc/securetty?",
    shortAnswer: "Restricts which terminals root can log in from (usually only console ttys).",
    explanation: "Prevents root login from insecure network terminals (e.g., telnet). SSH has its own PermitRootLogin setting.",
    hint: "cat /etc/securetty",
    level: "advanced",
    codeExample: "echo 'pts/0' >> /etc/securetty  # not recommended"
  },
  {
    question: "What files record successful and failed login attempts?",
    shortAnswer: "/var/log/wtmp (successful logins, binary), /var/log/btmp (failed attempts), /var/log/lastlog (last login time per user).",
    explanation: "Use `last`, `lastb`, and `lastlog` commands to read these logs. They are crucial for security auditing.",
    hint: "last | head -10",
    level: "basic",
    codeExample: "lastb | head -10  # failed logins"
  },
  {
    question: "How does the shell know which profile scripts to run at login?",
    shortAnswer: "Login shells execute /etc/profile, then ~/.profile, ~/.bash_profile, or ~/.zprofile depending on shell.",
    explanation: "For bash, a login shell reads /etc/profile and ~/.bash_profile (or ~/.profile if bash_profile missing). Non-login shells read ~/.bashrc.",
    hint: "echo $0  # shows whether shell is login (starts with '-')",
    level: "intermediate",
    codeExample: "bash --login -c 'source ~/.profile'"
  },
  {
    question: "What is the 'nologin' shell (/sbin/nologin)?",
    shortAnswer: "A shell that politely rejects login attempts, printing a message defined in /etc/nologin.txt.",
    explanation: "Used for system accounts that should not have interactive login. Returns non-zero exit code, preventing session.",
    hint: "chsh -s /sbin/nologin username",
    level: "intermediate",
    codeExample: "echo 'No shell access' > /etc/nologin.txt"
  },
  {
    question: "How can you customize the login banner?",
    shortAnswer: "Edit /etc/issue (local terminal) or /etc/issue.net (network). Also /etc/motd for post-login message.",
    explanation: "issue displayed before login prompt; motd after authentication.",
    hint: "man issue",
    level: "basic",
    codeExample: "cat /etc/issue"
  },
  {
    question: "What happens if /etc/nologin exists?",
    shortAnswer: "Non-root users cannot log in; they see the contents of /etc/nologin and the session is denied.",
    explanation: "Used during system maintenance. root can still log in.",
    hint: "sudo touch /etc/nologin; echo 'System under maintenance' | sudo tee /etc/nologin",
    level: "intermediate",
    codeExample: "ls -l /etc/nologin"
  },
  {
    question: "What is the difference between 'su' and 'su -'?",
    shortAnswer: "'su' switches user but keeps current environment; 'su -' (or 'su -l') simulates a full login, clearing environment and running profile scripts.",
    explanation: "'su -' changes to target user's home directory and sources .profile, giving a clean login environment.",
    hint: "su - swadeep  # gives Swadeep's login shell",
    level: "basic",
    codeExample: "su -l swadeep -c 'pwd'"
  },
  {
    question: "How does SSH login differ from console login?",
    shortAnswer: "SSH uses sshd (instead of getty+login) with its own authentication (password, key, GSSAPI) and creates a pseudo-terminal.",
    explanation: "The SSH protocol encrypts the session. The final shell is still spawned, but the parent is sshd, not login.",
    hint: "pstree -p | grep sshd",
    level: "intermediate",
    codeExample: "ps -ef --forest | grep sshd"
  },
  {
    question: "What is the role of 'pam_tally2'?",
    shortAnswer: "A PAM module that counts failed login attempts and can lock accounts after too many failures.",
    explanation: "Often used to prevent brute‑force attacks. Can reset counters after successful login or manually.",
    hint: "pam_tally2 --user swadeep",
    level: "expert",
    codeExample: "pam_tally2 --reset -u swadeep"
  },
  {
    question: "What does 'getty' do if the terminal is a serial line?",
    shortAnswer: "It sets baud rate, parity, and other serial parameters, then displays login prompt.",
    explanation: "Serial getty (e.g., agetty -L ttyS0 115200) configures the line before spawning login.",
    hint: "systemctl getty@ttyS0.service",
    level: "advanced",
    codeExample: "stty -F /dev/ttyS0"
  },
  {
    question: "Why does `/etc/passwd` contain a field for 'shell'?",
    shortAnswer: "It defines the program that login/sshd execs after successful authentication, usually a shell.",
    explanation: "This can be set to any executable. If set to /bin/false or /sbin/nologin, login is blocked.",
    hint: "grep '^daemon' /etc/passwd",
    level: "basic",
    codeExample: "chsh -s /usr/bin/tcsh tuhina"
  },
  {
    question: "How can you force a user to change password at next login?",
    shortAnswer: "Use `passwd -e username` or set password aging in /etc/shadow.",
    explanation: "The shadow entry's last change date is set to 0, causing the system to prompt for new password.",
    hint: "sudo chage -d 0 username",
    level: "intermediate",
    codeExample: "chage -l username"
  },
  {
    question: "What is 'ulimit' and how is it set during login?",
    shortAnswer: "User limits on resources (file size, processes, etc.) – can be set in /etc/security/limits.conf via PAM.",
    explanation: "PAM module pam_limits.so sets these at session start. Soft limits can be raised, hard limits are ceilings.",
    hint: "ulimit -a",
    level: "intermediate",
    codeExample: "grep '^swadeep' /etc/security/limits.conf"
  },
  {
    question: "What happens if a user's home directory is not accessible?",
    shortAnswer: "Login may still succeed, but the home directory will be set to / (or the directory may be missing), causing errors for the shell.",
    explanation: "Login checks home directory existence; if missing, some systems set HOME=/ and give warning. Many services will fail.",
    hint: "mkdir /home/swadeep; chown swadeep:swadeep /home/swadeep",
    level: "intermediate",
    codeExample: "eval cd ~swadeep || echo 'Home not accessible'"
  },
  {
    question: "How can you audit login failures with journald?",
    shortAnswer: "Use `journalctl -u systemd-logind` or `journalctl -u sshd` to see authentication failures.",
    explanation: "Systemd logs all logind events. Failed passwords appear as 'Authentication failure'.",
    hint: "journalctl -f -u sshd",
    level: "advanced",
    codeExample: "sudo journalctl SYSLOG_IDENTIFIER=sshd | grep 'Failed password'"
  },
  {
    question: "What does 'lastlog' command show?",
    shortAnswer: "The last login time and terminal for each user, based on /var/log/lastlog (binary).",
    explanation: "Useful for detecting unusual login times. Updates when user logs in via most methods (including SSH).",
    hint: "lastlog -u swadeep",
    level: "basic",
    codeExample: "lastlog -b 30  # users not logged in last 30 days"
  },
  {
    question: "What is the purpose of 'motd' and dynamic motd?",
    shortAnswer: "Message Of The Day displayed after login. Dynamic motd uses scripts in /etc/update-motd.d/ (Ubuntu).",
    explanation: "Static /etc/motd or generated by PAM's pam_motd.so. Can show system status, security warnings.",
    hint: "cat /etc/motd",
    level: "intermediate",
    codeExample: "run-parts /etc/update-motd.d/"
  },
  {
    question: "What is the difference between 'login' and 'su' in terms of session initialization?",
    shortAnswer: "login creates a new session, resets environment, starts from scratch; 'su' runs a new shell within existing session.",
    explanation: "login is used at terminal start; su is used by already authenticated users to switch IDs.",
    hint: "who am i vs whoami",
    level: "intermediate",
    codeExample: "su - swadeep -c 'env | grep LOGNAME'"
  },
  {
    question: "What are the security risks of leaving a 'getty' on a serial console?",
    shortAnswer: "Physical access to the console and serial cable could allow unauthorized login if no authentication policy (e.g., locked port).",
    explanation: "Mitigation: disable serial getty, use secure access, or require authentication via PAM.",
    hint: "systemctl disable serial-getty@ttyS0.service",
    level: "expert",
    codeExample: "sudo systemctl mask serial-getty@ttyS0.service"
  },
  {
    question: "What is the role of /etc/default/autologin?",
    shortAnswer: "Used by some getty implementations (like mingetty) to automatically log in a specific user.",
    explanation: "Mostly for embedded systems. Not secure for multi-user environments.",
    hint: "grep AUTOLOGIN /etc/default/getty",
    level: "expert",
    codeExample: "echo 'AUTOLOGIN=swadeep' >> /etc/default/getty"
  },
  {
    question: "How does PAM handle 'nullok' option?",
    shortAnswer: "Allows empty passwords for authentication (very insecure, rarely used).",
    explanation: "In pam_unix.so or pam_unix2.so, nullok permits login with blank password. Use only for special guests.",
    hint: "grep nullok /etc/pam.d/common-auth",
    level: "expert",
    codeExample: "passwd -d guest  # then test login"
  },
  {
    question: "What is the 'utmp' database and its purpose?",
    shortAnswer: "utmp (/var/run/utmp) keeps information about currently logged-in users; used by `who`, `w`, `users`.",
    explanation: "Updated by login, sshd, and other session starters. Different from wtmp (historical).",
    hint: "who -a",
    level: "intermediate",
    codeExample: "cat /var/run/utmp | strings | head"
  },
  {
    question: "Why might a user's shell be set to a non‑standard path?",
    shortAnswer: "To restrict access, start a specific application, or use a restricted shell (rbash, scponly).",
    explanation: "A user with '/usr/bin/rbash' cannot use cd or set PATH, enforcing a limited environment.",
    hint: "chsh -s /usr/bin/rbash restricteduser",
    level: "intermediate",
    codeExample: "grep rbash /etc/shells"
  },
  {
    question: "What is the 'faillog' command used for?",
    shortAnswer: "Displays and manipulates failed login counts from /var/log/faillog.",
    explanation: "Can set lockout thresholds. Older than pam_tally2; still present on many systems.",
    hint: "faillog -u swadeep",
    level: "advanced",
    codeExample: "faillog -u swadeep -m 3 -l 5  # lock after 3 failures for 5 days"
  },
  {
    question: "How does systemd-logind integrate with the login process?",
    shortAnswer: "It manages user sessions, handles seat assignments, ACLs on devices, and tracks graphical/VT switches.",
    explanation: "For console logins, getty is still used but systemd-logind manages the session and idles.",
    hint: "loginctl list-sessions",
    level: "expert",
    codeExample: "loginctl show-user $USER"
  }
];

export default questions;
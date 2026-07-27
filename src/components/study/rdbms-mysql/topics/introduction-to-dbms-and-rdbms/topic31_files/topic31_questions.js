/**
 * Topic 31: Installing XAMPP / WAMP – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is XAMPP?",
    shortAnswer:
      "XAMPP is a free, cross-platform all-in-one web development environment that includes Apache, MySQL, PHP, and Perl.",
    explanation:
      "XAMPP stands for: X (any OS), Apache, MySQL, PHP, Perl. It's developed by Apache Friends and is available for Windows, macOS, and Linux.",
    hint: "Think about the cross-platform all-in-one stack.",
    level: "basic",
  },
  {
    question: "What is WAMP?",
    shortAnswer:
      "WAMP is a Windows-only all-in-one web development environment that includes Apache, MySQL, and PHP.",
    explanation:
      "WAMP stands for: Windows, Apache, MySQL, PHP. It's developed by Romain Bourdon and is only available for Windows.",
    hint: "Think about the Windows-only stack.",
    level: "basic",
  },
  {
    question: "What is the difference between XAMPP and WAMP?",
    shortAnswer:
      "XAMPP is cross-platform (Windows, macOS, Linux) and includes Perl; WAMP is Windows-only and includes only Apache, MySQL, and PHP.",
    explanation:
      "XAMPP also includes additional tools like phpMyAdmin, FileZilla FTP server, and Mercury mail server. WAMP is simpler and Windows-integrated.",
    hint: "Think about platform support and included components.",
    level: "basic",
  },
  {
    question: "What does the acronym XAMPP stand for?",
    shortAnswer:
      "XAMPP stands for: X (any operating system), Apache, MySQL, PHP, Perl.",
    explanation:
      "The 'X' means it works on any operating system (Windows, macOS, Linux, etc.). The other letters represent the components included.",
    hint: "Think about the components of XAMPP.",
    level: "basic",
  },
  {
    question: "What does the acronym WAMP stand for?",
    shortAnswer:
      "WAMP stands for: Windows, Apache, MySQL, PHP.",
    explanation:
      "It's a simple acronym that describes the Windows-based stack. It's often used by Windows developers.",
    hint: "Think about the components of WAMP.",
    level: "basic",
  },
  {
    question: "Which is better: XAMPP or WAMP?",
    shortAnswer:
      "There is no 'better' — XAMPP is better for cross-platform development, while WAMP is better for Windows-only development.",
    explanation:
      "If you work on multiple operating systems, XAMPP is the way to go. If you only work on Windows and want a simpler setup, WAMP is fine.",
    hint: "Think about your operating system needs.",
    level: "basic",
  },
  {
    question: "How do I download XAMPP?",
    shortAnswer:
      "Download XAMPP from the official Apache Friends website: apachefriends.org.",
    explanation:
      "Choose the installer for your operating system: .exe for Windows, .dmg for macOS, or .run for Linux.",
    hint: "Think about the official source for XAMPP.",
    level: "basic",
  },
  {
    question: "How do I download WAMP?",
    shortAnswer:
      "Download WAMP from the official WAMP website: wampserver.com.",
    explanation:
      "Download the appropriate version (32-bit or 64-bit) for your Windows system.",
    hint: "Think about the official source for WAMP.",
    level: "basic",
  },
  {
    question: "What is the default installation directory for XAMPP on Windows?",
    shortAnswer:
      "The default installation directory is `C:\\xampp`.",
    explanation:
      "You can change this during installation, but it's recommended to use the default for compatibility.",
    hint: "Think about the default path.",
    level: "basic",
  },
  {
    question: "What is the default installation directory for WAMP?",
    shortAnswer:
      "The default installation directory is `C:\\wamp64` (64-bit) or `C:\\wamp` (32-bit).",
    explanation:
      "64-bit versions install to `wamp64`, while 32-bit versions install to `wamp`.",
    hint: "Think about the default path.",
    level: "basic",
  },
  {
    question: "How do I start Apache in XAMPP?",
    shortAnswer:
      "Open the XAMPP Control Panel and click the 'Start' button next to Apache.",
    explanation:
      "The control panel shows the status of all services. A green indicator means the service is running.",
    hint: "Think about the control panel.",
    level: "basic",
  },
  {
    question: "How do I start MySQL in XAMPP?",
    shortAnswer:
      "Open the XAMPP Control Panel and click the 'Start' button next to MySQL.",
    explanation:
      "Once started, you can access MySQL via command line, phpMyAdmin, or Workbench.",
    hint: "Think about the control panel.",
    level: "basic",
  },
  {
    question: "How do I start Apache in WAMP?",
    shortAnswer:
      "Click the WAMP icon in the system tray and select 'Start All Services' or start Apache individually.",
    explanation:
      "The WAMP icon turns green when all services are running properly.",
    hint: "Think about the system tray icon.",
    level: "basic",
  },
  {
    question: "How do I start MySQL in WAMP?",
    shortAnswer:
      "Click the WAMP icon in the system tray and select 'Start All Services' or start MySQL individually.",
    explanation:
      "The WAMP icon turns green when all services are running properly.",
    hint: "Think about the system tray icon.",
    level: "basic",
  },
  {
    question: "What is phpMyAdmin and why is it included?",
    shortAnswer:
      "phpMyAdmin is a web-based tool for managing MySQL databases, included with both XAMPP and WAMP.",
    explanation:
      "It provides a graphical interface for creating, modifying, and querying databases through your browser.",
    hint: "Think about the web-based database manager.",
    level: "basic",
  },
  {
    question: "How do I access phpMyAdmin?",
    shortAnswer:
      "Open your browser and go to `http://localhost/phpmyadmin/`.",
    explanation:
      "You'll be prompted to log in with MySQL credentials (default: root with no password).",
    hint: "Think about the localhost URL.",
    level: "basic",
  },
  {
    question: "What is the default MySQL username and password in XAMPP/WAMP?",
    shortAnswer:
      "The default username is `root` with no password (empty).",
    explanation:
      "⚠️ This is a security risk. Always set a root password after installation.",
    hint: "Think about the default credentials.",
    level: "basic",
  },
  {
    question: "How do I set a MySQL root password in XAMPP?",
    shortAnswer:
      "Use phpMyAdmin to change the root password or run `mysqladmin -u root password 'new_password'` in the command line.",
    explanation:
      "You can also use MySQL Workbench or the MySQL command line to set the password.",
    hint: "Think about changing the password.",
    level: "intermediate",
  },
  {
    question: "What is the document root in XAMPP?",
    shortAnswer:
      "The document root is `C:\\xampp\\htdocs` on Windows, `/opt/lampp/htdocs` on Linux, or `/Applications/XAMPP/htdocs` on macOS.",
    explanation:
      "This is where you place your web project files. The web server serves files from this directory.",
    hint: "Think about where to put project files.",
    level: "intermediate",
  },
  {
    question: "What is the document root in WAMP?",
    shortAnswer:
      "The document root is `C:\\wamp64\\www` (64-bit) or `C:\\wamp\\www` (32-bit).",
    explanation:
      "Place your web project files here. WAMP serves files from this directory.",
    hint: "Think about where to put project files.",
    level: "intermediate",
  },
  {
    question: "Can I run XAMPP and WAMP on the same machine?",
    shortAnswer:
      "Yes, but not at the same time — they both use port 80 for Apache and port 3306 for MySQL.",
    explanation:
      "You can change the ports in the configuration files if you need to run both simultaneously.",
    hint: "Think about port conflicts.",
    level: "intermediate",
  },
  {
    question: "Why won't Apache start in XAMPP/WAMP?",
    shortAnswer:
      "Common reasons include: port 80 is in use by another service (like IIS or Skype), or a configuration error.",
    explanation:
      "Check the error logs and make sure nothing else is using port 80 or 443.",
    hint: "Think about port conflicts.",
    level: "intermediate",
  },
  {
    question: "How do I change the Apache port in XAMPP?",
    shortAnswer:
      "Edit the file `C:\\xampp\\apache\\conf\\httpd.conf` and change `Listen 80` to `Listen 8080`.",
    explanation:
      "You'll also need to change the port in any virtual host configurations.",
    hint: "Think about the configuration file.",
    level: "expert",
  },
  {
    question: "How do I change the Apache port in WAMP?",
    shortAnswer:
      "Edit the file `C:\\wamp64\\bin\\apache\\apacheX.X.X\\conf\\httpd.conf` and change `Listen 80`.",
    explanation:
      "You'll also need to update the port in the WAMP tray menu settings.",
    hint: "Think about the configuration file.",
    level: "expert",
  },
  {
    question: "Is XAMPP/WAMP safe for production use?",
    shortAnswer:
      "No, XAMPP and WAMP are designed for development, not production. They have default settings that are insecure.",
    explanation:
      "For production, use a properly configured server environment with security hardening.",
    hint: "Think about security implications.",
    level: "basic",
  },
  {
    question: "How do I uninstall XAMPP?",
    shortAnswer:
      "Use the uninstaller in the XAMPP directory or use the Control Panel (Add/Remove Programs) on Windows.",
    explanation:
      "You may need to manually delete the XAMPP folder after uninstalling.",
    hint: "Think about the uninstall process.",
    level: "intermediate",
  },
  {
    question: "How do I uninstall WAMP?",
    shortAnswer:
      "Use the uninstaller from the Start menu or use the Control Panel (Add/Remove Programs) on Windows.",
    explanation:
      "You may need to manually delete the WAMP folder after uninstalling.",
    hint: "Think about the uninstall process.",
    level: "intermediate",
  },
  {
    question: "What is the XAMPP Control Panel used for?",
    shortAnswer:
      "The XAMPP Control Panel is used to start, stop, and manage Apache, MySQL, and other XAMPP services.",
    explanation:
      "It provides a graphical interface for service management, logs, and configuration.",
    hint: "Think about the service manager.",
    level: "basic",
  },
  {
    question: "Can I use MySQL Workbench with XAMPP/WAMP?",
    shortAnswer:
      "Yes, you can connect MySQL Workbench to the MySQL server running in XAMPP/WAMP.",
    explanation:
      "Use hostname `localhost` and port `3306` with the root username and password.",
    hint: "Think about connecting Workbench.",
    level: "intermediate",
  },
  {
    question: "What is the difference between XAMPP and MAMP?",
    shortAnswer:
      "XAMPP is cross-platform and includes Perl; MAMP is primarily for macOS (though a Windows version exists) and focuses on Apache, MySQL, and PHP.",
    explanation:
      "MAMP is popular among macOS developers. Both are similar in purpose and functionality.",
    hint: "Think about macOS vs cross-platform.",
    level: "intermediate",
  },
];

export default questions;
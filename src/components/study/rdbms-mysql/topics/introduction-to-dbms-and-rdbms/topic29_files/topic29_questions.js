/**
 * Topic 29: Installing MySQL Server – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the system requirements for installing MySQL Server on Windows?",
    shortAnswer:
      "Windows 10/11 (64-bit), 2 GB RAM minimum, ~500 MB disk space, and administrator privileges.",
    explanation:
      "MySQL also runs on Windows Server. A 64-bit system is recommended for better performance.",
    hint: "Think about the minimum hardware and OS requirements.",
    level: "basic",
  },
  {
    question: "How do I download MySQL Server?",
    shortAnswer:
      "Download MySQL Server from the official MySQL website (dev.mysql.com/downloads/mysql/).",
    explanation:
      "Choose the appropriate installer for your operating system: MSI for Windows, DMG for macOS, or APT/YUM for Linux.",
    hint: "Think about the official source for MySQL downloads.",
    level: "basic",
  },
  {
    question: "What is the difference between the MSI and ZIP installers for Windows?",
    shortAnswer:
      "MSI is a graphical installer that guides you through the installation; ZIP is a manual installation that requires extracting and configuring files.",
    explanation:
      "MSI is recommended for beginners. ZIP is for advanced users who want more control.",
    hint: "Think about graphical vs. manual installation.",
    level: "intermediate",
  },
  {
    question: "What is the default MySQL port number?",
    shortAnswer:
      "The default port for MySQL is 3306.",
    explanation:
      "MySQL listens on port 3306 by default. You can change this during installation or in the configuration file.",
    hint: "Think about the standard MySQL port.",
    level: "basic",
  },
  {
    question: "How do I set the root password during MySQL installation?",
    shortAnswer:
      "During the installation process, you will be prompted to set a root password. In some cases, a temporary password is generated and you must change it.",
    explanation:
      "On Linux, if a temporary password is generated, it's typically in `/var/log/mysqld.log`. On Windows, the installer will prompt you to set the password.",
    hint: "Think about when you're prompted for a password.",
    level: "basic",
  },
  {
    question: "What is `mysql_secure_installation` and why should I run it?",
    shortAnswer:
      "`mysql_secure_installation` is a script that secures your MySQL installation by removing anonymous users, disabling remote root login, and removing test databases.",
    explanation:
      "It's a critical security step that should be run immediately after installation.",
    hint: "Think about securing your database.",
    level: "intermediate",
  },
  {
    question: "How do I install MySQL on Ubuntu/Debian?",
    shortAnswer:
      "Use `sudo apt update && sudo apt install mysql-server`, then run `sudo mysql_secure_installation`.",
    explanation:
      "The APT package manager handles the installation. After installation, you need to secure the server.",
    hint: "Think about the apt command.",
    level: "basic",
  },
  {
    question: "How do I install MySQL on RHEL/CentOS/Fedora?",
    shortAnswer:
      "Enable the MySQL repository and install using `sudo yum install mysql-community-server`, then start with `sudo systemctl start mysqld`.",
    explanation:
      "You may need to get the temporary root password from `/var/log/mysqld.log`.",
    hint: "Think about the yum command.",
    level: "intermediate",
  },
  {
    question: "How do I install MySQL on macOS using Homebrew?",
    shortAnswer:
      "Use `brew install mysql`, then start the service with `brew services start mysql`.",
    explanation:
      "Homebrew simplifies installation and management on macOS.",
    hint: "Think about the brew command.",
    level: "intermediate",
  },
  {
    question: "How do I start the MySQL service on Windows?",
    shortAnswer:
      "Go to Services (services.msc), find MySQL, and click 'Start', or use `net start MySQL` in Command Prompt.",
    explanation:
      "MySQL is usually installed as a Windows service and can be started/stopped from the Services panel.",
    hint: "Think about Windows services.",
    level: "basic",
  },
  {
    question: "How do I start the MySQL service on Linux?",
    shortAnswer:
      "Use `sudo systemctl start mysql` (or `sudo service mysql start` for older systems).",
    explanation:
      "Systemd is the standard service manager on modern Linux distributions.",
    hint: "Think about the systemctl command.",
    level: "basic",
  },
  {
    question: "How do I check if MySQL is running?",
    shortAnswer:
      "Use `sudo systemctl status mysql` or `sudo service mysql status` on Linux, or check the Services panel on Windows.",
    explanation:
      "The status command shows whether the service is active (running) or inactive (stopped).",
    hint: "Think about checking service status.",
    level: "basic",
  },
  {
    question: "How do I connect to MySQL from the command line?",
    shortAnswer:
      "Use `mysql -u root -p` and enter your root password.",
    explanation:
      "This connects you to the MySQL shell, where you can execute SQL commands.",
    hint: "Think about the mysql command.",
    level: "basic",
  },
  {
    question: "What should I do if I forget my MySQL root password?",
    shortAnswer:
      "Recover the root password by using the `--skip-grant-tables` option to reset it.",
    explanation:
      "This is a recovery procedure. Stop the MySQL service, restart with `--skip-grant-tables`, update the password, then restart normally.",
    hint: "Think about password recovery procedures.",
    level: "expert",
  },
  {
    question: "How do I uninstall MySQL Server?",
    shortAnswer:
      "On Windows, use the Control Panel (Add/Remove Programs). On Linux, use `sudo apt remove mysql-server` or `sudo yum remove mysql-community-server`.",
    explanation:
      "Uninstallation removes the software but may leave data files. Backup your data before uninstalling.",
    hint: "Think about the uninstall process.",
    level: "intermediate",
  },
  {
    question: "What is the MySQL data directory?",
    shortAnswer:
      "The MySQL data directory is where database files are stored. Default locations: `C:\ProgramData\MySQL\MySQL Server X.X\Data` (Windows), `/usr/local/var/mysql` (macOS), `/var/lib/mysql` (Linux).",
    explanation:
      "This directory contains table data, logs, and other database files.",
    hint: "Think about where MySQL stores its data.",
    level: "intermediate",
  },
  {
    question: "How do I change the root password after installation?",
    shortAnswer:
      "Connect to MySQL and run: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';`",
    explanation:
      "This command updates the root password. Make sure to use a strong password.",
    hint: "Think about the ALTER USER command.",
    level: "intermediate",
  },
  {
    question: "What is the MySQL Installer for Windows?",
    shortAnswer:
      "MySQL Installer is a graphical tool that simplifies the installation, configuration, and management of MySQL products on Windows.",
    explanation:
      "It allows you to install MySQL Server, Workbench, and other tools in one package.",
    hint: "Think about the all-in-one installer.",
    level: "basic",
  },
  {
    question: "What are the different setup types in MySQL Installer?",
    shortAnswer:
      "The setup types are: Developer Default, Server only, Client only, Full, and Custom.",
    explanation:
      "Developer Default is recommended for most users. It installs MySQL Server and common development tools.",
    hint: "Think about the installation options.",
    level: "intermediate",
  },
  {
    question: "How do I configure MySQL Server after installation?",
    shortAnswer:
      "You can configure MySQL by editing the `my.cnf` (Linux) or `my.ini` (Windows) configuration file.",
    explanation:
      "Configuration options include port, buffer sizes, max connections, and more.",
    hint: "Think about the configuration file.",
    level: "intermediate",
  },
  {
    question: "What is the default MySQL configuration file location?",
    shortAnswer:
      "On Windows: `C:\ProgramData\MySQL\MySQL Server X.X\my.ini`. On Linux: `/etc/mysql/my.cnf`.",
    explanation:
      "The configuration file controls MySQL server settings. Changes require a restart.",
    hint: "Think about where the config file is located.",
    level: "intermediate",
  },
  {
    question: "How do I install a specific version of MySQL on Linux?",
    shortAnswer:
      "On Ubuntu, you can use `sudo apt install mysql-server-8.0` or add a specific repository for the version you want.",
    explanation:
      "The APT repository includes multiple versions. You can select the version you need.",
    hint: "Think about installing a specific version.",
    level: "expert",
  },
  {
    question: "What are the common MySQL installation errors?",
    shortAnswer:
      "Common errors include: access denied, service failed to start, port conflict, and missing dependencies.",
    explanation:
      "Check error logs and ensure prerequisites are met. Most errors are due to permission or dependency issues.",
    hint: "Think about what can go wrong during installation.",
    level: "intermediate",
  },
  {
    question: "How do I resolve a port conflict during installation?",
    shortAnswer:
      "Change the MySQL port in the configuration file (my.cnf/my.ini) or stop the service using that port.",
    explanation:
      "Port 3306 is default. If another service uses it, change it to another port (e.g., 3307).",
    hint: "Think about changing the port number.",
    level: "expert",
  },
  {
    question: "What is the MySQL service name on Windows?",
    shortAnswer:
      "The default service name is `MySQL` or `MySQL80` (for version 8.0).",
    explanation:
      "You can see the service name in the Services panel. It may be `MySQL` followed by the version.",
    hint: "Think about the service name.",
    level: "basic",
  },
  {
    question: "How do I enable MySQL to start automatically on boot?",
    shortAnswer:
      "On Windows, the installer gives you the option. On Linux, use `sudo systemctl enable mysql`.",
    explanation:
      "This creates a systemd service that starts MySQL at boot time.",
    hint: "Think about automatic startup.",
    level: "intermediate",
  },
  {
    question: "What is the difference between MySQL Community and MySQL Enterprise installation?",
    shortAnswer:
      "The installation process is similar, but Enterprise Edition includes additional commercial features and requires a license.",
    explanation:
      "Enterprise Edition has additional packages for Enterprise Backup, Monitor, and other tools.",
    hint: "Think about the differences in installation.",
    level: "intermediate",
  },
  {
    question: "How do I check the MySQL version after installation?",
    shortAnswer:
      "Connect to MySQL and run `SELECT VERSION();` or use `mysql --version` in the command line.",
    explanation:
      "Both commands show the installed MySQL version.",
    hint: "Think about checking the version.",
    level: "basic",
  },
  {
    question: "What is the role of the `mysql` database?",
    shortAnswer:
      "The `mysql` database stores user accounts, privileges, and system metadata.",
    explanation:
      "It's a system database that should not be modified directly unless you know what you're doing.",
    hint: "Think about the system database.",
    level: "intermediate",
  },
  {
    question: "How do I secure my MySQL installation after the initial setup?",
    shortAnswer:
      "Run `mysql_secure_installation`, set a strong root password, remove anonymous users, disable remote root login, and remove test databases.",
    explanation:
      "These steps are essential for securing a production MySQL server.",
    hint: "Think about post-installation security.",
    level: "intermediate",
  },
];

export default questions;
/**
 * Topic 30: Installing MySQL Workbench – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is MySQL Workbench?",
    shortAnswer:
      "MySQL Workbench is the official graphical user interface (GUI) tool for MySQL, providing visual database design, development, and administration.",
    explanation:
      "It includes a SQL editor, ER diagram designer, database migration tools, and performance monitoring. It's available for Windows, macOS, and Linux.",
    hint: "Think about the GUI tool for MySQL.",
    level: "basic",
  },
  {
    question: "Why should I use MySQL Workbench?",
    shortAnswer:
      "Workbench makes it easier to design, develop, and administer MySQL databases through a visual interface, especially for beginners.",
    explanation:
      "It provides syntax highlighting, auto-completion, visual query plans, and tools for data import/export, making database management more productive.",
    hint: "Think about the benefits of a visual tool.",
    level: "basic",
  },
  {
    question: "Is MySQL Workbench free?",
    shortAnswer:
      "Yes, MySQL Workbench is free and open-source, released under the GPL license.",
    explanation:
      "It is available for free download from the official MySQL website. There is no paid version.",
    hint: "Think about the cost.",
    level: "basic",
  },
  {
    question: "What are the system requirements for MySQL Workbench on Windows?",
    shortAnswer:
      "Windows 10/11 (64-bit), 2 GB RAM, ~500 MB disk space, Microsoft .NET Framework, and administrator privileges.",
    explanation:
      "The .NET Framework is required for Workbench to run on Windows. Most modern Windows systems already have it installed.",
    hint: "Think about the Windows requirements.",
    level: "basic",
  },
  {
    question: "What are the system requirements for MySQL Workbench on macOS?",
    shortAnswer:
      "macOS 10.15 (Catalina) or later, 2 GB RAM, ~500 MB disk space, Intel or Apple Silicon CPU.",
    explanation:
      "Workbench is compatible with both Intel and Apple Silicon Macs. The DMG installer works on both architectures.",
    hint: "Think about macOS requirements.",
    level: "basic",
  },
  {
    question: "What are the system requirements for MySQL Workbench on Linux?",
    shortAnswer:
      "Ubuntu 20.04+, Debian 10+, RHEL 8+, CentOS 8+, 2 GB RAM, ~500 MB disk space, and GTK+ libraries.",
    explanation:
      "Linux installations require the GTK+ graphical libraries. The package manager will usually handle dependencies.",
    hint: "Think about Linux requirements.",
    level: "intermediate",
  },
  {
    question: "How do I download MySQL Workbench?",
    shortAnswer:
      "Download MySQL Workbench from the official MySQL website (dev.mysql.com/downloads/workbench/).",
    explanation:
      "Choose the appropriate installer for your operating system: MSI for Windows, DMG for macOS, or DEB/RPM for Linux.",
    hint: "Think about the official source.",
    level: "basic",
  },
  {
    question: "How do I install MySQL Workbench on Windows?",
    shortAnswer:
      "Download the MSI installer, run it as administrator, and follow the installation wizard.",
    explanation:
      "The wizard guides you through the installation. You can choose the installation directory and components.",
    hint: "Think about the MSI installer.",
    level: "basic",
  },
  {
    question: "How do I install MySQL Workbench on macOS?",
    shortAnswer:
      "Download the DMG file, double-click to mount it, and drag the Workbench icon to the Applications folder.",
    explanation:
      "This is a typical macOS installation process. After dragging, you can launch Workbench from Applications.",
    hint: "Think about the DMG file.",
    level: "basic",
  },
  {
    question: "How do I install MySQL Workbench on Ubuntu/Debian?",
    shortAnswer:
      "Download the .deb package and install using `sudo dpkg -i mysql-workbench-community_*.deb`, or use Snap: `sudo snap install mysql-workbench-community`.",
    explanation:
      "The Snap installation is often simpler and manages dependencies automatically.",
    hint: "Think about the dpkg or snap command.",
    level: "intermediate",
  },
  {
    question: "How do I install MySQL Workbench on RHEL/CentOS/Fedora?",
    shortAnswer:
      "Download the .rpm package and install using `sudo yum localinstall mysql-workbench-community-*.rpm`.",
    explanation:
      "For newer versions, you can use the MySQL Yum repository to install Workbench.",
    hint: "Think about the rpm or yum command.",
    level: "intermediate",
  },
  {
    question: "How do I create a connection in MySQL Workbench?",
    shortAnswer:
      "Click the '+' icon next to 'MySQL Connections' on the home screen, fill in the connection details, and test the connection.",
    explanation:
      "You need to provide the hostname, port, username, and password. The connection will be saved for future use.",
    hint: "Think about the plus icon.",
    level: "basic",
  },
  {
    question: "What is the default hostname and port for MySQL connections?",
    shortAnswer:
      "The default hostname is 'localhost' or '127.0.0.1' and the default port is 3306.",
    explanation:
      "If MySQL is running on a different port, you need to specify it in the connection settings.",
    hint: "Think about the standard settings.",
    level: "basic",
  },
  {
    question: "How do I test a connection in MySQL Workbench?",
    shortAnswer:
      "Click the 'Test Connection' button when creating or editing a connection. It will verify that the credentials and network settings are correct.",
    explanation:
      "A success message will appear if the connection works. If it fails, you'll see an error message explaining the issue.",
    hint: "Think about the test button.",
    level: "basic",
  },
  {
    question: "Can MySQL Workbench connect to remote MySQL servers?",
    shortAnswer:
      "Yes, you can connect to remote servers by specifying the hostname/IP address and port in the connection settings.",
    explanation:
      "You may also need to configure the remote server to allow connections from your IP address and enable SSL for security.",
    hint: "Think about remote connections.",
    level: "intermediate",
  },
  {
    question: "What is the SQL Editor in MySQL Workbench?",
    shortAnswer:
      "The SQL Editor is a text editor where you can write, execute, and debug SQL queries with syntax highlighting and auto-completion.",
    explanation:
      "It also allows you to view query results, save queries, and export data.",
    hint: "Think about the query writing area.",
    level: "basic",
  },
  {
    question: "What is the Navigator in MySQL Workbench?",
    shortAnswer:
      "The Navigator is a panel that shows all databases, tables, views, and other objects on the connected server.",
    explanation:
      "You can use it to browse and manage database objects, right-click for quick actions, and drag objects into the SQL Editor.",
    hint: "Think about the object browser.",
    level: "basic",
  },
  {
    question: "Can I design ER diagrams in MySQL Workbench?",
    shortAnswer:
      "Yes, MySQL Workbench includes a visual database design tool where you can create Entity-Relationship (ER) diagrams.",
    explanation:
      "You can create tables, define relationships, and synchronize the design with the actual database.",
    hint: "Think about visual design.",
    level: "intermediate",
  },
  {
    question: "How do I export data using MySQL Workbench?",
    shortAnswer:
      "Use the Data Export tool under the 'Server' or 'Administration' tab to export databases or tables to SQL files.",
    explanation:
      "You can choose to export the structure, data, or both. The export can be saved as a single SQL file or separate files per table.",
    hint: "Think about exporting data.",
    level: "intermediate",
  },
  {
    question: "How do I import data using MySQL Workbench?",
    shortAnswer:
      "Use the Data Import tool under the 'Server' or 'Administration' tab to import SQL files or CSV data.",
    explanation:
      "You can import the entire structure and data from a SQL file or import CSV files into existing tables.",
    hint: "Think about importing data.",
    level: "intermediate",
  },
  {
    question: "What is the Performance Dashboard in MySQL Workbench?",
    shortAnswer:
      "The Performance Dashboard provides real-time monitoring of MySQL server performance, including query stats, I/O, and connection metrics.",
    explanation:
      "It helps identify bottlenecks and performance issues. It's available in the Administration section.",
    hint: "Think about performance monitoring.",
    level: "intermediate",
  },
  {
    question: "Can I use MySQL Workbench to manage user accounts?",
    shortAnswer:
      "Yes, the Administration section includes tools for managing users, privileges, and roles.",
    explanation:
      "You can create, modify, and delete user accounts, and grant or revoke privileges on databases and tables.",
    hint: "Think about user management.",
    level: "intermediate",
  },
  {
    question: "What should I do if I get a connection error in MySQL Workbench?",
    shortAnswer:
      "Check the hostname, port, username, and password. Ensure MySQL Server is running and your firewall allows the connection.",
    explanation:
      "Common errors: 'Access denied' (wrong password), 'Can't connect' (server not running or wrong port), and 'Unknown host' (wrong hostname).",
    hint: "Think about troubleshooting connection errors.",
    level: "intermediate",
  },
  {
    question: "How do I update MySQL Workbench?",
    shortAnswer:
      "Check for updates from the MySQL Workbench menu (Help → Check for Updates) or download the latest version from the official website.",
    explanation:
      "The update process varies by OS. On Windows, you can run the new installer; on macOS, replace the application; on Linux, use the package manager.",
    hint: "Think about the update process.",
    level: "intermediate",
  },
  {
    question: "Is MySQL Workbench available in different languages?",
    shortAnswer:
      "Yes, MySQL Workbench supports multiple languages, including English, Chinese, Japanese, French, and more.",
    explanation:
      "You can change the language in Edit → Preferences → General → Language.",
    hint: "Think about language options.",
    level: "intermediate",
  },
  {
    question: "What are the differences between MySQL Workbench and the command-line client?",
    shortAnswer:
      "Workbench is a GUI tool with visual features, while the command-line client is text-based. Workbench offers design, monitoring, and administration tools beyond just running queries.",
    explanation:
      "Workbench is more user-friendly, especially for beginners. The command-line is lightweight and scriptable.",
    hint: "Think about GUI vs. CLI.",
    level: "intermediate",
  },
  {
    question: "Can I connect to multiple MySQL servers at once in Workbench?",
    shortAnswer:
      "Yes, you can create multiple connections and switch between them. You can also open multiple SQL Editor tabs, each connected to a different server.",
    explanation:
      "This is useful for managing multiple databases or environments (development, testing, production).",
    hint: "Think about multiple connections.",
    level: "intermediate",
  },
  {
    question: "How do I uninstall MySQL Workbench?",
    shortAnswer:
      "On Windows, use the Control Panel (Add/Remove Programs). On macOS, delete the application from Applications. On Linux, use the package manager (e.g., `sudo apt remove mysql-workbench`).",
    explanation:
      "Uninstalling removes the application but may leave user preferences and connection settings. You can delete those manually if needed.",
    hint: "Think about the uninstall process.",
    level: "intermediate",
  },
  {
    question: "What are the keyboard shortcuts for the SQL Editor?",
    shortAnswer:
      "Common shortcuts: Ctrl+Enter (execute current query), Ctrl+Shift+Enter (execute all queries), Ctrl+Space (auto-complete), Ctrl+B (format query), F5 (refresh).",
    explanation:
      "These shortcuts improve productivity. You can see the full list in Edit → Preferences → Keyboard Shortcuts.",
    hint: "Think about productivity shortcuts.",
    level: "expert",
  },
  {
    question: "How do I backup my connection settings in MySQL Workbench?",
    shortAnswer:
      "Export connection settings from Edit → Preferences → Connections, then click 'Export' to save a JSON file.",
    explanation:
      "You can import the file on another machine to restore your connections. This is useful for team sharing or backups.",
    hint: "Think about exporting connections.",
    level: "expert",
  },
  {
    question: "What is the Visual Explain feature in MySQL Workbench?",
    shortAnswer:
      "Visual Explain shows the query execution plan graphically, helping you understand and optimise query performance.",
    explanation:
      "It displays operations like table scans, index usage, and join types in a visual format. You can access it by clicking the 'Explain' button in the SQL Editor.",
    hint: "Think about visual query analysis.",
    level: "expert",
  },
];

export default questions;
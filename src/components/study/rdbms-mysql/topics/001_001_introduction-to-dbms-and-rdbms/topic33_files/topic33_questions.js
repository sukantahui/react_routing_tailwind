/**
 * Topic 33: Connecting to MySQL Server – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is the most common way to connect to MySQL from the command line?",
    shortAnswer:
      "The most common way is using the `mysql` command: `mysql -u root -p`",
    explanation:
      "This prompts for the password and opens the MySQL shell. You can also specify host, port, and database.",
    hint: "Think about the mysql command.",
    level: "basic",
  },
  {
    question: "What is the default port for MySQL connections?",
    shortAnswer:
      "The default port for MySQL is 3306.",
    explanation:
      "This port is used by the MySQL server to listen for client connections. You can change it in the configuration.",
    hint: "Think about the default MySQL port.",
    level: "basic",
  },
  {
    question: "How do I connect to a remote MySQL server from the command line?",
    shortAnswer:
      "Use the `-h` option: `mysql -u username -p -h remote_host`",
    explanation:
      "Replace `remote_host` with the IP address or domain name of the server.",
    hint: "Think about the -h option.",
    level: "basic",
  },
  {
    question: "What is the difference between `localhost` and `127.0.0.1` when connecting?",
    shortAnswer:
      "`localhost` typically uses a Unix socket (Linux/macOS) or a named pipe (Windows), while `127.0.0.1` forces a TCP/IP connection.",
    explanation:
      "Using `localhost` is faster but may not work if the socket is misconfigured. `127.0.0.1` is more reliable for TCP-based connections.",
    hint: "Think about socket vs. TCP.",
    level: "intermediate",
  },
  {
    question: "How do I connect to MySQL using MySQL Workbench?",
    shortAnswer:
      "Open MySQL Workbench, click the '+' icon next to 'MySQL Connections', fill in connection details, and test the connection.",
    explanation:
      "You need to provide hostname, port, username, and password. The connection is saved for future use.",
    hint: "Think about the Workbench interface.",
    level: "basic",
  },
  {
    question: "What are the connection parameters in MySQL?",
    shortAnswer:
      "The key parameters are: hostname, port, username, password, and default database.",
    explanation:
      "Optional parameters include SSL options, connection timeout, and character set.",
    hint: "Think about the information needed to connect.",
    level: "basic",
  },
  {
    question: "How do I check if MySQL is running before connecting?",
    shortAnswer:
      "On Linux: `sudo systemctl status mysql`. On Windows: check Services or use `net start MySQL`.",
    explanation:
      "If the service is not running, you'll get a connection error. Check the status first.",
    hint: "Think about the service status command.",
    level: "basic",
  },
  {
    question: "What does 'Access denied for user' mean?",
    shortAnswer:
      "It means the username or password is incorrect, or the user does not have permission to connect from the current host.",
    explanation:
      "Check your credentials and the user's host privileges (e.g., 'user'@'localhost' vs 'user'@'%').",
    hint: "Think about authentication failure.",
    level: "basic",
  },
  {
    question: "What does 'Can't connect to MySQL server' mean?",
    shortAnswer:
      "It means the client cannot reach the MySQL server — the server may not be running, the hostname or port may be wrong, or a firewall is blocking the connection.",
    explanation:
      "Check if MySQL is running, verify the host and port, and check firewall rules.",
    hint: "Think about network connectivity.",
    level: "intermediate",
  },
  {
    question: "How do I grant remote access to a MySQL user?",
    shortAnswer:
      "Use `GRANT ALL ON *.* TO 'user'@'%' IDENTIFIED BY 'password';` and then `FLUSH PRIVILEGES;`.",
    explanation:
      "The '%' wildcard allows connections from any host. For better security, use a specific IP address.",
    hint: "Think about the GRANT command.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the `mysql` database?",
    shortAnswer:
      "The `mysql` database stores user accounts, privileges, and system metadata.",
    explanation:
      "It's used by MySQL for authentication and authorisation. You shouldn't modify it directly unless you know what you're doing.",
    hint: "Think about the system database.",
    level: "intermediate",
  },
  {
    question: "How do I change the MySQL root password?",
    shortAnswer:
      "Connect to MySQL and run: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';`",
    explanation:
      "You need to be connected as root or have sufficient privileges to change the password.",
    hint: "Think about the ALTER USER command.",
    level: "intermediate",
  },
  {
    question: "What is SSL in MySQL connections and why is it important?",
    shortAnswer:
      "SSL (Secure Sockets Layer) encrypts the connection between the client and MySQL server, protecting data in transit.",
    explanation:
      "Without SSL, data (including passwords) can be intercepted. Always use SSL in production.",
    hint: "Think about encryption.",
    level: "intermediate",
  },
  {
    question: "How do I connect to MySQL with SSL?",
    shortAnswer:
      "Use the `--ssl-mode=REQUIRED` option on the command line, or in your application specify SSL parameters.",
    explanation:
      "You may also need to provide CA certificate, client certificate, and key if using mutual SSL.",
    hint: "Think about the --ssl-mode option.",
    level: "expert",
  },
  {
    question: "What is connection pooling and why is it used?",
    shortAnswer:
      "Connection pooling reuses existing database connections to avoid the overhead of establishing new connections.",
    explanation:
      "It improves performance and reduces resource usage in web applications.",
    hint: "Think about reusing connections.",
    level: "intermediate",
  },
  {
    question: "What is the `SHOW PROCESSLIST` command used for?",
    shortAnswer:
      "It shows all active MySQL connections and their current state.",
    explanation:
      "This is useful for monitoring and troubleshooting — you can see which queries are running and kill problematic ones.",
    hint: "Think about monitoring connections.",
    level: "intermediate",
  },
  {
    question: "How do I kill a MySQL connection?",
    shortAnswer:
      "Use `KILL connection_id;` where `connection_id` is the ID from `SHOW PROCESSLIST`.",
    explanation:
      "This terminates the connection and any running query. Use with caution.",
    hint: "Think about the KILL command.",
    level: "intermediate",
  },
  {
    question: "What is the difference between TCP/IP and socket connections?",
    shortAnswer:
      "TCP/IP connections go over the network; socket connections use local inter-process communication (Unix sockets or named pipes).",
    explanation:
      "Sockets are faster for local connections but only work on the same machine. TCP/IP works over networks.",
    hint: "Think about local vs. network communication.",
    level: "intermediate",
  },
  {
    question: "How do I connect to MySQL using Python?",
    shortAnswer:
      "Use the PyMySQL library: `import pymysql; conn = pymysql.connect(host='localhost', user='root', password='pass', database='mydb')`.",
    explanation:
      "You can also use MySQLdb or mysql-connector-python. Choose the library that fits your project.",
    hint: "Think about Python database drivers.",
    level: "intermediate",
  },
  {
    question: "How do I connect to MySQL using PHP?",
    shortAnswer:
      "Use PDO: `$pdo = new PDO('mysql:host=localhost;dbname=mydb', 'username', 'password');`.",
    explanation:
      "PDO is the recommended approach for PHP as it supports multiple database drivers.",
    hint: "Think about PDO in PHP.",
    level: "intermediate",
  },
  {
    question: "How do I connect to MySQL using Java?",
    shortAnswer:
      "Use JDBC: `Connection conn = DriverManager.getConnection('jdbc:mysql://localhost:3306/mydb', 'username', 'password');`.",
    explanation:
      "You'll need the MySQL Connector/J driver in your classpath.",
    hint: "Think about JDBC.",
    level: "intermediate",
  },
  {
    question: "What is the `--execute` or `-e` option in the mysql command?",
    shortAnswer:
      "It executes a SQL query and exits, without entering interactive mode.",
    explanation:
      "Example: `mysql -u root -p -e 'SHOW DATABASES;'` is useful for scripting.",
    hint: "Think about running a single query.",
    level: "intermediate",
  },
  {
    question: "What is the `max_connections` parameter and how does it affect connections?",
    shortAnswer:
      "It sets the maximum number of simultaneous client connections. If exceeded, new connections are rejected.",
    explanation:
      "Monitor your connections and increase this value if your application requires more concurrent connections.",
    hint: "Think about the connection limit.",
    level: "intermediate",
  },
  {
    question: "How do I set the default database when connecting?",
    shortAnswer:
      "On the command line: `mysql -u root -p -D mydb` or in a connection string: `database=mydb`.",
    explanation:
      "This sets the default schema so you don't need to run `USE mydb;` after connecting.",
    hint: "Think about the -D option.",
    level: "basic",
  },
  {
    question: "What is the `connect_timeout` parameter?",
    shortAnswer:
      "It sets the number of seconds the client will wait for a connection to be established before timing out.",
    explanation:
      "Default is 10 seconds. Increase if you have network latency.",
    hint: "Think about connection timeout.",
    level: "intermediate",
  },
  {
    question: "How do I connect to MySQL using environment variables?",
    shortAnswer:
      "Store credentials in environment variables (e.g., `MYSQL_USER`, `MYSQL_PASSWORD`) and read them in your application.",
    explanation:
      "This keeps credentials out of the code, improving security.",
    hint: "Think about environment variables.",
    level: "expert",
  },
  {
    question: "What is the role of the `mysql_config_editor` tool?",
    shortAnswer:
      "It's a utility that allows you to store authentication credentials securely in a hidden file (`.mylogin.cnf`).",
    explanation:
      "This avoids typing passwords on the command line and keeps them out of shell history.",
    hint: "Think about storing credentials securely.",
    level: "expert",
  },
  {
    question: "How do I connect to MySQL from a Node.js application?",
    shortAnswer:
      "Use the `mysql2` package: `const mysql = require('mysql2'); const conn = mysql.createConnection({host:'localhost', user:'root', password:'pass', database:'mydb'});`.",
    explanation:
      "`mysql2` is the recommended driver for Node.js, supporting both callbacks and promises.",
    hint: "Think about Node.js drivers.",
    level: "intermediate",
  },
  {
    question: "What is the `--skip-ssl` option in the mysql client?",
    shortAnswer:
      "It forces the connection to disable SSL. Useful for testing, but not recommended for production.",
    explanation:
      "Use this only in development environments. In production, always use SSL.",
    hint: "Think about disabling SSL.",
    level: "intermediate",
  },
  {
    question: "What are common reasons for connection timeouts?",
    shortAnswer:
      "Network latency, firewall blocking the port, the MySQL server being overloaded, or the `connect_timeout` being too low.",
    explanation:
      "Check network connectivity and server load. Increase the timeout if necessary.",
    hint: "Think about why connections might hang.",
    level: "intermediate",
  },
  {
    question: "How do I test a MySQL connection from the command line without entering interactive mode?",
    shortAnswer:
      "Use `mysql -u root -p -e 'SELECT 1;'` or `mysqladmin ping` to check if the server is responding.",
    explanation:
      "These commands exit immediately, making them useful for scripting and health checks.",
    hint: "Think about quick health checks.",
    level: "intermediate",
  },
];

export default questions;
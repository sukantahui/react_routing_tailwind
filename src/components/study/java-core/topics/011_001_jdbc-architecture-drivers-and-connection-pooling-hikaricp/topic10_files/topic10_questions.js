const topic10_questions = [
  {
    "question": "Why should HikariCP's maxLifetime parameter always be configured to be shorter than the database server's wait_timeout?",
    "shortAnswer": "To ensure that HikariCP gracefully retires and replaces aging connections from the client side before the database server or network firewall abruptly terminates the idle TCP socket, preventing 'Communications link failure' exceptions.",
    "explanation": "Standard network resilience rule for connection pools.",
    "hint": "Prevents the database server or firewall from severing the socket before HikariCP retires it.",
    "level": "Intermediate",
    "codeExample": "config.setMaxLifetime(1800000); // 30 mins (shorter than MySQL wait_timeout)"
  },
  {
    "question": "What is the recommended HikariCP pool size formula for a server with N CPU cores and SSD storage?",
    "shortAnswer": "connections = (CPU cores * 2) + 1 (or + effective spindle count). For example, on a 4-core server, a pool size of 10 is optimal.",
    "explanation": "Prevents excessive CPU thread context switching on the database engine.",
    "hint": "pool_size = (cores * 2) + spindle_count",
    "level": "Intermediate",
    "codeExample": "4 Cores → Pool size of ~10 connections."
  }
];

export default topic10_questions;

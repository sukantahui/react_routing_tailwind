const topic10_questions = [
  {
    "question": "What design pattern advantages does a dedicated 'AppConfigManager' provide over raw 'Properties' calls in enterprise applications?",
    "shortAnswer": "1. Type-Safety: Provides clean typed getters ('getInt()', 'getBoolean()', 'getDouble()') with automatic parsing and safe fallbacks. 2. Resilience: Catches NumberFormatException internally, preventing application startup crashes on malformed config values. 3. Encapsulation: Hides underlying file/stream I/O mechanisms behind a clean domain API.",
    "explanation": "Standard architecture powering Spring Boot's @ConfigurationProperties.",
    "hint": "Provides type-safe getters with fallback defaults and handles NumberFormatException internally.",
    "level": "Advanced",
    "codeExample": "int port = config.getInt(\"server.port\", 8080); boolean secure = config.getBoolean(\"ssl\", true);"
  }
];

export default topic10_questions;
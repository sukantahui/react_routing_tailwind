const questions = [
  {
    question: "What is the primary difference between the JAVA_HOME and PATH environment variables?",
    shortAnswer: "JAVA_HOME points to the JDK root installation folder; PATH points to executable binary directories (including %JAVA_HOME%\\bin).",
    explanation: "External tools (Maven, Gradle, Tomcat) look for `JAVA_HOME` to locate JDK libraries. The operating system shell uses `PATH` to locate executable commands like `javac` and `java`.",
    hint: "Root directory (JAVA_HOME) vs Executable search paths (PATH).",
    level: "basic",
    codeExample: "// JAVA_HOME: C:\\Program Files\\Java\\jdk-21\n// PATH: %JAVA_HOME%\\bin;..."
  },
  {
    question: "What mistake occurs if you set JAVA_HOME to 'C:\\Program Files\\Java\\jdk-21\\bin'?",
    shortAnswer: "External tools like Maven and Gradle will fail to locate libraries because they append '/bin' or '/lib' to JAVA_HOME.",
    explanation: "Tools construct paths like `$JAVA_HOME/bin/javac` and `$JAVA_HOME/lib/tools.jar`. If JAVA_HOME already contains `\\bin`, paths become `.../bin/bin/javac`, resulting in 'JAVA_HOME is invalid' errors.",
    hint: "Do NOT append \\bin to JAVA_HOME.",
    level: "intermediate",
    codeExample: "// Wrong: JAVA_HOME=C:\\Java\\jdk-21\\bin\n// Correct: JAVA_HOME=C:\\Java\\jdk-21"
  },
  {
    question: "How do you verify in terminal that both the compiler (javac) and runtime (java) are correctly installed and matching?",
    shortAnswer: "Run `javac -version` and `java -version` in a fresh terminal session.",
    explanation: "Both commands should report the exact same major version (e.g. `javac 21.0.2` and `openjdk version \"21.0.2\"`).",
    hint: "Check both javac and java version commands.",
    level: "basic",
    codeExample: "// Terminal:\n// javac -version\n// java -version"
  },
  {
    question: "What causes the terminal error ''javac' is not recognized as an internal or external command'?",
    shortAnswer: "The JDK 'bin' folder is missing from the system's PATH environment variable, or only JRE is installed.",
    explanation: "When you type a command in Windows CMD/PowerShell, the OS searches directories listed in PATH. If `%JAVA_HOME%\\bin` is not present, Windows cannot find `javac.exe`.",
    hint: "PATH variable is missing the JDK bin directory.",
    level: "basic",
    codeExample: "// Fix: Add %JAVA_HOME%\\bin to System Path."
  },
  {
    question: "Why must you restart your terminal after updating system environment variables?",
    shortAnswer: "Existing shell processes cache environment variables at startup and do not detect changes until restarted.",
    explanation: "A running CMD or PowerShell window retains the environment snapshot taken when it was launched. Opening a new terminal loads the updated System Environment Table from the Windows registry.",
    hint: "Shells cache environment tables on launch.",
    level: "basic",
    codeExample: "// Close terminal and open a brand new CMD / PowerShell window."
  },
  {
    question: "What is Eclipse Temurin (Adoptium)?",
    shortAnswer: "The official, community-driven, vendor-neutral, 100% free OpenJDK distribution from the Eclipse Foundation.",
    explanation: "Temurin is widely considered the gold-standard OpenJDK build for enterprise production, tested thoroughly against the Java SE TCK.",
    hint: "Free open-source OpenJDK build from Eclipse Foundation.",
    level: "basic",
    codeExample: "// Download: https://adoptium.net/"
  },
  {
    question: "What is SDKMAN! and how does it simplify Java version management on Linux/macOS/WSL?",
    shortAnswer: "A command-line tool for installing, managing, and switching between multiple JDK versions with a single command.",
    explanation: "SDKMAN! allows running `sdk install java 21.0.2-tem` and `sdk use java 17.0.10-tem` to switch active JDK versions instantly without editing bash config files.",
    hint: "Version manager for Java on Unix systems.",
    level: "intermediate",
    codeExample: "// Command: sdk install java 21-tem\n// Command: sdk default java 21-tem"
  },
  {
    question: "What is the Windows equivalent tool for managing multiple JDK versions effortlessly?",
    shortAnswer: "Chocolatey, Scoop, or Winget package managers, or environment switcher scripts.",
    explanation: "Using `winget install EclipseAdoptium.Temurin.21.JDK` allows downloading and installing verified JDKs from Microsoft's package manager.",
    hint: "Windows package managers like Winget or Scoop.",
    level: "intermediate",
    codeExample: "// Windows Winget: winget install EclipseAdoptium.Temurin.21.JDK"
  },
  {
    question: "How do you set environment variables temporarily in a single terminal session on Windows PowerShell?",
    shortAnswer: "`$env:JAVA_HOME = \"C:\\Java\\jdk-21\"` and `$env:PATH = \"$env:JAVA_HOME\\bin;\" + $env:PATH`.",
    explanation: "PowerShell provides the `$env:` namespace for modifying environment variables for the current session without affecting system registry settings.",
    hint: "PowerShell $env: scope.",
    level: "intermediate",
    codeExample: "$env:JAVA_HOME = 'C:\\Program Files\\Java\\jdk-21'\n$env:PATH = \"$env:JAVA_HOME\\bin;$env:PATH\""
  },
  {
    question: "How do you set environment variables permanently in Linux/macOS terminal?",
    shortAnswer: "Add `export JAVA_HOME=...` and `export PATH=$JAVA_HOME/bin:$PATH` to `~/.bashrc` or `~/.zshrc`.",
    explanation: "The shell profile file (`.bashrc` for Bash, `.zshrc` for Zsh) is executed whenever a new terminal session starts, guaranteeing permanent environment availability.",
    hint: "Edit user profile script (~/.bashrc or ~/.zshrc).",
    level: "basic",
    codeExample: "echo 'export JAVA_HOME=/usr/lib/jvm/jdk-21' >> ~/.bashrc\necho 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc"
  },
  {
    question: "What causes `java.lang.UnsupportedClassVersionError: ... has been compiled by a more recent version`?",
    shortAnswer: "Compiling code with a newer JDK (e.g. Java 21) and trying to run it with an older JRE/JVM (e.g. Java 11 or 8).",
    explanation: "The JVM strictly checks the major version header of the .class file. If the runtime JVM version is lower than the compiler target version, it refuses to load the class.",
    hint: "Compiler version > Runtime JVM version.",
    level: "intermediate",
    codeExample: "// Java 21 compiled class (v65) executed on Java 8 JVM (v52) throws UnsupportedClassVersionError."
  },
  {
    question: "What is the role of `update-alternatives` on Debian/Ubuntu Linux systems for Java?",
    shortAnswer: "It manages symbolic links in `/usr/bin/java` to toggle between multiple installed Java versions.",
    explanation: "`sudo update-alternatives --config java` presents an interactive menu to choose which installed JDK supplies the default system `/usr/bin/java` executable.",
    hint: "Debian alternatives system.",
    level: "advanced",
    codeExample: "// Command: sudo update-alternatives --config java"
  },
  {
    question: "How does Apache Maven determine which Java compiler to use during builds?",
    shortAnswer: "It checks the JAVA_HOME environment variable, or the `<java.version>` / `maven-compiler-plugin` configuration in `pom.xml`.",
    explanation: "Maven invokes the `javac` binary located at `$JAVA_HOME/bin/javac` unless configured to use a specific toolchain.",
    hint: "Maven resolves $JAVA_HOME/bin/javac.",
    level: "intermediate",
    codeExample: "// pom.xml properties:\n// <maven.compiler.release>21</maven.compiler.release>"
  },
  {
    question: "What is Amazon Corretto?",
    shortAnswer: "A no-cost, multiplatform, production-ready distribution of OpenJDK certified and supported by Amazon Web Services.",
    explanation: "Corretto includes Amazon's enterprise performance and security patches and is used internally across all AWS cloud infrastructure.",
    hint: "Amazon's certified OpenJDK distribution.",
    level: "basic",
    codeExample: "// Download: https://aws.amazon.com/corretto/"
  },
  {
    question: "What is Microsoft Build of OpenJDK?",
    shortAnswer: "Microsoft's official OpenJDK binaries for Windows, Linux, and macOS, tailored for Azure and GitHub Actions.",
    explanation: "Microsoft uses this build for its internal Java workloads (LinkedIn, Yammer, Azure services) and distributes it free for public enterprise use.",
    hint: "Microsoft's certified OpenJDK distribution.",
    level: "basic",
    codeExample: "// Default Java runtime on GitHub Actions Windows runners."
  },
  {
    question: "How do you check which exact java executable the terminal is running on Windows vs Linux?",
    shortAnswer: "Windows: `where java`; Linux/macOS: `which java`.",
    explanation: "`where java` prints the absolute file paths of all `java.exe` files found in the order they appear in your PATH variable, helping detect conflicting installations.",
    hint: "'where' on Windows, 'which' on Linux.",
    level: "basic",
    codeExample: "// Windows: where javac\n// Linux: which javac"
  },
  {
    question: "What is the significance of the `nftc` (No-Fee Terms and Conditions) license for Oracle JDK?",
    shortAnswer: "It permits free use of Oracle JDK for development, testing, prototyping, and commercial production (subject to terms).",
    explanation: "Introduced with Java 17, Oracle's NFTC allows free commercial production use for LTS versions until 1 year after the subsequent LTS release.",
    hint: "Oracle's updated free license model for modern LTS releases.",
    level: "advanced",
    codeExample: "// Oracle JDK free under NFTC for Java 17 and 21 LTS."
  },
  {
    question: "What is the difference between an .msi/.exe installer and a .zip/.tar.gz archive when setting up the JDK?",
    shortAnswer: "Installers register system registry keys and may set PATH automatically; archives require manual extraction and manual JAVA_HOME configuration.",
    explanation: "Using portable ZIP archives is preferred by advanced engineers because it permits having 5 different JDKs in a folder without polluting system registries.",
    hint: "Installer vs Portable Archive extraction.",
    level: "intermediate",
    codeExample: "// Portable: Extract to C:\\Java\\jdk-21 and set PATH manually."
  },
  {
    question: "Why should developers avoid installing the JDK in directory paths containing spaces (e.g. `C:\\Program Files\\...`) in some legacy C/C++ build setups?",
    shortAnswer: "Certain legacy C build scripts and native JNI toolchains misinterpret spaces in path strings.",
    explanation: "While modern tools handle quoted paths properly, installing to a clean path like `C:\\Java\\jdk-21` prevents legacy batch script tokenization bugs.",
    hint: "Whitespace issues in legacy terminal scripts.",
    level: "intermediate",
    codeExample: "// Clean path: C:\\Java\\jdk-21 (No whitespace issues)"
  },
  {
    question: "How can you programmatically query the active Java version inside a Java program?",
    shortAnswer: "Using `System.getProperty(\"java.version\")` or `Runtime.version()` (Java 9+).",
    explanation: "`Runtime.version().feature()` returns the major integer version (e.g. `21`), allowing code to check runtime feature compatibility.",
    hint: "Runtime.version() API.",
    level: "basic",
    codeExample: "int major = Runtime.version().feature(); // Returns 21"
  },
  {
    question: "What is the purpose of the `jmods/` folder inside the JDK root directory?",
    shortAnswer: "It stores compiled JMOD modular artifacts used by `jlink` to build custom lightweight runtimes.",
    explanation: "JMOD files contain modular bytecode, native headers, and configuration files for all Java Platform Module System modules.",
    hint: "Contains Java modules for jlink linking.",
    level: "advanced",
    codeExample: "// Contains java.base.jmod, java.sql.jmod, java.net.http.jmod"
  },
  {
    question: "What is the purpose of the `include/` folder inside the JDK root directory?",
    shortAnswer: "It contains C and C++ header files (`jni.h`, `jvmti.h`) required for developing native JNI libraries.",
    explanation: "When compiling C code that links to the JVM via JNI, the C compiler includes `jni.h` from `$JAVA_HOME/include`.",
    hint: "C/C++ header files for JNI development.",
    level: "advanced",
    codeExample: "#include <jni.h> // Located in $JAVA_HOME/include"
  },
  {
    question: "What is the purpose of the `lib/` folder in modern JDKs?",
    shortAnswer: "It contains internal compiler modules, properties files, security policy files, and JVM static libraries.",
    explanation: "The `lib/` folder holds essential JVM internal components like `modules` (the linked runtime image) and `security/java.security`.",
    hint: "Internal JVM runtime libraries and security policies.",
    level: "intermediate",
    codeExample: "// $JAVA_HOME/lib/security/java.security"
  },
  {
    question: "What is the difference between User Environment Variables and System Environment Variables on Windows?",
    shortAnswer: "User variables apply only to the currently logged-in Windows account; System variables apply to all user accounts and system services.",
    explanation: "Configuring `JAVA_HOME` under System Variables ensures that background services (like Jenkins CI or Tomcat service) have access to Java.",
    hint: "Single user vs Machine-wide scope.",
    level: "basic",
    codeExample: "// Set under System Variables for universal machine access."
  },
  {
    question: "How does the `JAVA_TOOL_OPTIONS` environment variable work?",
    shortAnswer: "It automatically injects default JVM startup flags into every JVM instance launched on the machine.",
    explanation: "Setting `JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF-8` forces all Java applications and build tools to default to UTF-8 encoding without modifying command lines.",
    hint: "Global JVM flag injector.",
    level: "advanced",
    codeExample: "// Set: JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF-8"
  },
  {
    question: "What is the Java Classpath environment variable (`CLASSPATH`) and why is it usually left unset in modern setups?",
    shortAnswer: "An old environment variable defining default library search paths; left unset because modern build tools (Maven/Gradle/IDE) manage classpaths explicitly.",
    explanation: "Setting a global `CLASSPATH` variable often causes unexpected library version conflicts across different projects. It is best practice to pass `-cp` explicitly.",
    hint: "Global CLASSPATH can cause dependency conflicts.",
    level: "intermediate",
    codeExample: "// Best practice: Do NOT set global CLASSPATH; use Maven/Gradle or -cp."
  },
  {
    question: "How does WSL (Windows Subsystem for Linux) interact with Windows JDK installations?",
    shortAnswer: "WSL runs a Linux kernel and requires its own Linux OpenJDK installation for optimal performance.",
    explanation: "While WSL can technically invoke Windows `java.exe` across the interoperability bridge, native Linux builds inside WSL should use Linux JDK (`apt install openjdk-21-jdk`).",
    hint: "Linux kernel in WSL requires Linux OpenJDK.",
    level: "intermediate",
    codeExample: "// Inside WSL Ubuntu: sudo apt install openjdk-21-jdk"
  },
  {
    question: "What is the `jshell` command and how do you test if your JDK is fully functioning?",
    shortAnswer: "Launch `jshell` in terminal; if the interactive Java REPL prompt opens and evaluates expressions, the JDK is 100% operational.",
    explanation: "`jshell` requires the full compiler infrastructure. If `jshell` starts and executes `System.out.println(1+1);`, your JDK is flawlessly installed.",
    hint: "Launch jshell in terminal for instant verification.",
    level: "basic",
    codeExample: "// Terminal: jshell\n// jshell> Math.sqrt(144) ==> 12.0"
  },
  {
    question: "What is the best practice for team projects when onboarding new developers with different OS environments?",
    shortAnswer: "Use a `.sdkmanrc` or Dockerfile/DevContainer specifying the exact JDK distribution and version.",
    explanation: "Automated environment definitions guarantee that all developers (Windows, macOS, Linux) compile with the identical JDK build, eliminating 'works on my machine' friction.",
    hint: "Automated DevContainers and .sdkmanrc files.",
    level: "intermediate",
    codeExample: "// .sdkmanrc file: java=21.0.2-tem"
  },
  {
    question: "How does a properly configured JDK environment empower your daily Java development workflow?",
    shortAnswer: "It provides seamless command-line compilation, effortless IDE integration, robust build tool orchestration, and dependable production parity.",
    explanation: "A rock-solid environment configuration ensures that code compiles reliably, debuggers attach instantly, and build automation runs with zero friction.",
    hint: "The bedrock of professional software development.",
    level: "basic",
    codeExample: "// Verified Environment → Fast, productive, error-free engineering."
  }
];

export default questions;

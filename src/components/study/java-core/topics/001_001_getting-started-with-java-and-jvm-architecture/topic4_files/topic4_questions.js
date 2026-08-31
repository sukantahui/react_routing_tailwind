const questions = [
  {
    question: "What are the four primary editions of the Java platform?",
    shortAnswer: "Java SE (Standard Edition), Jakarta EE (Enterprise Edition), Java ME (Micro Edition), and JavaFX.",
    explanation: "These four editions cater to desktop/server foundations (SE), enterprise distributed cloud systems (EE), constrained embedded IoT devices (ME), and rich desktop GUI applications (JavaFX).",
    hint: "Think of SE, EE, ME, and FX.",
    level: "basic",
    codeExample: "// Java SE is the foundational layer upon which Jakarta EE is built."
  },
  {
    question: "Why was 'Java EE' rebranded to 'Jakarta EE' in 2017?",
    shortAnswer: "Oracle transferred Java EE to the Eclipse Foundation, requiring a rename because 'Java' is a trademark of Oracle.",
    explanation: "The Eclipse Foundation took over open-source stewardship of the enterprise platform and adopted the name 'Jakarta EE', migrating package namespaces from `javax.*` to `jakarta.*` in Jakarta EE 9.",
    hint: "Trademark constraints during the transfer to the Eclipse Foundation.",
    level: "intermediate",
    codeExample: "// Pre-Jakarta EE 9: import javax.servlet.http.*;\n// Modern Jakarta EE: import jakarta.servlet.http.*;"
  },
  {
    question: "What is the relationship between Java SE and Jakarta EE?",
    shortAnswer: "Java SE provides the foundational language and JVM; Jakarta EE adds enterprise API specifications on top of Java SE.",
    explanation: "You cannot run Jakarta EE without Java SE. Jakarta EE is a set of specifications (JPA, Servlets, JAX-RS) implemented on top of the standard Java SE runtime.",
    hint: "SE is the foundation; EE is the enterprise extension layer.",
    level: "basic",
    codeExample: "// Java SE: java.sql.Connection \n// Jakarta EE: jakarta.persistence.EntityManager"
  },
  {
    question: "What core APIs are included inside Java SE?",
    shortAnswer: "java.lang, java.util, java.io, java.nio, java.math, java.time, java.net, java.sql, java.util.concurrent.",
    explanation: "Java SE contains all core object types, data structures, I/O streams, concurrency utilities, mathematical precision tools, and database connectivity interfaces.",
    hint: "Think of standard library packages.",
    level: "basic",
    codeExample: "import java.util.List;\nimport java.time.LocalDate;\nimport java.sql.DriverManager;"
  },
  {
    question: "What is the primary purpose of Java ME (Micro Edition)?",
    shortAnswer: "To run Java on memory-constrained embedded devices, smart cards, and IoT hardware.",
    explanation: "Java ME provides stripped-down virtual machine configurations (CLDC and CDC) that run with mere kilobytes of RAM in SIM cards, credit card chips, and industrial microcontrollers.",
    hint: "Microcontrollers and smart cards.",
    level: "basic",
    codeExample: "// Embedded micro-controller JVM running in under 512KB RAM."
  },
  {
    question: "What is JavaFX and why did it replace Swing and AWT?",
    shortAnswer: "JavaFX is a modern, hardware-accelerated desktop UI toolkit supporting FXML, CSS styling, and 3D graphics.",
    explanation: "Legacy AWT/Swing suffered from outdated graphics pipelines and complex UI code. JavaFX separates UI presentation (FXML/CSS) from controller logic and utilizes GPU acceleration via DirectX/OpenGL.",
    hint: "Hardware acceleration + CSS styling for desktop apps.",
    level: "intermediate",
    codeExample: "public class MainApp extends Application {\n    @Override\n    public void start(Stage stage) { /* Launch JavaFX UI */ }\n}"
  },
  {
    question: "Is JavaFX included inside standard OpenJDK downloads since Java 11?",
    shortAnswer: "No, starting with Java 11, JavaFX was decoupled into an independent open-source project (OpenJFX).",
    explanation: "Oracle decoupled JavaFX to allow it to evolve independently. Developers include JavaFX modules via Maven/Gradle dependencies or download the standalone OpenJFX SDK.",
    hint: "Decoupled in Java 11 as OpenJFX.",
    level: "advanced",
    codeExample: "// Maven dependency: org.openjfx:javafx-controls:21"
  },
  {
    question: "What is the difference between a 'Specification' and an 'Implementation' in Jakarta EE?",
    shortAnswer: "A specification defines the standard interfaces/annotations (JPA); an implementation is the actual code executing them (Hibernate).",
    explanation: "Jakarta EE provides standardized API interfaces (e.g. `jakarta.persistence.EntityManager`), while vendors write concrete implementations (e.g. Hibernate, EclipseLink, Apache Tomcat).",
    hint: "Interface vs Concrete class.",
    level: "intermediate",
    codeExample: "// Specification: jakarta.persistence.EntityManager\n// Implementation: org.hibernate.internal.SessionImpl"
  },
  {
    question: "What is a 'Servlet' in the Jakarta EE specification?",
    shortAnswer: "A Java class that handles incoming HTTP client requests and generates dynamic server responses.",
    explanation: "Servlets form the low-level foundation of all Java web applications, processing HTTP GET/POST requests inside a Servlet Container (like Apache Tomcat).",
    hint: "The backbone of Java web servers.",
    level: "basic",
    codeExample: "public class HelloServlet extends HttpServlet {\n    protected void doGet(HttpServletRequest req, HttpServletResponse resp) { }\n}"
  },
  {
    question: "How does Spring Boot relate to Java SE and Jakarta EE?",
    shortAnswer: "Spring Boot is built on Java SE and implements/embeds Jakarta EE standards like Servlets and JPA.",
    explanation: "Spring Boot is an enterprise framework that uses Java SE core libraries and implements Jakarta EE specifications with auto-configuration and embedded web servers.",
    hint: "Framework orchestrating SE and Jakarta EE specs.",
    level: "intermediate",
    codeExample: "// Spring Boot uses Jakarta EE annotations like @Entity and @Table."
  },
  {
    question: "What is Jakarta Persistence (JPA)?",
    shortAnswer: "The standard Jakarta EE specification for Object-Relational Mapping (ORM) between Java objects and SQL tables.",
    explanation: "JPA allows mapping Java classes directly to relational database tables using annotations like `@Entity`, `@Id`, and `@Column`, eliminating boilerplate SQL.",
    hint: "ORM standard for database persistence.",
    level: "intermediate",
    codeExample: "@Entity\npublic class Customer {\n    @Id private Long id;\n    private String name;\n}"
  },
  {
    question: "What is the CLDC in Java ME architecture?",
    shortAnswer: "Connected Limited Device Configuration for devices with extremely low memory (160KB to 512KB).",
    explanation: "CLDC defines the minimal Java Virtual Machine (KVM) and core libraries for devices with 16-bit or 32-bit processors and intermittent network connectivity.",
    hint: "Configuration for low-memory micro-devices.",
    level: "expert",
    codeExample: "// CLDC: Minimalist KVM runtime."
  },
  {
    question: "What is the CDC in Java ME architecture?",
    shortAnswer: "Connected Device Configuration for devices with 2MB+ memory and full TCP/IP networking.",
    explanation: "CDC uses a full CVM (Compact Virtual Machine) supporting a broader set of standard Java SE APIs on higher-end embedded devices like smart TVs and automobile dashboards.",
    hint: "Higher-end embedded configuration.",
    level: "expert",
    codeExample: "// CDC: Used in automotive and smart TV gateways."
  },
  {
    question: "What is FXML in JavaFX?",
    shortAnswer: "An XML-based declarative markup language used to construct JavaFX graphical user interfaces.",
    explanation: "FXML separates UI layout design from Java business logic, allowing designers to build UI layouts in tools like Scene Builder while developers write Java controllers.",
    hint: "Declarative UI layout in XML.",
    level: "intermediate",
    codeExample: "<!-- Sample FXML snippet -->\n<Button text=\"Click Me\" onAction=\"#handleButtonClick\" />"
  },
  {
    question: "What are Jakarta RESTful Web Services (JAX-RS)?",
    shortAnswer: "The Jakarta EE specification for creating REST API endpoints using annotations (@GET, @POST, @Path).",
    explanation: "JAX-RS simplifies REST API development by binding HTTP methods, path variables, and JSON payloads directly to Java method parameters.",
    hint: "Annotations for REST APIs.",
    level: "basic",
    codeExample: "@Path(\"/users\")\npublic class UserResource {\n    @GET public List<User> getAll() { return List.of(); }\n}"
  },
  {
    question: "What is Jakarta Messaging (JMS)?",
    shortAnswer: "The enterprise messaging standard for asynchronous message exchange between distributed applications.",
    explanation: "JMS allows decoupled systems to send and receive messages asynchronously via Queues (Point-to-Point) and Topics (Publish-Subscribe) through brokers like ActiveMQ.",
    hint: "Asynchronous enterprise messaging.",
    level: "intermediate",
    codeExample: "// JMS connects enterprise microservices asynchronously."
  },
  {
    question: "What is an Application Server (e.g. WildFly, WebLogic) in Jakarta EE?",
    shortAnswer: "A comprehensive server environment implementing the full Jakarta EE specification suite.",
    explanation: "Unlike lightweight servlet containers (Tomcat), full application servers provide built-in transaction managers (JTA), enterprise beans (EJB), security domains, and messaging out of the box.",
    hint: "Full Jakarta EE certified runtime.",
    level: "advanced",
    codeExample: "// WildFly, Payara, WebLogic, WebSphere."
  },
  {
    question: "Why do modern developers often prefer lightweight micro-frameworks over heavy application servers?",
    shortAnswer: "Faster startup times, lower memory footprint, and easier containerization with Docker and Kubernetes.",
    explanation: "Modern cloud microservices favor Quarkus, Micronaut, and Spring Boot with embedded servers over multi-gigabyte application servers for rapid CI/CD deployment.",
    hint: "Cloud-native containers prioritize low RAM and instant startup.",
    level: "intermediate",
    codeExample: "// Quarkus native image starts in <10ms."
  },
  {
    question: "How do Java SE releases dictate Jakarta EE compatibility?",
    shortAnswer: "Each major Jakarta EE version targets a minimum baseline Java SE LTS version (e.g. Jakarta EE 10 targets Java 11/17).",
    explanation: "Jakarta EE evolves alongside Java SE, adopting modern Java SE features like Records, Sealed Classes, and Virtual Threads in newer enterprise releases.",
    hint: "Baseline Java SE version requirement.",
    level: "intermediate",
    codeExample: "// Jakarta EE 10 requires Java SE 11 or 17 LTS."
  },
  {
    question: "What is Scene Builder in JavaFX development?",
    shortAnswer: "A visual drag-and-drop WYSIWYG tool for designing JavaFX FXML user interfaces.",
    explanation: "Scene Builder allows developers and UI designers to lay out buttons, tables, charts, and animations visually, automatically generating clean FXML markup.",
    hint: "Visual UI designer for JavaFX.",
    level: "basic",
    codeExample: "// Generates .fxml files connected to Java controller classes."
  },
  {
    question: "What is the Java Card platform?",
    shortAnswer: "The most compact edition of Java designed for secure microchips and SIM cards.",
    explanation: "Java Card runs on smart cards with as little as 16KB of RAM, providing tamper-resistant cryptographic security for credit cards, passports, and mobile SIM cards.",
    hint: "Runs on bank credit cards and SIM cards.",
    level: "expert",
    codeExample: "// Over 6 billion Java Card devices are deployed globally."
  },
  {
    question: "What was J2EE and when did it become Java EE?",
    shortAnswer: "J2EE (Java 2 Enterprise Edition) was renamed to Java EE in 2006 with Java EE 5.",
    explanation: "Java EE 5 simplified enterprise development by replacing complex XML deployment descriptors and heavy EJB 2.x interfaces with lightweight POJO annotations.",
    hint: "The 2006 rebranding simplified enterprise Java.",
    level: "basic",
    codeExample: "// J2EE 1.4 → Java EE 5 → Java EE 8 → Jakarta EE 9/10"
  },
  {
    question: "What is the significance of the `jakarta.*` package namespace migration in Jakarta EE 9?",
    shortAnswer: "All enterprise classes moved from `javax.*` to `jakarta.*`, representing a historic architectural milestone.",
    explanation: "Because Oracle retained the `javax` trademark, the Eclipse Foundation updated all packages (e.g. `javax.servlet` to `jakarta.servlet`), requiring modern enterprise apps to update import statements.",
    hint: "The javax to jakarta import switch.",
    level: "intermediate",
    codeExample: "// Modern: import jakarta.persistence.*;"
  },
  {
    question: "Can you build desktop applications using pure Java SE without JavaFX?",
    shortAnswer: "Yes, using Swing and AWT, which remain bundled directly inside Java SE `java.desktop` module.",
    explanation: "Swing (`javax.swing.*`) and AWT (`java.awt.*`) are still fully supported core Java SE components, though JavaFX is preferred for modern styled applications.",
    hint: "Swing is still part of java.desktop in Java SE.",
    level: "basic",
    codeExample: "import javax.swing.JFrame;\nimport javax.swing.JButton;"
  },
  {
    question: "What is the `java.desktop` module in the Java Platform Module System (JPMS)?",
    shortAnswer: "The module containing standard desktop UI libraries including AWT, Swing, Image I/O, and Sound.",
    explanation: "In modular Java (Java 9+), desktop GUI classes are encapsulated in `java.desktop`, allowing headless cloud servers to exclude them via `jlink` to reduce memory.",
    hint: "Module containing Swing and AWT.",
    level: "advanced",
    codeExample: "// module-info.java: requires java.desktop;"
  },
  {
    question: "What is the primary role of Jakarta Contexts and Dependency Injection (CDI)?",
    shortAnswer: "To manage bean lifecycles and inject dependencies automatically using @Inject.",
    explanation: "CDI is the standard Jakarta EE dependency injection specification that binds business logic, events, and contextual state cleanly without tight coupling.",
    hint: "Standardized dependency injection with @Inject.",
    level: "advanced",
    codeExample: "@Inject\nprivate PaymentService paymentService;"
  },
  {
    question: "How does Android's Java environment differ from standard Java SE and Java ME?",
    shortAnswer: "Android uses Java language syntax but compiles bytecode to Dalvik Executable (DEX) format for the Android Runtime (ART).",
    explanation: "Android implements a subset of Java SE APIs but replaces the standard JVM with ART (Android Runtime) and custom Android UI/Activity libraries.",
    hint: "DEX bytecode and Android Runtime (ART).",
    level: "intermediate",
    codeExample: "// .java → .class → .dex (executed by Android ART)"
  },
  {
    question: "What is the role of Jakarta Bean Validation (Hibernate Validator)?",
    shortAnswer: "To declare data validation rules on entity fields using annotations like @NotNull, @Size, and @Min.",
    explanation: "Bean Validation validates incoming user input and database entity state declaratively across web and database layers.",
    hint: "Field validation annotations.",
    level: "basic",
    codeExample: "@NotNull\n@Size(min = 3, max = 50)\nprivate String username;"
  },
  {
    question: "Which Java edition should a student master FIRST before attempting enterprise or mobile development?",
    shortAnswer: "Java SE (Standard Edition).",
    explanation: "Java SE provides the foundational syntax, OOP design, Collections, Concurrency, and I/O principles without which enterprise frameworks cannot be understood.",
    hint: "Master the foundations before building frameworks.",
    level: "basic",
    codeExample: "// Strong Java SE mastery unlocks effortless Jakarta EE & Spring Boot success."
  },
  {
    question: "How do the 4 Java editions collectively cover the entire computing spectrum?",
    shortAnswer: "From 16KB smart cards (Java ME) to rich desktop apps (JavaFX), foundational programming (Java SE), and planetary-scale cloud clusters (Jakarta EE).",
    explanation: "No other language platform scales continuously across such diverse hardware footprints while sharing a unified object model and syntax.",
    hint: "From IoT micro-chips to global cloud datacenters.",
    level: "basic",
    codeExample: "// Java: The universal language across all scales of computing."
  }
];

export default questions;

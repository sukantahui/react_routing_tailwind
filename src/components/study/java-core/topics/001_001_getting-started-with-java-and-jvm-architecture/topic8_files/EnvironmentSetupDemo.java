/**
 * File: EnvironmentSetupDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 8 - Installing OpenJDK / Oracle JDK and configuring JAVA_HOME and PATH
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class EnvironmentSetupDemo {

    public static void main(String[] args) {
        System.out.println("=== JDK Environment Configuration Inspector ===");
        
        // Inspecting system properties and environment variables
        String javaHome = System.getProperty("java.home");
        String javaVersion = System.getProperty("java.version");
        String osName = System.getProperty("os.name");
        String userDir = System.getProperty("user.dir");
        
        System.out.println("JAVA_HOME / Runtime Path: " + javaHome);
        System.out.println("Installed Java Version: " + javaVersion);
        System.out.println("Host Operating System: " + osName);
        System.out.println("Current Working Directory: " + userDir);
        
        // Classroom configuration check
        String student = "Debangshu";
        String center = "Barrackpore Lab 1";
        System.out.println("\nConfiguration Status: " + student + " verified JAVA_HOME and PATH successfully at " + center + ".");
    }
}

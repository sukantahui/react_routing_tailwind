/**
 * File: WoraDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 3 - Understanding 'Write Once, Run Anywhere' (WORA) philosophy
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class WoraDemo {

    public static void main(String[] args) {
        System.out.println("=== Java WORA Architecture Demonstration ===");
        
        // Inspecting host runtime OS parameters without changing code
        String osName = System.getProperty("os.name");
        String osArch = System.getProperty("os.arch");
        String javaVersion = System.getProperty("java.version");
        String javaVendor = System.getProperty("java.vendor");
        
        System.out.println("Host Operating System: " + osName);
        System.out.println("CPU Architecture: " + osArch);
        System.out.println("JVM Version: " + javaVersion);
        System.out.println("JVM Vendor: " + javaVendor);
        
        // Demonstrating identical execution for students across locations
        String student1 = "Debangshu";
        String loc1 = "Barrackpore Lab";
        System.out.println(student1 + " compiled this bytecode once at " + loc1 + "; it runs identically across all systems.");
    }
}

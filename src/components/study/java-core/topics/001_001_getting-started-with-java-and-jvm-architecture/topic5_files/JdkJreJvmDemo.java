/**
 * File: JdkJreJvmDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 5 - JDK vs JRE vs JVM breakdown
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class JdkJreJvmDemo {

    public static void main(String[] args) {
        System.out.println("=== JDK vs JRE vs JVM Relationship Simulator ===");
        
        // JVM Runtime stats
        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        int availableProcessors = runtime.availableProcessors();
        
        System.out.println("JVM Available CPU Cores: " + availableProcessors);
        System.out.println("JVM Initialized Heap Memory: " + totalMemory + " MB");
        System.out.println("JVM Free Heap Memory: " + freeMemory + " MB");
        
        // Student environment inspection
        String student = "Abhronila";
        String city = "Naihati Center";
        System.out.println("\n" + student + " is developing with the full JDK at " + city + " while the production server only requires JRE/JVM.");
    }
}

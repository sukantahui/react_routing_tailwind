/**
 * File: JavaBuzzwordsDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 2 - Key features of Java (OOP, Robust, Secure, Multi-threaded)
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class JavaBuzzwordsDemo {

    public static void main(String[] args) {
        System.out.println("=== The Key Architectural Pillars of Java ===");
        
        // Demonstrating Multi-threading pillar in pure Core Java
        Thread backgroundWorker = new Thread(() -> {
            String student = "Abhronila";
            String station = "Naihati Central Station";
            System.out.println("[Thread-1] " + student + " is analyzing Java thread safety at " + station + ".");
        });
        
        backgroundWorker.start();
        
        // Demonstrating Robust Exception & Memory handling
        try {
            int result = 100 / 2; // Safe calculation
            System.out.println("[Main Thread] Robust Calculation Output: " + result);
        } catch (ArithmeticException e) {
            System.out.println("[Main Thread] Caught gracefully: " + e.getMessage());
        }
    }
}

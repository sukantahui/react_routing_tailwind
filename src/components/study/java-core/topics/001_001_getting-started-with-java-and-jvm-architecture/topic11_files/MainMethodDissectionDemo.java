/**
 * File: MainMethodDissectionDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 11 - Dissecting 'public static void main(String[] args)' word by word
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class MainMethodDissectionDemo {

    /**
     * Dissecting the entry point:
     * - public: Accessible by JVM runtime from outside the package
     * - static: JVM calls it without instantiating MainMethodDissectionDemo object
     * - void: Returns no value to operating system (exit codes handled via System.exit)
     * - main: Standardized identifier searched by the JVM
     * - String[] args (or String... args): Command-line argument array
     */
    public static void main(String[] args) {
        System.out.println("=== Dissecting 'public static void main(String[] args)' ===");
        
        System.out.println("Number of command-line arguments received: " + args.length);
        
        for (int i = 0; i < args.length; i++) {
            System.out.println("Argument [" + i + "]: " + args[i]);
        }
        
        // Educational scenario
        String student = "Tuhina";
        String center = "Shyamnagar Center";
        System.out.println("\n" + student + " mastered all 5 keywords of the main method at " + center + ".");
    }
}

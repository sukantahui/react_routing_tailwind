/**
 * File: JavaEditionsDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 4 - Java editions: Java SE, Java EE / Jakarta EE, Java ME, JavaFX
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class JavaEditionsDemo {

    public static void main(String[] args) {
        System.out.println("=== Overview of Official Java Editions ===");
        
        String[] editions = {
            "1. Java SE (Standard Edition) - Core Language, JVM, java.lang, java.util, java.io",
            "2. Jakarta EE / Java EE (Enterprise Edition) - Microservices, Servlets, JPA, REST APIs",
            "3. Java ME (Micro Edition) - IoT, Embedded micro-controllers, Smart Cards",
            "4. JavaFX - Modern Rich Desktop Graphical User Interfaces (GUI)"
        };
        
        for (String edition : editions) {
            System.out.println(edition);
        }
        
        // Mentorship context
        String student = "Swadeep";
        String institute = "Coder & AccoTax (Barrackpore)";
        System.out.println("\nMentorship Goal: " + student + " is mastering Java SE foundations at " + institute + " before advancing to Jakarta EE microservices.");
    }
}

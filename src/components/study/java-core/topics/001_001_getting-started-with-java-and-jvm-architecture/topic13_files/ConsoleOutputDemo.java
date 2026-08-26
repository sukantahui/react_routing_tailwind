/**
 * File: ConsoleOutputDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 13 - Understanding System.out.print(), println(), and printf()
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class ConsoleOutputDemo {

    public static void main(String[] args) {
        System.out.println("=== Java Console Output Architecture ===");
        
        // 1. System.out.print() - No newline appended
        System.out.print("Student: ");
        System.out.print("Abhronila");
        System.out.print(" | ");
        
        // 2. System.out.println() - Appends platform newline (\n or \r\n)
        System.out.println("Center: Naihati Academy");
        
        // 3. System.out.printf() - Formatted string with specifiers (%s, %d, %.2f, %n)
        String course = "Core Java Mastery";
        int score = 98;
        double feePaid = 1250.75;
        
        System.out.printf("Report: Course='%s', Marks=%d, Fee Paid=Rs.%.2f%n", course, score, feePaid);
    }
}

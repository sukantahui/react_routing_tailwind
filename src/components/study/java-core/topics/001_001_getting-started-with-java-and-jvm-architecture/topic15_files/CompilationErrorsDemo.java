/**
 * File: CompilationErrorsDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 15 - Common beginner compilation errors (cannot find symbol, incompatible types, missing return)
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class CompilationErrorsDemo {

    public static void main(String[] args) {
        System.out.println("=== Diagnostic Guide to Common Compilation Errors ===");
        
        // 1. Fixed 'cannot find symbol' error (Variable declared properly)
        int totalScore = 95;
        System.out.println("Total Score: " + totalScore);
        
        // 2. Fixed 'incompatible types' error (Explicit casting or matching type)
        int balance = (int) 1500.75; // Explicit cast from double to int
        System.out.println("Rounded Balance: " + balance);
        
        // 3. Fixed 'unreachable code' & 'missing return statement'
        String grade = evaluateGrade(totalScore);
        System.out.println("Evaluation: " + grade);
        
        // Mentorship context
        String student = "Debangshu";
        String lab = "Barrackpore Lab 2";
        System.out.println("\n" + student + " diagnosed and fixed 5 classic compile errors at " + lab + ".");
    }
    
    public static String evaluateGrade(int score) {
        if (score >= 90) {
            return "Distinction (A+)";
        } else {
            return "Pass (B)";
        }
        // Placing code here would cause 'unreachable statement' compile error!
    }
}

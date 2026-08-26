package topic12_files;

/**
 * File: CommandLineWorkflowDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 12 - Writing, compiling with 'javac', and running with 'java' from CLI
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class CommandLineWorkflowDemo {

    public static void main(String[] args) {
        System.out.println("=== Command-Line Compilation & Execution Mastery ===");
        
        System.out.println("Step 1: Write source code in src/topic12_files/CommandLineWorkflowDemo.java");
        System.out.println("Step 2: Compile to bin directory: javac -d bin src/topic12_files/CommandLineWorkflowDemo.java");
        System.out.println("Step 3: Execute from classpath root: java -cp bin topic12_files.CommandLineWorkflowDemo");
        
        // Local educational context
        String student = "Swadeep";
        String lab = "Barrackpore Terminal Lab";
        System.out.println("\nExecution Verified: " + student + " compiled and ran packaged code from the terminal in " + lab + ".");
    }
}

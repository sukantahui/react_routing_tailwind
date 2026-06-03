// topic5_files/LoopConcatenation.java
public class LoopConcatenation {
    public static void main(String[] args) {
        int iterations = 10000;
        
        // BAD: Using + in a loop
        long start = System.nanoTime();
        String result = "";
        for (int i = 0; i < iterations; i++) {
            result += i; // Creates many intermediate strings
        }
        long end = System.nanoTime();
        System.out.println("Using + in loop: " + (end - start) / 1_000_000 + " ms");
        
        // GOOD: Using StringBuilder
        start = System.nanoTime();
        StringBuilder sb = new StringBuilder(iterations * 5); // Pre-sized
        for (int i = 0; i < iterations; i++) {
            sb.append(i);
        }
        String sbResult = sb.toString();
        end = System.nanoTime();
        System.out.println("Using StringBuilder: " + (end - start) / 1_000_000 + " ms");
        
        // Demonstrate the difference in object creation
        System.out.println("\nWith +, each iteration creates a new String object.");
        System.out.println("With StringBuilder, one object is reused.");
        
        // Example: building a comma-separated list
        String[] students = {"Swadeep", "Tuhina", "Abhronila", "Debangshu"};
        StringBuilder list = new StringBuilder();
        for (int i = 0; i < students.length; i++) {
            list.append(students[i]);
            if (i < students.length - 1) {
                list.append(", ");
            }
        }
        System.out.println("\nStudent list: " + list.toString());
        
        // Simpler with String.join()
        String joined = String.join(", ", students);
        System.out.println("Using String.join(): " + joined);
    }
}
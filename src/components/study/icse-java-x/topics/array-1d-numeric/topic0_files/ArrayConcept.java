/**
 * ArrayConcept.java
 * 
 * Demonstrates the basic concept of an array in Java:
 * - Declaration
 * - Instantiation
 * - Initialization
 * - Access using index
 * - Memory representation (in comments)
 * 
 * @author Sukanta Hui (for classroom use)
 */
public class ArrayConcept {
    public static void main(String[] args) {
        // Declare an array of integers
        int[] marks;

        // Instantiate the array with size 5 (contiguous memory block allocated)
        marks = new int[5];

        // Initialize each element (simulating marks of students)
        marks[0] = 85;   // Swadeep
        marks[1] = 90;   // Tuhina
        marks[2] = 78;   // Abhronila
        marks[3] = 88;   // Debangshu
        marks[4] = 92;   // (another student, e.g., from Barrackpore)

        // Print all elements using a for loop
        System.out.println("Marks of students:");
        for (int i = 0; i < marks.length; i++) {
            System.out.println("Index " + i + ": " + marks[i]);
        }

        // Demonstrate memory address concept (simulated)
        System.out.println("\n--- Memory Representation ---");
        System.out.println("Base address (assumed): 0x7ffe");
        for (int i = 0; i < marks.length; i++) {
            int address = 0x7ffe + i * 4;  // each int = 4 bytes
            System.out.printf("marks[%d] stored at 0x%x (value = %d)%n", i, address, marks[i]);
        }
    }
}
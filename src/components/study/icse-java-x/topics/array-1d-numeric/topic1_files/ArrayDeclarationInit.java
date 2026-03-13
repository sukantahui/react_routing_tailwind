/**
 * ArrayDeclarationInit.java
 * 
 * Demonstrates various ways to declare and initialize arrays in Java.
 * 
 * @author Sukanta Hui (for classroom use)
 */
public class ArrayDeclarationInit {
    public static void main(String[] args) {
        // 1. Declaration only (reference is null)
        int[] arr1;
        // System.out.println(arr1); // would cause compile error - not initialized

        // 2. Initialization after declaration (using new)
        arr1 = new int[3];          // arr1 now points to an array of 3 ints (default 0)
        arr1[0] = 5;
        arr1[1] = 10;
        arr1[2] = 15;

        // 3. Combined declaration + instantiation (dynamic initialization)
        int[] arr2 = new int[4];    // all elements default 0

        // 4. Combined with static initialization (values given)
        int[] arr3 = { 2, 4, 6, 8 };  // size inferred: 4

        // 5. Anonymous array (useful for method arguments)
        printArray(new int[] { 1, 3, 5, 7 });

        // Print all arrays to verify
        System.out.println("arr1: " + java.util.Arrays.toString(arr1));
        System.out.println("arr2: " + java.util.Arrays.toString(arr2));
        System.out.println("arr3: " + java.util.Arrays.toString(arr3));
    }

    // Helper method that accepts an array
    public static void printArray(int[] array) {
        System.out.println("Anonymous array: " + java.util.Arrays.toString(array));
    }
}
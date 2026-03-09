/**
 * ArrayCreationNewKeyword.java
 * 
 * Demonstrates array creation using the 'new' keyword.
 * Shows allocation of different types and default values.
 * 
 * @author Sukanta Hui (for classroom use)
 */
public class ArrayCreationNewKeyword {
    public static void main(String[] args) {
        // Creating arrays of primitive types
        int[] numbers = new int[5];        // all elements 0
        double[] prices = new double[3];   // all elements 0.0
        boolean[] flags = new boolean[4];  // all elements false
        char[] letters = new char[2];      // all elements '\u0000' (null character)

        // Creating an array of reference type
        String[] names = new String[3];    // all elements null

        // Display default values
        System.out.println("Default values after 'new' creation:");
        
        System.out.print("int[] numbers: ");
        printArray(numbers);
        
        System.out.print("double[] prices: ");
        printArray(prices);
        
        System.out.print("boolean[] flags: ");
        printArray(flags);
        
        System.out.print("char[] letters: ");
        printArray(letters);
        
        System.out.print("String[] names: ");
        printArray(names);

        // Multi-dimensional array creation
        int[][] matrix = new int[2][3];     // 2 rows, 3 cols, all 0
        System.out.println("\n2D int array matrix[1][2] = " + matrix[1][2]);

        // Jagged array: first dimension only
        int[][] triangle = new int[3][];
        triangle[0] = new int[1];
        triangle[1] = new int[2];
        triangle[2] = new int[3];
        System.out.println("Jagged array created successfully.");
    }

    // Helper to print any array (using overloading for different types)
    public static void printArray(int[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(double[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(boolean[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(char[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(String[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }
}
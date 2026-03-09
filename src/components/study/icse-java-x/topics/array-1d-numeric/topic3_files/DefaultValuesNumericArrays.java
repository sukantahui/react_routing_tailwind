/**
 * DefaultValuesNumericArrays.java
 * 
 * Demonstrates default values for different numeric array types.
 * Also shows default values for char, boolean, and reference types for completeness.
 * 
 * @author Sukanta Hui (for classroom use)
 */
public class DefaultValuesNumericArrays {
    public static void main(String[] args) {
        // Numeric arrays - all default to 0 (or 0.0)
        byte[] byteArr = new byte[3];
        short[] shortArr = new short[3];
        int[] intArr = new int[3];
        long[] longArr = new long[3];
        float[] floatArr = new float[3];
        double[] doubleArr = new double[3];

        // Related types
        char[] charArr = new char[3];
        boolean[] boolArr = new boolean[3];
        String[] stringArr = new String[3]; // reference type

        // Print default values
        System.out.println("Default values for numeric arrays (and others):");
        
        System.out.print("byte[]   : ");
        printArray(byteArr);
        
        System.out.print("short[]  : ");
        printArray(shortArr);
        
        System.out.print("int[]    : ");
        printArray(intArr);
        
        System.out.print("long[]   : ");
        printArray(longArr);
        
        System.out.print("float[]  : ");
        printArray(floatArr);
        
        System.out.print("double[] : ");
        printArray(doubleArr);
        
        System.out.print("char[]   : ");
        printArray(charArr);  // prints as empty, but actually '\u0000'
        
        System.out.print("boolean[]: ");
        printArray(boolArr);
        
        System.out.print("String[] : ");
        printArray(stringArr); // null elements

        // Demonstrate that char default is not a space
        System.out.println("\nchar default as integer: " + (int) charArr[0]); // 0
    }

    // Helper methods to print arrays of various types
    public static void printArray(byte[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(short[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(int[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(long[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(float[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(double[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(char[] arr) {
        // Convert to int codes to show actual value
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) sb.append(", ");
            sb.append((int) arr[i]); // show numeric value
        }
        sb.append("]");
        System.out.println(sb.toString());
    }

    public static void printArray(boolean[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }

    public static void printArray(String[] arr) {
        System.out.println(java.util.Arrays.toString(arr));
    }
}
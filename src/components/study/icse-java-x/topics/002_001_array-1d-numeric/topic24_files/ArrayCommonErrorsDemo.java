public class ArrayCommonErrorsDemo {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};

        System.out.println("Demonstrating safe array traversal...");
        // Correct loop bound: i < arr.length
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();

        System.out.println("\nCommon Error Prevention Checklist:");
        System.out.println("1. Never write i <= arr.length (causes ArrayIndexOutOfBoundsException).");
        System.out.println("2. Never access uninitialized array reference (causes NullPointerException).");
        System.out.println("3. Always sort array BEFORE executing Binary Search.");
    }
}
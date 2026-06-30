/**
 * Demonstrates various O(1) (constant time) operations.
 * All these operations take the same time regardless of input size.
 */
public class ConstantOperations {
    public static void main(String[] args) {
        int a = 10, b = 5;
        long start, end;

        // 1. Arithmetic operations - O(1)
        start = System.nanoTime();
        int sum = a + b;
        int diff = a - b;
        int product = a * b;
        int quotient = a / b;
        end = System.nanoTime();
        System.out.println("Arithmetic operations: " + (end - start) + " ns");

        // 2. Variable assignment - O(1)
        start = System.nanoTime();
        int x = 100;
        int y = 200;
        int z = x;
        end = System.nanoTime();
        System.out.println("Variable assignment: " + (end - start) + " ns");

        // 3. Comparisons - O(1)
        start = System.nanoTime();
        boolean isEqual = (a == b);
        boolean isGreater = (a > b);
        boolean isLess = (a < b);
        end = System.nanoTime();
        System.out.println("Comparisons: " + (end - start) + " ns");

        // 4. Bitwise operations - O(1)
        start = System.nanoTime();
        int bitAnd = a & b;
        int bitOr = a | b;
        int bitXor = a ^ b;
        int bitShift = a << 2;
        end = System.nanoTime();
        System.out.println("Bitwise operations: " + (end - start) + " ns");

        // 5. Array access by index - O(1)
        int[] arr = new int[1000000];
        start = System.nanoTime();
        int value = arr[500000]; // Accessing any index takes the same time
        end = System.nanoTime();
        System.out.println("Array access by index: " + (end - start) + " ns");

        // All these operations are O(1) — constant time.
        System.out.println("\nAll operations above are O(1) — constant time.");
    }
}
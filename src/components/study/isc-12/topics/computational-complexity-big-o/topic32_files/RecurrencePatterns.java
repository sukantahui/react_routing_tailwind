/**
 * Demonstrates common recurrence patterns and how to identify them.
 * Each method shows a pattern with its recurrence and solution.
 */
public class RecurrencePatterns {
    public static void main(String[] args) {
        System.out.println("=== Recurrence Patterns ===\n");

        // Pattern 1: Linear T(n) = T(n-1) + O(1) → O(n)
        System.out.println("Pattern 1: Linear");
        System.out.println("  T(n) = T(n-1) + O(1) → O(n)");
        System.out.println("  Example: Factorial, Sum of n numbers");
        System.out.println("  Code: returns n * factorial(n-1)\n");

        // Pattern 2: Linear with O(n) work T(n) = T(n-1) + O(n) → O(n²)
        System.out.println("Pattern 2: Linear with O(n) work");
        System.out.println("  T(n) = T(n-1) + O(n) → O(n²)");
        System.out.println("  Example: Selection Sort, Insertion Sort (worst)");
        System.out.println("  Code: for i from 0 to n find min and swap\n");

        // Pattern 3: Divide & Conquer (constant) T(n) = 2T(n/2) + O(1) → O(n)
        System.out.println("Pattern 3: Divide & Conquer (constant work)");
        System.out.println("  T(n) = 2T(n/2) + O(1) → O(n)");
        System.out.println("  Example: Tree Traversal, D&C Max");
        System.out.println("  Code: return max(max(left), max(right))\n");

        // Pattern 4: Divide & Conquer (linear) T(n) = 2T(n/2) + O(n) → O(n log n)
        System.out.println("Pattern 4: Divide & Conquer (linear work)");
        System.out.println("  T(n) = 2T(n/2) + O(n) → O(n log n)");
        System.out.println("  Example: Merge Sort, Quick Sort (avg)");
        System.out.println("  Code: mergeSort(left) + mergeSort(right) + merge\n");

        // Pattern 5: Divide & Conquer (quadratic) T(n) = 2T(n/2) + O(n²) → O(n²)
        System.out.println("Pattern 5: Divide & Conquer (quadratic work)");
        System.out.println("  T(n) = 2T(n/2) + O(n²) → O(n²)");
        System.out.println("  Example: Some matrix operations");
        System.out.println("  Code: combine with O(n²) work\n");

        // Pattern 6: Binary Recursion T(n) = T(n-1) + T(n-2) + O(1) → O(2ⁿ)
        System.out.println("Pattern 6: Binary Recursion");
        System.out.println("  T(n) = T(n-1) + T(n-2) + O(1) → O(2ⁿ)");
        System.out.println("  Example: Naive Fibonacci");
        System.out.println("  Code: fib(n-1) + fib(n-2)\n");

        // Pattern 7: Exponential T(n) = 2T(n-1) + O(1) → O(2ⁿ)
        System.out.println("Pattern 7: Exponential");
        System.out.println("  T(n) = 2T(n-1) + O(1) → O(2ⁿ)");
        System.out.println("  Example: Tower of Hanoi");
        System.out.println("  Code: hanoi(n-1) + 1 + hanoi(n-1)\n");

        // Pattern 8: Logarithmic T(n) = T(n/2) + O(1) → O(log n)
        System.out.println("Pattern 8: Logarithmic");
        System.out.println("  T(n) = T(n/2) + O(1) → O(log n)");
        System.out.println("  Example: Binary Search");
        System.out.println("  Code: search in left or right half\n");

        // Pattern 9: Multiple Recursion T(n) = 3T(n/3) + O(n) → O(n log n)
        System.out.println("Pattern 9: Multiple Recursion");
        System.out.println("  T(n) = 3T(n/3) + O(n) → O(n log n)");
        System.out.println("  Example: 3-way Merge Sort");
        System.out.println("  Code: 3 recursive calls on thirds\n");

        // Summary table
        System.out.println("=== Summary ===");
        System.out.println("Pattern | Recurrence | Solution");
        System.out.println("Linear | T(n)=T(n-1)+O(1) | O(n)");
        System.out.println("Linear+O(n) | T(n)=T(n-1)+O(n) | O(n²)");
        System.out.println("D&C (const) | T(n)=2T(n/2)+O(1) | O(n)");
        System.out.println("D&C (linear) | T(n)=2T(n/2)+O(n) | O(n log n)");
        System.out.println("Binary | T(n)=T(n-1)+T(n-2)+O(1) | O(2ⁿ)");
        System.out.println("Exponential | T(n)=2T(n-1)+O(1) | O(2ⁿ)");
        System.out.println("Logarithmic | T(n)=T(n/2)+O(1) | O(log n)");
    }
}
/**
 * Handles multiple input variables: n, m, k.
 * Complexity: O(n²) + O(m·k) where different variables represent different inputs.
 */
public class MultipleVariables {
    public static void main(String[] args) {
        int n = 100;
        int m = 200;
        int k = 50;

        System.out.println("Multiple variables: O(n²) + O(m·k)");

        // Part 1: O(n²) — nested loop on n
        int count1 = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                count1++;
            }
        }

        // Part 2: O(m·k) — nested loop on m and k (different variables)
        int count2 = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < k; j++) {
                count2++;
            }
        }

        // Part 3: O(n) — linear on n (sequential)
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += i;
        }

        System.out.println("Iterations: n² = " + count1 + ", m*k = " + count2 + ", n = " + n);
        System.out.println("Total complexity = O(n² + m·k)");
        System.out.println("The linear O(n) part is dominated by O(n²) if n is large.");
        System.out.println("But we keep both O(n²) and O(m·k) because they depend on different variables.");
    }
}
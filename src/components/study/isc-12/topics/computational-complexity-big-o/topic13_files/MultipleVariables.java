/**
 * Demonstrates loops with multiple variables: O(n+m) and O(n*m)
 */
public class MultipleVariables {
    public static void main(String[] args) {
        int n = 100;
        int m = 200;

        // O(n + m) — two separate loops
        System.out.println("Two separate loops: O(n + m)");
        int sum = 0;
        for (int i = 0; i < n; i++) sum += i;
        for (int j = 0; j < m; j++) sum += j;
        System.out.println("Sum = " + sum);
        System.out.println("Iterations: " + (n + m));

        // O(n * m) — nested loops (but still a single loop? Actually nested loops are next topic)
        // Here we demonstrate a single loop that depends on both n and m (e.g., min(n,m))
        System.out.println("\nLoop that runs min(n,m) times: O(min(n,m))");
        int min = Math.min(n, m);
        int count = 0;
        for (int i = 0; i < min; i++) {
            count++;
        }
        System.out.println("Iterations: " + count);

        // Another: loop that runs n + m times
        System.out.println("\nLoop that runs n + m times: O(n + m)");
        count = 0;
        for (int i = 0; i < n + m; i++) {
            count++;
        }
        System.out.println("Iterations: " + count);
    }
}
// PrecedenceExample.java
// Demonstrates how operator precedence affects expression evaluation.

public class PrecedenceExample {
    public static void main(String[] args) {
        // Example 1: Arithmetic precedence
        int a = 10, b = 5, c = 2;
        int result1 = a + b * c;   // 10 + (5*2) = 20
        int result2 = (a + b) * c; // (10+5)*2 = 30
        System.out.println("a + b * c = " + result1);
        System.out.println("(a + b) * c = " + result2);

        // Example 2: Logical precedence (&& higher than ||)
        boolean p = true, q = false, r = true;
        boolean logic1 = p || q && r; // p || (q && r) = true
        boolean logic2 = (p || q) && r; // (true || false) && true = true
        System.out.println("p || q && r = " + logic1);
        System.out.println("(p || q) && r = " + logic2);

        // Example 3: Relational vs logical
        int x = 7, y = 3, z = 5;
        boolean rel = x > y && z < y; // (x > y) && (z < y) = true && false = false
        System.out.println("x > y && z < y = " + rel);

        // Example 4: Assignment is lowest precedence
        int i = 5, j = 10;
        int k = i + j * 2; // i + (j*2) = 25, then assigned to k
        System.out.println("k = " + k);

        // Example 5: Ternary with precedence
        int max = (a > b) ? a : b; // parentheses useful
        System.out.println("max of a and b = " + max);
    }
}
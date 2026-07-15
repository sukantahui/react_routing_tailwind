// InfixExample.java
// Demonstrates infix notation in Java, including precedence and parentheses.

public class InfixExample {
    public static void main(String[] args) {
        // Simple infix expressions
        int a = 10, b = 5, c = 2;

        // Without parentheses: precedence determines order
        int result1 = a + b * c;       // 10 + (5*2) = 20
        int result2 = (a + b) * c;     // (10+5)*2 = 30
        int result3 = a + (b * c);     // same as result1

        System.out.println("a + b * c = " + result1);
        System.out.println("(a + b) * c = " + result2);
        System.out.println("a + (b * c) = " + result3);

        // More complex
        int x = 12, y = 3, z = 4;
        int expr = x - y * z + y;      // 12 - (3*4) + 3 = 12 - 12 + 3 = 3
        int exprParen = (x - y) * z + y; // (12-3)*4 + 3 = 9*4 + 3 = 39
        System.out.println("\nx - y * z + y = " + expr);
        System.out.println("(x - y) * z + y = " + exprParen);

        // Boolean infix
        boolean p = true, q = false, r = true;
        boolean boolExpr = p && q || r;    // (p && q) || r = false || true = true
        boolean boolParen = p && (q || r); // true && (false || true) = true && true = true
        System.out.println("\np && q || r = " + boolExpr);
        System.out.println("p && (q || r) = " + boolParen);

        // Assignment (also infix)
        int total = 0;
        total += 5;  // total = total + 5
        total *= 2;  // total = total * 2
        System.out.println("\ntotal after += and *= : " + total);
    }
}
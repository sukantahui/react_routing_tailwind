// UnaryBinaryExample.java
// Demonstrates unary and binary operators in Java.

public class UnaryBinaryExample {
    public static void main(String[] args) {
        // ---- UNARY OPERATORS ----
        System.out.println("--- Unary Operators ---");

        int a = 10;

        // Unary minus
        int neg = -a;
        System.out.println("Unary minus: -" + a + " = " + neg);

        // Increment (prefix vs postfix)
        int b = 5;
        System.out.println("Initial b = " + b);
        int pre = ++b; // b becomes 6, pre = 6
        System.out.println("After ++b (prefix): b = " + b + ", pre = " + pre);
        int post = b++; // post = 6, b becomes 7
        System.out.println("After b++ (postfix): b = " + b + ", post = " + post);

        // Decrement
        int c = 8;
        System.out.println("Initial c = " + c);
        int dec = --c; // c becomes 7, dec = 7
        System.out.println("After --c: c = " + c + ", dec = " + dec);

        // Logical NOT
        boolean flag = true;
        System.out.println("flag = " + flag + ", !flag = " + !flag);

        // Bitwise complement (unary ~)
        int bits = 0b1010; // binary 1010 = 10
        int comp = ~bits;  // one's complement
        System.out.println("~0b1010 = " + comp + " (in binary: " + Integer.toBinaryString(comp) + ")");

        // ---- BINARY OPERATORS ----
        System.out.println("\n--- Binary Operators ---");

        int x = 12, y = 5;

        // Arithmetic
        System.out.println("x + y = " + (x + y));
        System.out.println("x - y = " + (x - y));
        System.out.println("x * y = " + (x * y));
        System.out.println("x / y = " + (x / y) + " (integer division)");
        System.out.println("x % y = " + (x % y) + " (modulo)");

        // Relational
        System.out.println("x > y? " + (x > y));
        System.out.println("x == y? " + (x == y));

        // Logical (short-circuit)
        boolean p = true, q = false;
        System.out.println("p && q = " + (p && q));
        System.out.println("p || q = " + (p || q));

        // Assignment compound
        int z = 7;
        z += 3; // z = z + 3
        System.out.println("z += 3 -> z = " + z);
        z *= 2; // z = z * 2
        System.out.println("z *= 2 -> z = " + z);

        // instanceof (binary)
        String str = "Hello";
        System.out.println("str instanceof String = " + (str instanceof String));
    }
}
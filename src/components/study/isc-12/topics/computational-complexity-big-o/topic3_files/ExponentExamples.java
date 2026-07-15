/**
 * Demonstrates various ways to compute exponents in Java.
 */
public class ExponentExamples {
    public static void main(String[] args) {
        int base = 2;
        int exp = 10;

        // 1. Using Math.pow (returns double)
        double result1 = Math.pow(base, exp);
        System.out.println("Math.pow(2,10) = " + result1);

        // 2. Using a loop (for integer exponents)
        long result2 = 1;
        for (int i = 0; i < exp; i++) {
            result2 *= base;
        }
        System.out.println("Loop: 2^10 = " + result2);

        // 3. Using bit shifting (only for base 2)
        long result3 = 1L << exp;
        System.out.println("Bit shift (1<<10) = " + result3);

        // 4. Using BigInteger for very large exponents
        java.math.BigInteger bigResult = java.math.BigInteger.valueOf(base).pow(exp);
        System.out.println("BigInteger: 2^10 = " + bigResult);

        // 5. Fast exponentiation (recursive)
        long result4 = fastPow(2, 10);
        System.out.println("FastPow(2,10) = " + result4);
    }

    // Fast exponentiation (exponentiation by squaring) - O(log n)
    public static long fastPow(long base, long exp) {
        if (exp == 0) return 1;
        if (exp % 2 == 0) {
            long half = fastPow(base, exp / 2);
            return half * half;
        } else {
            return base * fastPow(base, exp - 1);
        }
    }
}
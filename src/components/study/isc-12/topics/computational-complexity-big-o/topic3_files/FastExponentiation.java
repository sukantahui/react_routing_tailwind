/**
 * Demonstrates fast exponentiation (binary exponentiation)
 * which computes a^b in O(log b) time.
 */
public class FastExponentiation {
    public static void main(String[] args) {
        int base = 3;
        int exp = 13; // 3^13 = 1594323
        long result = fastPow(base, exp);
        System.out.println(base + "^" + exp + " = " + result);

        // Compare with Math.pow
        System.out.println("Math.pow: " + (long) Math.pow(base, exp));
    }

    // Iterative fast exponentiation (binary exponentiation)
    public static long fastPow(long base, long exp) {
        long result = 1;
        while (exp > 0) {
            if ((exp & 1) == 1) { // if exp is odd
                result *= base;
            }
            base *= base; // square the base
            exp >>= 1; // divide exp by 2
        }
        return result;
    }

    // Recursive fast exponentiation
    public static long fastPowRecursive(long base, long exp) {
        if (exp == 0) return 1;
        if (exp % 2 == 0) {
            long half = fastPowRecursive(base, exp / 2);
            return half * half;
        } else {
            return base * fastPowRecursive(base, exp - 1);
        }
    }
}
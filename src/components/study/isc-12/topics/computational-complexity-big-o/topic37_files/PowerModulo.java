/**
 * Modular Exponentiation: (base^exp) % mod
 * Used in cryptography, RSA, and many other applications.
 * 
 * Fast power with modulo keeps numbers small by applying modulo at each step.
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) — recursion stack
 */
public class PowerModulo {
    private static int callCount = 0;

    public static void main(String[] args) {
        int base = 2;
        int exp = 1000;
        int mod = 1000000007; // A large prime (commonly used in competitive programming)

        callCount = 0;
        long result = powerMod(base, exp, mod);

        System.out.println("=== Modular Exponentiation ===");
        System.out.println(base + "^" + exp + " % " + mod + " = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Time: O(log n), Space: O(log n)");

        // Show how modulo keeps numbers manageable
        System.out.println("\nWithout modulo: 2^1000 = " + FastPower.fastPower(base, exp));
        System.out.println("With modulo: " + result);

        // Cryptography example
        System.out.println("\n=== Cryptography Example ===");
        System.out.println("RSA encryption uses modular exponentiation with very large numbers.");
        System.out.println("For example, computing (base^exp) % mod where exp = 65537, mod is a 2048-bit number.");
        System.out.println("Fast modular exponentiation makes this feasible in O(log exp) steps.");
    }

    // Recursive modular exponentiation
    public static long powerMod(int base, int exp, int mod) {
        callCount++;

        if (exp == 0) {
            return 1 % mod;
        }

        if (exp % 2 == 0) {
            long half = powerMod(base, exp / 2, mod);
            return (half * half) % mod;
        } else {
            long half = powerMod(base, exp / 2, mod);
            return (base * ((half * half) % mod)) % mod;
        }
    }

    // Iterative modular exponentiation (O(log n) time, O(1) space)
    public static long powerModIterative(long base, long exp, long mod) {
        long result = 1;
        long b = base % mod;
        long e = exp;

        while (e > 0) {
            if ((e & 1) == 1) {
                result = (result * b) % mod;
            }
            b = (b * b) % mod;
            e >>= 1;
        }
        return result;
    }
}
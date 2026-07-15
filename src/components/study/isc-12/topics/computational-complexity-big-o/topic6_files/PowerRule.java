/**
 * Demonstrates the power rule: log_b(x^n) = n * log_b(x)
 */
public class PowerRule {
    public static void main(String[] args) {
        int base = 2;
        int x = 8;
        int n = 2;
        
        double logX = Math.log(x) / Math.log(base);
        double logPower = Math.log(Math.pow(x, n)) / Math.log(base);
        
        System.out.println("Base: " + base);
        System.out.println("log_" + base + "(" + x + ") = " + logX);
        System.out.println("n = " + n);
        System.out.println("n * log_" + base + "(" + x + ") = " + (n * logX));
        System.out.println("log_" + base + "(" + x + "^" + n + ") = " + logPower);
        System.out.println("Are they equal? " + (Math.abs((n * logX) - logPower) < 1e-10));
    }
}
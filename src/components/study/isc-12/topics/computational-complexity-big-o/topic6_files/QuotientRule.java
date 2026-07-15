/**
 * Demonstrates the quotient rule: log_b(x/y) = log_b(x) - log_b(y)
 */
public class QuotientRule {
    public static void main(String[] args) {
        int base = 2;
        int x = 32;
        int y = 4;
        
        double logX = Math.log(x) / Math.log(base);
        double logY = Math.log(y) / Math.log(base);
        double logQuotient = Math.log((double)x / y) / Math.log(base);
        
        System.out.println("Base: " + base);
        System.out.println("log_" + base + "(" + x + ") = " + logX);
        System.out.println("log_" + base + "(" + y + ") = " + logY);
        System.out.println("Difference = " + (logX - logY));
        System.out.println("log_" + base + "(" + x + "/" + y + ") = " + logQuotient);
        System.out.println("Are they equal? " + (Math.abs((logX - logY) - logQuotient) < 1e-10));
    }
}
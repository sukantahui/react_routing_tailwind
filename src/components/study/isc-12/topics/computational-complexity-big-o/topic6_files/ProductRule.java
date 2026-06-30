/**
 * Demonstrates the product rule: log_b(x*y) = log_b(x) + log_b(y)
 */
public class ProductRule {
    public static void main(String[] args) {
        int base = 2;
        int x = 8;
        int y = 4;
        
        double logX = Math.log(x) / Math.log(base);
        double logY = Math.log(y) / Math.log(base);
        double logProduct = Math.log(x * y) / Math.log(base);
        
        System.out.println("Base: " + base);
        System.out.println("log_" + base + "(" + x + ") = " + logX);
        System.out.println("log_" + base + "(" + y + ") = " + logY);
        System.out.println("Sum = " + (logX + logY));
        System.out.println("log_" + base + "(" + (x*y) + ") = " + logProduct);
        System.out.println("Are they equal? " + (Math.abs((logX + logY) - logProduct) < 1e-10));
    }
}
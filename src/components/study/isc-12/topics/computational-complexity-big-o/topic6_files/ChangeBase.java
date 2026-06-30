/**
 * Demonstrates change of base: log_b(x) = log_c(x) / log_c(b)
 * Using natural log (base e) and base 10 as intermediary.
 */
public class ChangeBase {
    public static void main(String[] args) {
        int base = 2;
        int x = 8;
        
        // Using natural log
        double log2UsingLn = Math.log(x) / Math.log(base);
        // Using log10
        double log2UsingLog10 = Math.log10(x) / Math.log10(base);
        
        System.out.println("Compute log_" + base + "(" + x + ")");
        System.out.println("Using ln: " + log2UsingLn);
        System.out.println("Using log10: " + log2UsingLog10);
        System.out.println("Direct known value: 3.0");
        System.out.println("Both methods match: " + 
            (Math.abs(log2UsingLn - 3.0) < 1e-10 && Math.abs(log2UsingLog10 - 3.0) < 1e-10));
        
        // Another example: log_3(81)
        base = 3;
        x = 81;
        double log3UsingLn = Math.log(x) / Math.log(base);
        System.out.println("\nlog_" + base + "(" + x + ") = " + log3UsingLn + " (should be 4)");
    }
}
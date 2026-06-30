/**
 * Demonstrates logarithm functions in Java.
 * - Math.log() : natural log (base e)
 * - Math.log10() : log base 10
 * - Custom log base using change of base formula
 */
public class LogarithmExamples {
    public static void main(String[] args) {
        double x = 100;

        // Natural log (base e)
        double ln = Math.log(x);
        System.out.println("ln(" + x + ") = " + ln);

        // Log base 10
        double log10 = Math.log10(x);
        System.out.println("log10(" + x + ") = " + log10);

        // Log base 2 using change of base: log2(x) = ln(x) / ln(2)
        double log2 = Math.log(x) / Math.log(2);
        System.out.println("log2(" + x + ") = " + log2);

        // Log base 3 (arbitrary base)
        double base = 3;
        double log3 = Math.log(x) / Math.log(base);
        System.out.println("log" + (int)base + "(" + x + ") = " + log3);

        // Check: 2^log2(x) should equal x (within floating point precision)
        double check = Math.pow(2, log2);
        System.out.println("2^log2(" + x + ") = " + check + " (should be " + x + ")");
    }
}
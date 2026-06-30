/**
 * Given logarithmic form: log_b(x) = y
 * Compute x = b^y.
 */
public class LogToExp {
    public static void main(String[] args) {
        // Example: log_2(8) = 3
        int base = 2;
        double logValue = 3.0;
        double result = Math.pow(base, logValue); // b^y
        System.out.println("log_" + base + "(x) = " + logValue + " → x = " + base + "^" + logValue + " = " + result);

        // Example: log_10(1000) = 3
        base = 10;
        logValue = 3.0;
        result = Math.pow(base, logValue);
        System.out.println("log_" + base + "(x) = " + logValue + " → x = " + base + "^" + logValue + " = " + result);

        // Example: log_3(81) = 4
        base = 3;
        logValue = 4.0;
        result = Math.pow(base, logValue);
        System.out.println("log_" + base + "(x) = " + logValue + " → x = " + base + "^" + logValue + " = " + result);
    }
}
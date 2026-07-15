/**
 * Given exponential form: b^y = x
 * Compute y = log_b(x).
 */
public class ExpToLog {
    public static void main(String[] args) {
        // Example: 2^3 = 8 → y = log_2(8)
        int base = 2;
        int result = 8;
        double y = Math.log(result) / Math.log(base);
        System.out.println(base + "^y = " + result + " → y = log_" + base + "(" + result + ") = " + y);

        // Example: 10^4 = 10000 → y = log_10(10000)
        base = 10;
        result = 10000;
        y = Math.log(result) / Math.log(base);
        System.out.println(base + "^y = " + result + " → y = log_" + base + "(" + result + ") = " + y);

        // Example: 5^3 = 125 → y = log_5(125)
        base = 5;
        result = 125;
        y = Math.log(result) / Math.log(base);
        System.out.println(base + "^y = " + result + " → y = log_" + base + "(" + result + ") = " + y);
    }
}
/**
 * Demonstrates conversion between exponential and logarithmic forms.
 * Given one form, computes the equivalent other form.
 */
public class ConversionExamples {
    public static void main(String[] args) {
        // Example 1: Exponential to Logarithmic
        int base = 2;
        int exponent = 3;
        int result = (int) Math.pow(base, exponent); // 2^3 = 8
        System.out.println("Exponential form: " + base + "^" + exponent + " = " + result);
        // Logarithmic form: log_base(result) = exponent
        double logResult = Math.log(result) / Math.log(base);
        System.out.println("Logarithmic form: log_" + base + "(" + result + ") = " + logResult);
        System.out.println();

        // Example 2: Logarithmic to Exponential
        double logValue = 3.0; // log_2(8) = 3
        int newBase = 2;
        double expResult = Math.pow(newBase, logValue); // 2^3 = 8
        System.out.println("Logarithmic form: log_" + newBase + "(" + expResult + ") = " + logValue);
        System.out.println("Exponential form: " + newBase + "^" + logValue + " = " + expResult);
        System.out.println();

        // Example 3: Solving for exponent: 5^y = 125
        int base2 = 5;
        int target = 125;
        double y = Math.log(target) / Math.log(base2);
        System.out.println("Solve: " + base2 + "^y = " + target + " → y = log_" + base2 + "(" + target + ") = " + y);
        System.out.println("Check: " + base2 + "^" + y + " = " + Math.pow(base2, y));
    }
}
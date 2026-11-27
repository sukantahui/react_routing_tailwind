// Topic 9: Math.random() - Random Number Generation in ICSE Class 9
// Demonstrates signature, return range [0.0, 1.0), and integer scaling formulas

public class MathRandomDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.random() Demonstration ===");

        // 1. Raw Math.random() generation
        // Generates double in range [0.0, 1.0)
        double r1 = Math.random();
        System.out.println("Raw Math.random() = " + r1);

        // 2. Generating random single-digit integer from 0 to 9:
        // Formula: (int)(Math.random() * 10)
        int digit = (int) (Math.random() * 10);
        System.out.println("Random digit (0 to 9) = " + digit);

        // 3. Simulating a standard 6-sided Dice (1 to 6):
        // Formula: (int)(Math.random() * 6) + 1
        int dice = (int) (Math.random() * 6) + 1;
        System.out.println("Simulated Dice Roll (1 to 6) = " + dice);

        // 4. Random two-digit integer between 10 and 99:
        // Formula: (int)(Math.random() * (max - min + 1)) + min
        // max = 99, min = 10 -> range = 99 - 10 + 1 = 90
        int twoDigit = (int) (Math.random() * 90) + 10;
        System.out.println("Random 2-digit number (10 to 99) = " + twoDigit);

        // 5. CRITICAL BOARD EXAM PARENTHESES TRAP:
        // If you write: (int) Math.random() * 10
        // (int) Math.random() executes FIRST, truncating [0.0, 1.0) to 0!
        // 0 * 10 is ALWAYS 0!
        int trap = (int) Math.random() * 10;
        System.out.println("Common Trap: (int) Math.random() * 10 ALWAYS = " + trap);
    }
}

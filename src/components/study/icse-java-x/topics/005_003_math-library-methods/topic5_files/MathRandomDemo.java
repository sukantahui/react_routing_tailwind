// MathRandomDemo.java
// ICSE Class X: Math.random() and Range Scaling
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class MathRandomDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE MATH METHOD: Math.random() ===");
        
        // 1. Raw random double [0.0, 1.0)
        double r = Math.random();
        System.out.println("Raw Math.random(): " + r);
        
        // 2. Dice Roll Simulation (1 to 6 inclusive)
        int dice = (int)(Math.random() * 6) + 1;
        System.out.println("Dice Roll (1 to 6): " + dice);
        
        // 3. Random integer in range [10, 50]
        int min = 10, max = 50;
        int randomInRange = (int)(Math.random() * (max - min + 1)) + min;
        System.out.println("Random int in [10, 50]: " + randomInRange);
        
        // 4. THE #1 BOARD EXAM BUG: CAST PRECEDENCE
        int bug = (int) Math.random() * 100; // WRONG! Evaluates to (0) * 100 = 0
        int correct = (int)(Math.random() * 100); // CORRECT!
        System.out.println("Buggy cast result: " + bug); // ALWAYS 0!
        System.out.println("Correct cast result: " + correct);
    }
}
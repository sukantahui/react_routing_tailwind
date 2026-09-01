/**
 * ICSE Class 10 Computer Applications - Module 004_001 Topic 4
 * Difference Between Constructor and Member Method
 *
 * Demonstrates:
 * 1. Constructor: Automatic instantiation call, no return type, same name as class.
 * 2. Member Method: Explicit dot-notation call, requires return type (void or data type), any name.
 * 3. Exam Trap: What happens when 'void' is added to a constructor name.
 *
 * @author Sukanta Hui - Coder & AccoTax
 */
public class ConstructorVsMethodDemo {

    private int score;

    // 1. CONSTRUCTOR (No return type, same name as class)
    public ConstructorVsMethodDemo() {
        System.out.println("[1. CONSTRUCTOR] Executed automatically by 'new' operator.");
        this.score = 50;
    }

    // 2. MEMBER METHOD (Has return type 'void', explicit dot-notation invocation)
    public void displayScore() {
        System.out.println("[2. METHOD] Explicitly called via obj.displayScore(). Score = " + this.score);
    }

    // 3. EXAM TRAP: Method with SAME NAME as class (Has 'void' return type)
    public void ConstructorVsMethodDemo() {
        System.out.println("[3. EXAM TRAP METHOD] This is a regular method, NOT a constructor!");
        this.score += 10;
    }

    public static void main(String[] args) {
        System.out.println("=== Instantiating Object ===");
        // Step A: Invokes Constructor #1
        ConstructorVsMethodDemo obj = new ConstructorVsMethodDemo();

        System.out.println("\n=== Invoking Member Methods ===");
        // Step B: Explicit call to regular method #2
        obj.displayScore();

        // Step C: Explicit call to exam trap method #3
        obj.ConstructorVsMethodDemo();

        // Display updated state
        obj.displayScore();
    }
}

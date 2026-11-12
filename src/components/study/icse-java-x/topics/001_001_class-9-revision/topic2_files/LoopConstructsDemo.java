// LoopConstructsDemo.java
// Revision of Class IX Iteration Constructs
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class LoopConstructsDemo {
    public static void main(String[] args) {
        System.out.println("=== CLASS IX REVISION: LOOP CONSTRUCTS ===");
        
        // 1. For Loop (Sum of first 5 natural numbers)
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
        }
        System.out.println("For Loop Sum (1 to 5): " + sum);
        
        // 2. While Loop (Counting down)
        int count = 3;
        System.out.print("While Countdown: ");
        while (count > 0) {
            System.out.print(count + " ");
            count--;
        }
        System.out.println();
        
        // 3. Do-While Loop (Executes at least once)
        int val = 10;
        System.out.print("Do-While Execution: ");
        do {
            System.out.print(val + " ");
            val++;
        } while (val < 10); // Condition is false, but executed once!
        System.out.println();
        
        // 4. Break vs Continue
        System.out.print("Continue on 3, Break on 5: ");
        for (int i = 1; i <= 10; i++) {
            if (i == 3) continue; // skip 3
            if (i == 5) break;    // terminate loop at 5
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
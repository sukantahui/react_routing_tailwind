import java.util.Scanner;

/**
 * CBSE Class XII Information Technology (802)
 * Practical Program: Print Numbers from N down to 1 using a while loop
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
public class PrintNto1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter starting positive integer N: ");
        int n = scanner.nextInt();
        
        System.out.println("\n--- Counting Down from " + n + " to 1 ---");
        
        // Loop initialization with N
        int current = n;
        
        // Pre-test condition: repeat while current is >= 1
        while (current >= 1) {
            System.out.print(current + " ");
            // Decrement loop control variable
            current--;
        }
        
        System.out.println("\nCountdown Complete!");
        scanner.close();
    }
}

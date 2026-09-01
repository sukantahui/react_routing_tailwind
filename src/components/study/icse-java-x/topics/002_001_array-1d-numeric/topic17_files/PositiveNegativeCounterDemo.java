import java.util.Scanner;

public class PositiveNegativeCounterDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " integers:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        int posCount = 0, negCount = 0, zeroCount = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] > 0) {
                posCount++;
            } else if (arr[i] < 0) {
                negCount++;
            } else {
                zeroCount++;
            }
        }

        System.out.println("\n--- Analysis Results ---");
        System.out.println("Positive Count: " + posCount);
        System.out.println("Negative Count: " + negCount);
        System.out.println("Zero Count:     " + zeroCount);
        
        
    }
}
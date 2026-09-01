import java.util.Scanner;

public class ICSEBoardArrayLogicDemo {
    // Helper method to check prime
    private static boolean isPrime(int num) {
        if (num <= 1) return false;
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter array size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " positive integers:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("\n--- ICSE Board Analysis: Prime Numbers in Array ---");
        int primeCount = 0;
        for (int i = 0; i < n; i++) {
            if (isPrime(arr[i])) {
                System.out.println("Prime element found at index " + i + " -> " + arr[i]);
                primeCount++;
            }
        }
        System.out.println("Total Prime Numbers: " + primeCount);
        
    }
}
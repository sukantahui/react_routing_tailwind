import java.util.Scanner;

public class FrequencyCounterDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter target element to count: ");
        int target = sc.nextInt();

        int freq = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] == target) {
                freq++;
            }
        }

        System.out.println("Element " + target + " appears " + freq + " time(s) in the array.");
        
    }
}
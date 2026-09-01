import java.util.Scanner;

public class ArrayInsertDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter current number of elements (max 10): ");
        int n = sc.nextInt();
        int[] arr = new int[10];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter position (0 to " + n + ") to insert: ");
        int pos = sc.nextInt();
        System.out.print("Enter value to insert: ");
        int val = sc.nextInt();

        // Right shift elements to make space
        for (int i = n; i > pos; i--) {
            arr[i] = arr[i - 1];
        }
        arr[pos] = val;
        n++;

        System.out.print("Array after insertion: [ ");
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i < n - 1 ? ", " : ""));
        }
        System.out.println(" ]");
        
    }
}
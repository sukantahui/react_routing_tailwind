import java.util.Scanner;

public class ArrayDeleteDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size of array: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter index (0 to " + (n - 1) + ") to delete: ");
        int delIndex = sc.nextInt();

        if (delIndex < 0 || delIndex >= n) {
            System.out.println("Invalid Index!");
        } else {
            // Left shift elements to overwrite deleted item
            for (int i = delIndex; i < n - 1; i++) {
                arr[i] = arr[i + 1];
            }
            n--; // Decrement size

            System.out.print("Array after deletion: [ ");
            for (int i = 0; i < n; i++) {
                System.out.print(arr[i] + (i < n - 1 ? ", " : ""));
            }
            System.out.println(" ]");
        }
        
    }
}
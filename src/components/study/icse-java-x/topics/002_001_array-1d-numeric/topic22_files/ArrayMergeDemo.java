import java.util.Scanner;

public class ArrayMergeDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter size of First Array: ");
        int n1 = sc.nextInt();
        int[] a = new int[n1];
        System.out.println("Enter elements of First Array:");
        for (int i = 0; i < n1; i++) a[i] = sc.nextInt();

        System.out.print("Enter size of Second Array: ");
        int n2 = sc.nextInt();
        int[] b = new int[n2];
        System.out.println("Enter elements of Second Array:");
        for (int i = 0; i < n2; i++) b[i] = sc.nextInt();

        int[] c = new int[n1 + n2];

        // Copy elements from A
        for (int i = 0; i < n1; i++) {
            c[i] = a[i];
        }
        // Copy elements from B
        for (int i = 0; i < n2; i++) {
            c[n1 + i] = b[i];
        }

        System.out.print("Merged Array: [ ");
        for (int i = 0; i < c.length; i++) {
            System.out.print(c[i] + (i < c.length - 1 ? ", " : ""));
        }
        System.out.println(" ]");
        
    }
}
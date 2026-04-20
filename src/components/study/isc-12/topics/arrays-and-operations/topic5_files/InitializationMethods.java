import java.util.Arrays;

public class InitializationMethods {
    public static void main(String[] args) {
        // Method 1: Using 'new' with dimensions (default values)
        int[][] rect = new int[2][3];
        System.out.println("Rectangular (default zeros):");
        System.out.println(Arrays.deepToString(rect));
        
        // Method 2: Array initializer (values known at compile time)
        int[][] initialized = {
            {1, 2, 3},
            {4, 5, 6}
        };
        System.out.println("\nWith array initializer:");
        System.out.println(Arrays.deepToString(initialized));
        
        // Method 3: Step-by-step (jagged)
        int[][] jagged = new int[3][];
        jagged[0] = new int[2];
        jagged[1] = new int[4];
        jagged[2] = new int[1];
        // Assign values later
        jagged[0][0] = 10;
        jagged[0][1] = 20;
        jagged[1][0] = 30;
        jagged[1][1] = 40;
        jagged[1][2] = 50;
        jagged[1][3] = 60;
        jagged[2][0] = 70;
        System.out.println("\nStep-by-step jagged array:");
        System.out.println(Arrays.deepToString(jagged));
    }
}
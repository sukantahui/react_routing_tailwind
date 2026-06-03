public class JaggedArrayInit {
    public static void main(String[] args) {
        // Declare jagged array (only outer size)
        int[][] jagged = new int[3][];
        
        // Initialize each row with different lengths
        jagged[0] = new int[2];
        jagged[1] = new int[4];
        jagged[2] = new int[3];
        
        // Alternative: using array initializer
        int[][] jagged2 = {
            {1, 2},
            {3, 4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Jagged array from initializer:");
        for (int i = 0; i < jagged2.length; i++) {
            System.out.print("Row " + i + " (length " + jagged2[i].length + "): ");
            for (int j = 0; j < jagged2[i].length; j++) {
                System.out.print(jagged2[i][j] + " ");
            }
            System.out.println();
        }
    }
}
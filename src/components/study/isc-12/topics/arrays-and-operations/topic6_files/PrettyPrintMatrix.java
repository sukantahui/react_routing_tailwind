public class PrettyPrintMatrix {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 20, 300},
            {4000, 5, 6},
            {7, 88888, 9}
        };
        
        // Find maximum width for formatting
        int maxWidth = 0;
        for (int[] row : matrix) {
            for (int val : row) {
                int width = String.valueOf(val).length();
                if (width > maxWidth) maxWidth = width;
            }
        }
        maxWidth++; // add a space
        
        System.out.println("Pretty printed matrix:");
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.printf("%" + maxWidth + "d", val);
            }
            System.out.println();
        }
    }
}
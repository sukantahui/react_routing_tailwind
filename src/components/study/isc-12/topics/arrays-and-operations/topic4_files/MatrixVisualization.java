import java.util.Arrays;

public class MatrixVisualization {
    public static void main(String[] args) {
        // A 3x3 identity matrix
        int[][] identity = {
            {1, 0, 0},
            {0, 1, 0},
            {0, 0, 1}
        };
        
        // Using deepToString for easy visualization
        System.out.println("Identity matrix:");
        System.out.println(Arrays.deepToString(identity));
        
        // Visualizing as a grid
        System.out.println("\nAs a grid:");
        for (int i = 0; i < identity.length; i++) {
            for (int j = 0; j < identity[i].length; j++) {
                System.out.print(identity[i][j] + " ");
            }
            System.out.println();
        }
    }
}
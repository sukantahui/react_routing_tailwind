/**
 * TraverseLengthProperty.java
 * 
 * Demonstrates safe array traversal using the `length` property.
 * Shows forward and backward loops.
 * 
 * @author Sukanta Hui (for classroom use)
 */
public class TraverseLengthProperty {
    public static void main(String[] args) {
        // Sample array – could be any size
        int[] scores = { 85, 92, 77, 90, 88 };

        // Forward traversal using length
        System.out.println("Forward traversal (using length):");
        for (int i = 0; i < scores.length; i++) {
            System.out.println("scores[" + i + "] = " + scores[i]);
        }

        // Backward traversal
        System.out.println("\nBackward traversal:");
        for (int i = scores.length - 1; i >= 0; i--) {
            System.out.println("scores[" + i + "] = " + scores[i]);
        }

        // Demonstrating length for a 2D array
        int[][] matrix = {
            { 1, 2, 3 },
            { 4, 5, 6 },
            { 7, 8, 9 }
        };

        System.out.println("\n2D array traversal:");
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                System.out.print(matrix[row][col] + " ");
            }
            System.out.println();
        }

        // Show length values
        System.out.println("\nmatrix.length = " + matrix.length + " rows");
        System.out.println("matrix[0].length = " + matrix[0].length + " columns");
    }
}
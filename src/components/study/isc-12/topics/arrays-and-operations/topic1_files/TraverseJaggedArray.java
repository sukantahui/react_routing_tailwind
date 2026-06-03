public class TraverseJaggedArray {
    public static void main(String[] args) {
        // Jagged array: rows have different lengths
        int[][] jagged = {
            {1, 2},
            {3, 4, 5},
            {6, 7, 8, 9}
        };
        
        // Traversal: each row's length is obtained individually
        for (int i = 0; i < jagged.length; i++) {
            for (int j = 0; j < jagged[i].length; j++) {
                System.out.print(jagged[i][j] + " ");
            }
            System.out.println();
        }
        
        // Output:
        // 1 2 
        // 3 4 5 
        // 6 7 8 9
    }
}
public class TraverseJagged {
    public static void main(String[] args) {
        int[][] jagged = {
            {1, 2},
            {3, 4, 5},
            {6, 7, 8, 9}
        };
        
        System.out.println("Traversing jagged array:");
        for (int i = 0; i < jagged.length; i++) {
            for (int j = 0; j < jagged[i].length; j++) {  // note jagged[i].length
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
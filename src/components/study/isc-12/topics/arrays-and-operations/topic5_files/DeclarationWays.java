public class DeclarationWays {
    public static void main(String[] args) {
        // Method 1: Preferred style
        int[][] matrix1;
        
        // Method 2: C-style (works but less common)
        int matrix2[][];
        
        // Method 3: Mixed style
        int[] matrix3[];
        
        // All are equivalent. We'll use matrix1 for demonstration
        matrix1 = new int[3][4]; // now initialized
        System.out.println("Declaration successful");
    }
}
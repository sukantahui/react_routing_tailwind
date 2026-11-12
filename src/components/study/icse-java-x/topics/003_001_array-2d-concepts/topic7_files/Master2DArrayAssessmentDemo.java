/**
 * ICSE Class X Computer Applications - 2D Array Master Assessment Demo
 * Educator: Sukanta Hui, Coder & AccoTax, Barrackpore (+91 7003756860)
 */
public class Master2DArrayAssessmentDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE 2D Array Comprehensive Assessment Demo ===");
        int[][] a = {{1, 2}, {3, 4}};
        int[][] b = {{5, 6}, {7, 8}};
        int[][] sum = new int[2][2];

        System.out.println("Matrix Addition Result:");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                sum[i][j] = a[i][j] + b[i][j];
                System.out.print(sum[i][j] + " ");
            }
            System.out.println();
        }
    }
}
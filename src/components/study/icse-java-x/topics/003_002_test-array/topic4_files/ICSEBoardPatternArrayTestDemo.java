/**
 * ICSE Class X Computer Applications - ICSEBoardPatternArrayTestDemo
 * Educator: Sukanta Hui, Coder & AccoTax, Barrackpore (+91 7003756860)
 */
public class ICSEBoardPatternArrayTestDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSEBoardPatternArrayTestDemo Running ===");
        System.out.println("ICSE Board Array Practice Simulation - Sukanta Hui, Barrackpore");
        int[] data = {45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 6, 8};
        System.out.println("Array length: " + data.length);
        int max = data[0];
        for (int i = 1; i < data.length; i++) {
            if (data[i] > max) max = data[i];
        }
        System.out.println("Maximum element found: " + max);
        System.out.println("Test module verification complete.");
    }
}
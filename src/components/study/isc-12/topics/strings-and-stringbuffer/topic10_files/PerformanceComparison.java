// topic10_files/PerformanceComparison.java
public class PerformanceComparison {
    public static void main(String[] args) {
        int iterations = 50000;
        
        // String
        long start = System.nanoTime();
        String str = "";
        for (int i = 0; i < iterations; i++) {
            str += "a";
        }
        long end = System.nanoTime();
        System.out.println("String time: " + (end - start) / 1_000_000 + " ms");
        
        // StringBuffer
        start = System.nanoTime();
        StringBuffer sbf = new StringBuffer(iterations);
        for (int i = 0; i < iterations; i++) {
            sbf.append("a");
        }
        String sbfResult = sbf.toString();
        end = System.nanoTime();
        System.out.println("StringBuffer time: " + (end - start) / 1_000_000 + " ms");
        
        // StringBuilder
        start = System.nanoTime();
        StringBuilder sb = new StringBuilder(iterations);
        for (int i = 0; i < iterations; i++) {
            sb.append("a");
        }
        String sbResult = sb.toString();
        end = System.nanoTime();
        System.out.println("StringBuilder time: " + (end - start) / 1_000_000 + " ms");
        
        System.out.println("\nNote: StringBuilder is fastest, String is slowest.");
        System.out.println("StringBuffer is slower than StringBuilder due to synchronization.");
        System.out.println("Pre-sizing helps all mutable classes avoid resizing.");
    }
}
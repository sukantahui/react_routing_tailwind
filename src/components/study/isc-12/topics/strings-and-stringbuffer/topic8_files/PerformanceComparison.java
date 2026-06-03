// topic8_files/PerformanceComparison.java
public class PerformanceComparison {
    public static void main(String[] args) {
        int iterations = 50000;
        
        // Immutable String concatenation
        long start = System.nanoTime();
        String result = "";
        for (int i = 0; i < iterations; i++) {
            result += "a";
        }
        long end = System.nanoTime();
        System.out.println("String time: " + (end - start) / 1_000_000 + " ms");
        
        // Mutable StringBuilder (default capacity)
        start = System.nanoTime();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sb.append("a");
        }
        String sbResult = sb.toString();
        end = System.nanoTime();
        System.out.println("StringBuilder (default capacity) time: " + (end - start) / 1_000_000 + " ms");
        
        // Mutable StringBuilder (pre‑sized)
        start = System.nanoTime();
        StringBuilder sbPre = new StringBuilder(iterations);
        for (int i = 0; i < iterations; i++) {
            sbPre.append("a");
        }
        String preResult = sbPre.toString();
        end = System.nanoTime();
        System.out.println("StringBuilder (pre‑sized) time: " + (end - start) / 1_000_000 + " ms");
        
        // StringBuffer (thread‑safe)
        start = System.nanoTime();
        StringBuffer sbf = new StringBuffer(iterations);
        for (int i = 0; i < iterations; i++) {
            sbf.append("a");
        }
        String sbfResult = sbf.toString();
        end = System.nanoTime();
        System.out.println("StringBuffer time: " + (end - start) / 1_000_000 + " ms");
        
        System.out.println("\nNote: String is much slower because it creates many intermediate objects.");
        System.out.println("StringBuilder with pre‑sizing is the fastest.");
        System.out.println("StringBuffer is slightly slower than StringBuilder due to synchronization.");
    }
}
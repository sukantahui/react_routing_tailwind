// topic7_files/StringBufferVsString.java
public class StringBufferVsString {
    public static void main(String[] args) {
        // Performance comparison for 100,000 concatenations
        int iterations = 100000;
        
        // String (bad)
        long start = System.nanoTime();
        String str = "";
        for (int i = 0; i < iterations; i++) {
            str += "a";
        }
        long end = System.nanoTime();
        System.out.println("String time: " + (end - start) / 1_000_000 + " ms");
        
        // StringBuffer (good)
        start = System.nanoTime();
        StringBuffer sb = new StringBuffer(iterations);
        for (int i = 0; i < iterations; i++) {
            sb.append("a");
        }
        String result = sb.toString();
        end = System.nanoTime();
        System.out.println("StringBuffer time: " + (end - start) / 1_000_000 + " ms");
        
        // StringBuffer with pre-sizing
        start = System.nanoTime();
        StringBuffer sbPre = new StringBuffer(iterations);
        for (int i = 0; i < iterations; i++) {
            sbPre.append("a");
        }
        String resultPre = sbPre.toString();
        end = System.nanoTime();
        System.out.println("StringBuffer (pre-sized) time: " + (end - start) / 1_000_000 + " ms");
        
        // Memory demonstration: String creates many objects
        System.out.println("\nString creates " + iterations + " intermediate objects.");
        System.out.println("StringBuffer creates 1 object (plus occasional array resizes).");
        
        // Real-world example: building a log message from multiple sources
        StringBuffer log = new StringBuffer();
        log.append("[INFO] ").append("User ").append("Swadeep").append(" logged in at ");
        log.append(java.time.LocalTime.now());
        System.out.println("\nLog entry: " + log);
        
        // Thread-safety demonstration (conceptual)
        System.out.println("\nStringBuffer is safe to share across threads.");
        System.out.println("String is immutable and also thread-safe.");
        System.out.println("StringBuilder is NOT thread-safe.");
    }
}
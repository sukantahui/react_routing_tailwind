// topic11_files/InterningDemo.java
public class InterningDemo {
    public static void main(String[] args) {
        // Without interning: many duplicate objects
        long start = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            String s = new String("test");
            // each iteration creates a new object
        }
        long end = System.nanoTime();
        System.out.println("Without interning (new String): " + (end - start) / 1_000_000 + " ms");
        
        // With literal (already pooled)
        start = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            String s = "test"; // same object each time
        }
        end = System.nanoTime();
        System.out.println("With literal (pooled): " + (end - start) / 1_000_000 + " ms");
        
        // Interning dynamically created strings
        String s1 = new String("hello");
        String s2 = new String("hello");
        System.out.println("\ns1 == s2: " + (s1 == s2)); // false
        
        String s3 = s1.intern();
        String s4 = s2.intern();
        System.out.println("s3 == s4: " + (s3 == s4)); // true (both from pool)
        
        // Performance cost of interning many distinct strings
        System.out.println("\nInterning many distinct strings (may be slow):");
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            String s = new String("value" + i).intern();
        }
        end = System.nanoTime();
        System.out.println("Interning 10,000 distinct strings: " + (end - start) / 1_000_000 + " ms");
        
        // Without interning (just creating new objects)
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            String s = new String("value" + i);
        }
        end = System.nanoTime();
        System.out.println("Without interning (new objects): " + (end - start) / 1_000_000 + " ms");
        
        // Recommendation: only intern known limited values
        String[] methods = {"GET", "POST", "PUT", "DELETE"};
        String[] internedMethods = new String[methods.length];
        for (int i = 0; i < methods.length; i++) {
            internedMethods[i] = methods[i].intern(); // good: limited set
        }
        System.out.println("\nInterning limited set is beneficial.");
    }
}
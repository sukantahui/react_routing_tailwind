// topic2_files/WhyImmutable.java
public class WhyImmutable {
    public static void main(String[] args) {
        // 1. Security example (conceptual)
        String password = "secret123";
        // If strings were mutable, malicious code could change password after validation
        // But they can't.
        
        // 2. String Pool benefit (reuse)
        String s1 = "Shyamnagar";
        String s2 = "Shyamnagar";
        System.out.println("s1 == s2: " + (s1 == s2)); // true: same object
        // If strings were mutable, changing s1 would also change s2 - disaster!
        
        // 3. Hashcode caching
        String key = "Naihati";
        int hash1 = key.hashCode();
        // Some operations...
        int hash2 = key.hashCode();
        System.out.println("Hashcode same? " + (hash1 == hash2)); // true, cached
        
        // 4. Thread safety
        Runnable task = () -> {
            String local = key; // safe to share across threads
            System.out.println(local.length());
        };
        new Thread(task).start();
        new Thread(task).start();
        
        // 5. Performance comparison: concatenation vs StringBuilder
        long start = System.nanoTime();
        String result = "";
        for (int i = 0; i < 100; i++) {
            result += i; // creates many intermediate strings
        }
        long end = System.nanoTime();
        System.out.println("\nString + time: " + (end - start) + " ns");
        
        start = System.nanoTime();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 100; i++) {
            sb.append(i);
        }
        String sbResult = sb.toString();
        end = System.nanoTime();
        System.out.println("StringBuilder time: " + (end - start) + " ns");
        // StringBuilder is much faster for many concatenations
    }
}
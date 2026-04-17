// topic11_files/StringBuilderOptimizations.java
public class StringBuilderOptimizations {
    public static void main(String[] args) {
        // 1. Pre‑sizing
        int size = 100000;
        long start, end;
        
        // Without pre‑sizing
        start = System.nanoTime();
        StringBuilder sb1 = new StringBuilder();
        for (int i = 0; i < size; i++) {
            sb1.append("a");
        }
        end = System.nanoTime();
        System.out.println("Without pre‑sizing: " + (end - start) / 1_000_000 + " ms");
        
        // With pre‑sizing
        start = System.nanoTime();
        StringBuilder sb2 = new StringBuilder(size);
        for (int i = 0; i < size; i++) {
            sb2.append("a");
        }
        end = System.nanoTime();
        System.out.println("With pre‑sizing: " + (end - start) / 1_000_000 + " ms");
        
        // 2. Reusing StringBuilder with setLength(0)
        StringBuilder reusable = new StringBuilder(1000);
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            reusable.setLength(0);
            reusable.append("Iteration ").append(i);
            // use reusable.toString()
        }
        end = System.nanoTime();
        System.out.println("\nReusing StringBuilder: " + (end - start) / 1_000_000 + " ms");
        
        // 3. Using char append instead of String for single chars
        StringBuilder sb3 = new StringBuilder(10000);
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            sb3.append("a"); // String of length 1
        }
        end = System.nanoTime();
        System.out.println("\nappend(\"a\"): " + (end - start) / 1_000_000 + " ms");
        
        sb3.setLength(0);
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            sb3.append('a'); // char literal
        }
        end = System.nanoTime();
        System.out.println("append('a'): " + (end - start) / 1_000_000 + " ms");
        
        // 4. String.join vs manual loop
        String[] words = new String[1000];
        for (int i = 0; i < words.length; i++) words[i] = "word" + i;
        
        start = System.nanoTime();
        String joined = String.join(", ", words);
        end = System.nanoTime();
        System.out.println("\nString.join(): " + (end - start) / 1_000_000 + " ms");
        
        start = System.nanoTime();
        StringBuilder sbManual = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            if (i > 0) sbManual.append(", ");
            sbManual.append(words[i]);
        }
        String manual = sbManual.toString();
        end = System.nanoTime();
        System.out.println("Manual StringBuilder loop: " + (end - start) / 1_000_000 + " ms");
    }
}
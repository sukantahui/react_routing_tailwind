// topic11_files/StringPerformanceIssues.java
public class StringPerformanceIssues {
    public static void main(String[] args) {
        // 1. Bad: String concatenation in loop
        int iterations = 50000;
        long start = System.nanoTime();
        String result = "";
        for (int i = 0; i < iterations; i++) {
            result += "a";
        }
        long end = System.nanoTime();
        System.out.println("String + in loop: " + (end - start) / 1_000_000 + " ms");
        
        // 2. Good: StringBuilder in loop
        start = System.nanoTime();
        StringBuilder sb = new StringBuilder(iterations);
        for (int i = 0; i < iterations; i++) {
            sb.append("a");
        }
        String sbResult = sb.toString();
        end = System.nanoTime();
        System.out.println("StringBuilder loop: " + (end - start) / 1_000_000 + " ms");
        
        // 3. Unnecessary string conversions
        int number = 12345;
        start = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            String s = "" + number;  // slower
        }
        end = System.nanoTime();
        System.out.println("\"\" + int time: " + (end - start) / 1_000_000 + " ms");
        
        start = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            String s = Integer.toString(number); // faster
        }
        end = System.nanoTime();
        System.out.println("Integer.toString() time: " + (end - start) / 1_000_000 + " ms");
        
        // 4. Unnecessary toUpperCase/toLowerCase in loop
        String test = "Hello World";
        start = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            if (test.toLowerCase().equals("hello world")) { } // creates new string each time
        }
        end = System.nanoTime();
        System.out.println("\ntoLowerCase() in loop: " + (end - start) / 1_000_000 + " ms");
        
        start = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            if (test.equalsIgnoreCase("hello world")) { } // no new string
        }
        end = System.nanoTime();
        System.out.println("equalsIgnoreCase() in loop: " + (end - start) / 1_000_000 + " ms");
    }
}
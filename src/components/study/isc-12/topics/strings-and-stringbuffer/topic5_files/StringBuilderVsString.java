// topic5_files/StringBuilderVsString.java
public class StringBuilderVsString {
    public static void main(String[] args) {
        // Scenario: building a large string dynamically
        
        // Using String (bad)
        long start = System.currentTimeMillis();
        String str = "";
        for (int i = 0; i < 50000; i++) {
            str += "x";
        }
        long end = System.currentTimeMillis();
        System.out.println("String time: " + (end - start) + " ms");
        
        // Using StringBuilder (good)
        start = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder(50000);
        for (int i = 0; i < 50000; i++) {
            sb.append("x");
        }
        String result = sb.toString();
        end = System.currentTimeMillis();
        System.out.println("StringBuilder time: " + (end - start) + " ms");
        
        // Demonstrating capacity growth
        StringBuilder sb2 = new StringBuilder(); // default capacity 16
        System.out.println("\nInitial capacity: " + sb2.capacity());
        for (int i = 0; i < 20; i++) {
            sb2.append("a");
        }
        System.out.println("After 20 appends, capacity: " + sb2.capacity()); // grows
        
        // Pre-sizing to avoid resizing
        StringBuilder sb3 = new StringBuilder(1000);
        System.out.println("Pre-sized capacity: " + sb3.capacity());
        
        // StringBuilder methods
        StringBuilder sb4 = new StringBuilder("Hello");
        sb4.append(" World");
        sb4.insert(5, " Beautiful");
        System.out.println("\nAfter insert: " + sb4);
        sb4.delete(5, 15);
        System.out.println("After delete: " + sb4);
        sb4.reverse();
        System.out.println("After reverse: " + sb4);
    }
}
// topic1_files/StringPoolDemo.java
public class StringPoolDemo {
    public static void main(String[] args) {
        // Demonstrate pooling
        String s1 = "Naihati";
        String s2 = "Naihati";
        System.out.println("s1 == s2: " + (s1 == s2)); // true
        
        // Force a new object but then intern it
        String s3 = new String("Naihati");
        String s4 = s3.intern();
        
        System.out.println("s1 == s3: " + (s1 == s3)); // false
        System.out.println("s1 == s4: " + (s1 == s4)); // true (after intern)
        
        // Pitfall: don't use new unnecessarily
        String bad = new String("Shyamnagar"); // wasteful
        String good = "Shyamnagar"; // preferred
        
        // Example with student names
        String student1 = "Debangshu";
        String student2 = new String("Debangshu");
        
        if (student1.equals(student2)) {
            System.out.println("Same name content, but different objects.");
        }
        
        // Avoid creating many duplicate strings in loops
        long start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            String temp = new String("loop"); // BAD
        }
        long end = System.nanoTime();
        System.out.println("Time with new: " + (end - start) + " ns");
        
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            String temp = "loop"; // GOOD
        }
        end = System.nanoTime();
        System.out.println("Time with literal: " + (end - start) + " ns");
    }
}
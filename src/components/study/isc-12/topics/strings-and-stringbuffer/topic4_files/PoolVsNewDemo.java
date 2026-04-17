// topic4_files/PoolVsNewDemo.java
public class PoolVsNewDemo {
    public static void main(String[] args) {
        // Demonstrating why == is unreliable
        
        String a = "Ichapur";
        String b = "Ichapur";
        String c = new String("Ichapur");
        String d = new String("Ichapur");
        
        System.out.println("All strings have content: 'Ichapur'");
        System.out.println("a == b: " + (a == b));     // true (pooled)
        System.out.println("a == c: " + (a == c));     // false (different objects)
        System.out.println("c == d: " + (c == d));     // false (different objects)
        System.out.println("c.equals(d): " + c.equals(d)); // true (same content)
        
        // What happens when we intern?
        String e = c.intern();
        System.out.println("\nAfter interning c:");
        System.out.println("a == e: " + (a == e));     // true (now e points to pool)
        
        // Pitfall: assuming == works because of pooling
        String input1 = getStringFromUser(); // returns new String("Naihati")
        String input2 = getStringFromUser(); // returns new String("Naihati")
        
        // BAD: This will print false even though content is same
        if (input1 == input2) {
            System.out.println("Same object (BAD check)");
        } else {
            System.out.println("Different objects, but maybe same content");
        }
        
        // GOOD: Always use equals
        if (input1.equals(input2)) {
            System.out.println("Same content!");
        }
    }
    
    // Simulating user input (always creates new objects)
    static String getStringFromUser() {
        return new String("Naihati");
    }
}
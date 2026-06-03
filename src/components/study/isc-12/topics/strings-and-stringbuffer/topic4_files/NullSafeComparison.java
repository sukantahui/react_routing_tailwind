// topic4_files/NullSafeComparison.java
public class NullSafeComparison {
    public static void main(String[] args) {
        String s1 = null;
        String s2 = "Hello";
        String s3 = "Hello";
        
        // BAD: This will throw NullPointerException
        // System.out.println(s1.equals(s2));
        
        // GOOD: Constant first pattern
        System.out.println("\"Hello\".equals(s1): " + "Hello".equals(s1)); // false (no exception)
        System.out.println("\"Hello\".equals(s2): " + "Hello".equals(s2)); // true
        
        // GOOD: Using Objects.equals() (Java 7+)
        System.out.println("Objects.equals(s1, s2): " + java.util.Objects.equals(s1, s2)); // false
        System.out.println("Objects.equals(s2, s3): " + java.util.Objects.equals(s2, s3)); // true
        System.out.println("Objects.equals(s1, null): " + java.util.Objects.equals(s1, null)); // true
        
        // Handling user input safely
        String userInput = null; // imagine from some API
        if ("yes".equals(userInput)) {
            System.out.println("User said yes");
        } else {
            System.out.println("User did not say yes (null or other)");
        }
        
        // Normalizing before comparison
        String rawInput = "  YES  ";
        String normalized = rawInput.trim().toLowerCase();
        if ("yes".equals(normalized)) {
            System.out.println("Confirmed!");
        }
    }
}

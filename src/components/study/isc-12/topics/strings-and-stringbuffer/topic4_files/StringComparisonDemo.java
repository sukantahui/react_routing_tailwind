// topic4_files/StringComparisonDemo.java
public class StringComparisonDemo {
    public static void main(String[] args) {
        // Different ways to create strings
        String literal1 = "Barrackpore";
        String literal2 = "Barrackpore";
        String newString1 = new String("Barrackpore");
        String newString2 = new String("Barrackpore");
        
        // Reference equality (==)
        System.out.println("=== Reference Equality (==) ===");
        System.out.println("literal1 == literal2: " + (literal1 == literal2)); // true (same pool object)
        System.out.println("literal1 == newString1: " + (literal1 == newString1)); // false
        System.out.println("newString1 == newString2: " + (newString1 == newString2)); // false
        
        // Content equality (.equals())
        System.out.println("\n=== Content Equality (.equals()) ===");
        System.out.println("literal1.equals(literal2): " + literal1.equals(literal2)); // true
        System.out.println("literal1.equals(newString1): " + literal1.equals(newString1)); // true
        System.out.println("newString1.equals(newString2): " + newString1.equals(newString2)); // true
        
        // equalsIgnoreCase()
        System.out.println("\n=== Case-Insensitive ===");
        String upper = "BARRACKPORE";
        System.out.println("literal1.equals(upper): " + literal1.equals(upper)); // false
        System.out.println("literal1.equalsIgnoreCase(upper): " + literal1.equalsIgnoreCase(upper)); // true
        
        // Real-world scenario: user login
        String storedUsername = "Swadeep";
        String inputUsername = "swadeep";
        
        if (storedUsername.equals(inputUsername)) {
            System.out.println("\nLogin successful (case-sensitive)");
        } else if (storedUsername.equalsIgnoreCase(inputUsername)) {
            System.out.println("\nLogin successful (case-insensitive match)");
        } else {
            System.out.println("\nLogin failed");
        }
    }
}
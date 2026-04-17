// topic1_files/LiteralVsNewDemo.java
public class LiteralVsNewDemo {
    public static void main(String[] args) {
        // Using literals
        String city1 = "Ichapur";
        String city2 = "Ichapur";
        
        // Using new keyword
        String city3 = new String("Ichapur");
        String city4 = new String("Ichapur");
        
        // Reference equality (==)
        System.out.println("city1 == city2: " + (city1 == city2)); // true (same pool object)
        System.out.println("city1 == city3: " + (city1 == city3)); // false (different objects)
        System.out.println("city3 == city4: " + (city3 == city4)); // false (each new creates distinct object)
        
        // Content equality (equals)
        System.out.println("city1.equals(city3): " + city1.equals(city3)); // true
        System.out.println("city3.equals(city4): " + city3.equals(city4)); // true
        
        // Memory hint
        System.out.println("\nTip: city1 and city2 share the same object in String Pool.");
        System.out.println("city3 and city4 are separate heap objects, wasting memory.");
    }
}
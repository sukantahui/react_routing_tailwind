// topic2_files/ImmutabilityDemo.java
public class ImmutabilityDemo {
    public static void main(String[] args) {
        // Create a string
        String greeting = "Hello";
        System.out.println("Original: " + greeting);
        
        // Try to change it to uppercase (but don't assign)
        greeting.toUpperCase();
        System.out.println("After toUpperCase() without assignment: " + greeting);
        // Still "Hello" - unchanged!
        
        // Correct way: assign the result
        String loudGreeting = greeting.toUpperCase();
        System.out.println("Assigned result: " + loudGreeting);
        System.out.println("Original still: " + greeting);
        
        // Another example: replace
        String sentence = "Java is fun";
        sentence.replace("fun", "awesome");
        System.out.println("\nAfter replace without assignment: " + sentence);
        
        String better = sentence.replace("fun", "awesome");
        System.out.println("Assigned result: " + better);
        
        // Concatenation creates new objects
        String name = "Swadeep";
        String nameWithCity = name.concat(" from Barrackpore");
        System.out.println("\nOriginal name: " + name);
        System.out.println("New string: " + nameWithCity);
        
        // Proving immutability with ==
        String a = "Ichapur";
        String b = a;
        System.out.println("\na == b before 'modification': " + (a == b));
        a = a + " city";
        System.out.println("After a = a + ' city'");
        System.out.println("a: " + a);
        System.out.println("b: " + b);
        System.out.println("a == b: " + (a == b)); // false: different objects
    }
}
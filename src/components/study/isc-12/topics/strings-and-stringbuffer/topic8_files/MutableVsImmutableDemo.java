// topic8_files/MutableVsImmutableDemo.java
public class MutableVsImmutableDemo {
    public static void main(String[] args) {
        // Immutable: String
        String str = "Hello";
        System.out.println("Original String: " + str);
        str.concat(" World");   // returns new string, ignored
        System.out.println("After concat without assignment: " + str);
        str = str.concat(" World"); // assign result
        System.out.println("After concat with assignment: " + str);
        
        // Mutable: StringBuilder
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("\nOriginal StringBuilder: " + sb);
        sb.append(" World");    // modifies same object
        System.out.println("After append: " + sb);
        
        // Mutable: StringBuffer (thread‑safe)
        StringBuffer sbf = new StringBuffer("Hello");
        sbf.append(" World");
        System.out.println("\nStringBuffer: " + sbf);
        
        // Show object identity
        System.out.println("\n=== Object Identity ===");
        String a = "Hi";
        String b = a;
        System.out.println("Before change: a == b? " + (a == b));
        a = a + "!";
        System.out.println("After change: a = " + a + ", b = " + b);
        System.out.println("a == b? " + (a == b) + " (different objects)");
        
        StringBuilder sb1 = new StringBuilder("Hi");
        StringBuilder sb2 = sb1;
        System.out.println("\nBefore change: sb1 == sb2? " + (sb1 == sb2));
        sb1.append("!");
        System.out.println("After change: sb1 = " + sb1 + ", sb2 = " + sb2);
        System.out.println("sb1 == sb2? " + (sb1 == sb2) + " (same object)");
    }
}
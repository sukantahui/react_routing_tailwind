// topic10_files/ComparisonDemo.java
public class ComparisonDemo {
    public static void main(String[] args) {
        // String (immutable)
        String str = "Hello";
        System.out.println("Original String: " + str);
        str.concat(" World");
        System.out.println("After concat without assignment: " + str);
        str = str.concat(" World");
        System.out.println("After concat with assignment: " + str);
        
        // StringBuffer (mutable, thread-safe)
        StringBuffer sbf = new StringBuffer("Hello");
        System.out.println("\nOriginal StringBuffer: " + sbf);
        sbf.append(" World");
        System.out.println("After append: " + sbf);
        
        // StringBuilder (mutable, not thread-safe)
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("\nOriginal StringBuilder: " + sb);
        sb.append(" World");
        System.out.println("After append: " + sb);
        
        // Demonstrate object identity
        String a = "Hi";
        String b = a;
        System.out.println("\nString before change: a==b? " + (a == b));
        a = a + "!";
        System.out.println("After change: a=" + a + ", b=" + b);
        System.out.println("a==b? " + (a == b) + " (different objects)");
        
        StringBuilder sb1 = new StringBuilder("Hi");
        StringBuilder sb2 = sb1;
        System.out.println("\nStringBuilder before change: sb1==sb2? " + (sb1 == sb2));
        sb1.append("!");
        System.out.println("After change: sb1=" + sb1 + ", sb2=" + sb2);
        System.out.println("sb1==sb2? " + (sb1 == sb2) + " (same object)");
    }
}
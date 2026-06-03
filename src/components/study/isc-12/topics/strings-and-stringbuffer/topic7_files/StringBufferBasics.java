// topic7_files/StringBufferBasics.java
public class StringBufferBasics {
    public static void main(String[] args) {
        // Different constructors
        StringBuffer empty = new StringBuffer();
        System.out.println("Empty buffer capacity: " + empty.capacity()); // 16
        
        StringBuffer withCapacity = new StringBuffer(50);
        System.out.println("Custom capacity: " + withCapacity.capacity()); // 50
        
        StringBuffer withString = new StringBuffer("Swadeep");
        System.out.println("Buffer with string: " + withString);
        System.out.println("Length: " + withString.length());
        System.out.println("Capacity: " + withString.capacity()); // length + 16
        
        // Appending
        withString.append(" from Barrackpore");
        System.out.println("\nAfter append: " + withString);
        
        // Inserting
        withString.insert(0, "Student: ");
        System.out.println("After insert: " + withString);
        
        // Deleting
        withString.delete(0, 9); // remove "Student: "
        System.out.println("After delete: " + withString);
        
        // Reversing
        withString.reverse();
        System.out.println("After reverse: " + withString);
        withString.reverse(); // back to original
        
        // Convert to String
        String immutable = withString.toString();
        System.out.println("As String: " + immutable);
    }
}
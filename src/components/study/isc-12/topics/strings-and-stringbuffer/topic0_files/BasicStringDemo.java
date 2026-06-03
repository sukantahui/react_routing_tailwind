// topic0_files/BasicStringDemo.java
public class BasicStringDemo {
    public static void main(String[] args) {
        // Creating a simple string literal
        String studentName = "Swadeep";
        
        // length() - number of characters
        int nameLength = studentName.length();
        System.out.println("Name: " + studentName);
        System.out.println("Length: " + nameLength);
        
        // charAt() - character at specific index
        char firstChar = studentName.charAt(0);
        char lastChar = studentName.charAt(studentName.length() - 1);
        System.out.println("First character: " + firstChar);
        System.out.println("Last character: " + lastChar);
        
        // Immutability demo: toUpperCase does NOT change original
        String upperName = studentName.toUpperCase();
        System.out.println("Original after toUpperCase: " + studentName); // unchanged
        System.out.println("Uppercase version: " + upperName);
    }
}
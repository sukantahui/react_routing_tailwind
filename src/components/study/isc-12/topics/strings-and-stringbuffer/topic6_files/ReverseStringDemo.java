// topic6_files/ReverseStringDemo.java
public class ReverseStringDemo {
    public static void main(String[] args) {
        String original = "Swadeep";
        
        // Method 1: StringBuilder
        String reversed1 = new StringBuilder(original).reverse().toString();
        System.out.println("Using StringBuilder: " + reversed1);
        
        // Method 2: char array
        char[] chars = original.toCharArray();
        for (int i = 0, j = chars.length - 1; i < j; i++, j--) {
            char temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;
        }
        String reversed2 = new String(chars);
        System.out.println("Using char array: " + reversed2);
        
        // Method 3: recursion (for learning)
        System.out.println("Using recursion: " + reverseRecursive(original));
        
        // Edge cases
        System.out.println("Empty string: '" + reverseString("") + "'");
        System.out.println("Null string: " + reverseString(null));
        System.out.println("Single char: '" + reverseString("A") + "'");
    }
    
    public static String reverseString(String str) {
        if (str == null) return null;
        return new StringBuilder(str).reverse().toString();
    }
    
    public static String reverseRecursive(String str) {
        if (str == null || str.length() <= 1) return str;
        return reverseRecursive(str.substring(1)) + str.charAt(0);
    }
}
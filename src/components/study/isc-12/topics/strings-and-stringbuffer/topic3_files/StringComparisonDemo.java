// topic3_files/StringComparisonDemo.java
public class StringComparisonDemo {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "hello";
        String s3 = "Hello";
        
        // equals() – case-sensitive
        System.out.println("equals():");
        System.out.println("s1.equals(s2): " + s1.equals(s2)); // false
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true
        
        // equalsIgnoreCase()
        System.out.println("\nequalsIgnoreCase():");
        System.out.println("s1.equalsIgnoreCase(s2): " + s1.equalsIgnoreCase(s2)); // true
        
        // compareTo() – lexicographic
        System.out.println("\ncompareTo():");
        System.out.println("s1.compareTo(s2): " + s1.compareTo(s2)); // negative (H < h in ASCII)
        System.out.println("s1.compareTo(s3): " + s1.compareTo(s3)); // 0
        System.out.println("s2.compareTo(s1): " + s2.compareTo(s1)); // positive
        
        // compareToIgnoreCase()
        System.out.println("\ncompareToIgnoreCase():");
        System.out.println("s1.compareToIgnoreCase(s2): " + s1.compareToIgnoreCase(s2)); // 0
        
        // Real-world example: sorting student names
        String[] students = {"Debangshu", "Abhronila", "Swadeep", "Tuhina"};
        System.out.println("\nBefore sorting: " + java.util.Arrays.toString(students));
        java.util.Arrays.sort(students);
        System.out.println("After sorting: " + java.util.Arrays.toString(students));
    }
}
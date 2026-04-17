// topic3_files/StringMethodsDemo.java
public class StringMethodsDemo {
    public static void main(String[] args) {
        String text = "  Java Programming  ";
        
        // Inspection
        System.out.println("Original: \"" + text + "\"");
        System.out.println("length(): " + text.length());
        System.out.println("charAt(5): " + text.charAt(5)); // 'P'
        System.out.println("isEmpty(): " + text.isEmpty());
        System.out.println("isBlank(): " + text.isBlank()); // false (has non-whitespace)
        System.out.println("contains(\"gram\"): " + text.contains("gram"));
        System.out.println("startsWith(\"  Ja\"): " + text.startsWith("  Ja"));
        System.out.println("indexOf('a'): " + text.indexOf('a'));
        System.out.println("lastIndexOf('a'): " + text.lastIndexOf('a'));
        
        // Extraction
        System.out.println("\nsubstring(2,6): \"" + text.substring(2,6) + "\"");
        System.out.println("substring(5): \"" + text.substring(5) + "\"");
        String[] words = text.trim().split(" ");
        System.out.print("split(\" \"): ");
        for (String w : words) System.out.print("[" + w + "] ");
        
        // Transformation
        System.out.println("\n\ntoUpperCase(): \"" + text.toUpperCase() + "\"");
        System.out.println("toLowerCase(): \"" + text.toLowerCase() + "\"");
        System.out.println("trim(): \"" + text.trim() + "\"");
        System.out.println("replace('a', '@'): \"" + text.replace('a', '@') + "\"");
        System.out.println("replace(\"Java\", \"Python\"): \"" + text.replace("Java", "Python") + "\"");
        
        // Immutability proof
        System.out.println("\nOriginal after all operations: \"" + text + "\" (unchanged)");
    }
}
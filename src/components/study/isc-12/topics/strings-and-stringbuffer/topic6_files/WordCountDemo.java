// topic6_files/WordCountDemo.java
public class WordCountDemo {
    public static void main(String[] args) {
        String[] sentences = {
            "The quick brown fox jumps over the lazy dog",
            "  Hello   world  ",
            "One",
            "",
            "   ",
            "Java is fun, isn't it?",
            null
        };
        
        for (String sentence : sentences) {
            System.out.println("Words in \"" + sentence + "\": " + countWords(sentence));
        }
        
        // More robust: handling punctuation as word separators
        String text = "Hello, world! How are you?";
        System.out.println("\nOriginal: \"" + text + "\"");
        System.out.println("Word count (split on whitespace): " + countWords(text));
        System.out.println("Word count (split on non-letters): " + countWordsAdvanced(text));
    }
    
    // Basic: split on whitespace
    public static int countWords(String str) {
        if (str == null || str.trim().isEmpty()) return 0;
        return str.trim().split("\\s+").length;
    }
    
    // Advanced: split on any non-letter/digit (punctuation as delimiters)
    public static int countWordsAdvanced(String str) {
        if (str == null || str.trim().isEmpty()) return 0;
        String[] words = str.split("[^a-zA-Z0-9']+"); // keeps apostrophes
        int count = 0;
        for (String w : words) {
            if (!w.isEmpty()) count++;
        }
        return count;
    }
}
// topic6_files/CharFrequencyDemo.java
import java.util.HashMap;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;

public class CharFrequencyDemo {
    public static void main(String[] args) {
        String text = "Swadeep Mukherjee";
        
        System.out.println("Character frequency for: " + text);
        Map<Character, Integer> freq = getFrequency(text);
        for (Map.Entry<Character, Integer> entry : freq.entrySet()) {
            System.out.println("'" + entry.getKey() + "' : " + entry.getValue());
        }
        
        // Using int array for ASCII (more efficient)
        System.out.println("\nUsing int[] for ASCII:");
        int[] asciiFreq = getFrequencyAscii(text);
        for (int i = 0; i < asciiFreq.length; i++) {
            if (asciiFreq[i] > 0) {
                System.out.println("'" + (char) i + "' : " + asciiFreq[i]);
            }
        }
        
        // Java 8 streams
        System.out.println("\nUsing Java 8 streams:");
        Map<Character, Long> streamFreq = text.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.groupingBy(c -> c, Collectors.counting()));
        streamFreq.forEach((k, v) -> System.out.println("'" + k + "' : " + v));
        
        // Find most frequent character
        char mostFrequent = getMostFrequentChar(text);
        System.out.println("\nMost frequent character: '" + mostFrequent + "'");
    }
    
    // Using HashMap (supports all Unicode)
    public static Map<Character, Integer> getFrequency(String str) {
        if (str == null) return new HashMap<>();
        Map<Character, Integer> freq = new LinkedHashMap<>(); // LinkedHashMap preserves order
        for (char c : str.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        return freq;
    }
    
    // Using int[] for ASCII (0-255) - faster
    public static int[] getFrequencyAscii(String str) {
        if (str == null) return new int[256];
        int[] freq = new int[256];
        for (char c : str.toCharArray()) {
            if (c < 256) freq[c]++;
        }
        return freq;
    }
    
    // Find most frequent character
    public static char getMostFrequentChar(String str) {
        if (str == null || str.isEmpty()) return '\0';
        Map<Character, Integer> freq = getFrequency(str);
        char maxChar = '\0';
        int maxCount = 0;
        for (Map.Entry<Character, Integer> entry : freq.entrySet()) {
            if (entry.getValue() > maxCount) {
                maxCount = entry.getValue();
                maxChar = entry.getKey();
            }
        }
        return maxChar;
    }
}
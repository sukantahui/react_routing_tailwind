// topic6_files/PalindromeDemo.java
public class PalindromeDemo {
    public static void main(String[] args) {
        String[] testCases = {
            "radar",
            "level",
            "A man, a plan, a canal: Panama",
            "race a car",
            "hello",
            "12321",
            ""
        };
        
        for (String test : testCases) {
            System.out.println("\"" + test + "\" is palindrome? " + isPalindrome(test));
            System.out.println("   (ignoring case & non-alphanumeric): " + isPalindromeNormalized(test));
        }
        
        // Two-pointer technique demonstration
        String str = "madam";
        System.out.println("\nTwo-pointer check on \"" + str + "\": " + isPalindromeTwoPointer(str));
    }
    
    // Simple: compare with reverse
    public static boolean isPalindrome(String str) {
        if (str == null) return false;
        String reversed = new StringBuilder(str).reverse().toString();
        return str.equals(reversed);
    }
    
    // Normalized: ignore case and non-letters/digits
    public static boolean isPalindromeNormalized(String str) {
        if (str == null) return false;
        String clean = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        return clean.equals(new StringBuilder(clean).reverse().toString());
    }
    
    // Two-pointer (in-place, no extra string for reversed)
    public static boolean isPalindromeTwoPointer(String str) {
        if (str == null) return false;
        int left = 0, right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
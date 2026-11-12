/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 23: String to Array and Array to String Conversion
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringArrayConversionDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    STRING TO ARRAY & ARRAY TO STRING (ICSE)      ");
        System.out.println("==================================================");

        String original = "BARRACKPORE";

        // 1. String to char[] array: toCharArray()
        char[] charArr = original.toCharArray();
        System.out.println("[1] Converted to char[] array:");
        System.out.println("    Array Length: " + charArr.length);
        System.out.print("    Elements: ");
        for (char c : charArr) {
            System.out.print(c + " ");
        }
        System.out.println();

        // 2. Sorting characters of a word (Classic ICSE Board Problem)
        // Bubble sort on char array
        for (int i = 0; i < charArr.length - 1; i++) {
            for (int j = 0; j < charArr.length - 1 - i; j++) {
                if (charArr[j] > charArr[j + 1]) {
                    char temp = charArr[j];
                    charArr[j] = charArr[j + 1];
                    charArr[j + 1] = temp;
                }
            }
        }

        // 3. char[] back to String
        // Method A: new String(charArr)
        String sortedA = new String(charArr);
        // Method B: String.valueOf(charArr)
        String sortedB = String.valueOf(charArr);

        System.out.println("\n[2] Sorted Word Reconstructed from char[]:");
        System.out.println("    new String(charArr)     : " + sortedA);
        System.out.println("    String.valueOf(charArr) : " + sortedB);

        System.out.println("==================================================");
    }
}
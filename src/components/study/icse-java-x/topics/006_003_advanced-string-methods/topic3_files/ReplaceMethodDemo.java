/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_003: Advanced String Methods
 * Topic 3: replace() Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class ReplaceMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          REPLACE() METHOD IN JAVA (ICSE)         ");
        System.out.println("==================================================");

        String original = "MALAYALAM";
        System.out.println("Original String: " + original);

        // 1. Replace char occurrences
        String replacedA = original.replace('A', 'O');
        System.out.println("original.replace('A', 'O'): " + replacedA); // MOLOYOLOM

        // 2. Replace does not modify original
        System.out.println("Original remains intact   : " + original);

        // 3. If oldChar not present, returns exact same reference
        String unchanged = original.replace('Z', 'X');
        System.out.println("original.replace('Z', 'X'): " + unchanged);
        System.out.println("unchanged == original     : " + (unchanged == original)); // true

        // 4. Sequence replacement (word replacement)
        String sentence = "I study at Barrackpore. Barrackpore is historic.";
        String updated = sentence.replace("Barrackpore", "Shyamnagar");
        System.out.println("\nSentence: " + sentence);
        System.out.println("Updated : " + updated);

        // 5. Replace spaces with hyphens
        String phone = "91 7003 7568 60";
        System.out.println("\nCleaned phone: " + phone.replace(' ', '-'));
    }
}

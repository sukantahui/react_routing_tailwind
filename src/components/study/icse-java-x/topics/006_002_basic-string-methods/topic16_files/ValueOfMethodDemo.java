// ValueOfMethodDemo.java
// ICSE Class X: String.valueOf() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class ValueOfMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: String.valueOf() ===");
        
        int roll = 101;
        double marks = 98.75;
        boolean passed = true;
        char[] letters = {'I', 'C', 'S', 'E'};
        
        // 1. Primitive conversions
        String sRoll = String.valueOf(roll);
        String sMarks = String.valueOf(marks);
        String sPassed = String.valueOf(passed);
        String sLetters = String.valueOf(letters);
        
        System.out.println("sRoll (length " + sRoll.length() + "): " + sRoll);
        System.out.println("sMarks (length " + sMarks.length() + "): " + sMarks);
        System.out.println("sPassed: " + sPassed);
        System.out.println("sLetters from char[]: " + sLetters);
        
        // 2. Reversing an integer using String.valueOf
        int number = 7469;
        String numStr = String.valueOf(number);
        String rev = "";
        for (int i = numStr.length() - 1; i >= 0; i--) {
            rev += numStr.charAt(i);
        }
        System.out.println("Reverse of " + number + " is: " + rev);
        
        // 3. Null safety: valueOf vs toString
        Object nullObj = null;
        System.out.println("String.valueOf(nullObj): " + String.valueOf(nullObj)); // "null"
    }
}
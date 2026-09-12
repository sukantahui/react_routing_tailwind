/**
 * ============================================================================
 * ICSE CLASS X COMPUTER APPLICATIONS - 10-YEAR BOARD PATTERN MASTER
 * ============================================================================
 * Educator: Sukanta Hui | Barrackpore, Kolkata
 * Institute: Coder & AccoTax
 * 
 * This class consolidates the top recurring program archetypes that have
 * appeared in CISCE ICSE Class 10 Board Examinations over the past 10 years:
 * 1. Slab-rate Commercial Class Design (Electric / Cinema / Book Fair)
 * 2. High-Yield String Handling (Piglatin Word Transformation)
 * 3. 1D Array Bubble Sort Algorithm (Ascending Numerical Order)
 * 4. Special Number Verification (Automorphic & Krishnamurthy/Special Number)
 * ============================================================================
 */

import java.util.Scanner;

public class BoardTenYearPatternMasterDemo {

    // ------------------------------------------------------------------------
    // ARCHETYPE 1: PIGLATIN STRING TRANSFORMATION (Repeated in 2015, 2018, 2023)
    // ------------------------------------------------------------------------
    public static String toPiglatin(String word) {
        word = word.trim().toUpperCase();
        int vowelIndex = -1;
        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if (ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
                vowelIndex = i;
                break;
            }
        }
        if (vowelIndex == -1) {
            return word + "AY";
        }
        return word.substring(vowelIndex) + word.substring(0, vowelIndex) + "AY";
    }

    // ------------------------------------------------------------------------
    // ARCHETYPE 2: BUBBLE SORT ON 1D NUMERIC ARRAY (Repeated in 2014, 2017, 2021)
    // ------------------------------------------------------------------------
    public static void bubbleSortAscending(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // ------------------------------------------------------------------------
    // ARCHETYPE 3: SPECIAL / KRISHNAMURTHY NUMBER CHECK (Repeated 2016, 2020, 2024)
    // Sum of factorials of each digit equals the number itself (e.g. 145 = 1! + 4! + 5!)
    // ------------------------------------------------------------------------
    public static boolean isSpecialNumber(int num) {
        int temp = num;
        int sumOfFactorials = 0;
        while (temp > 0) {
            int digit = temp % 10;
            // Compute factorial of digit
            int fact = 1;
            for (int f = 1; f <= digit; f++) {
                fact *= f;
            }
            sumOfFactorials += fact;
            temp /= 10;
        }
        return sumOfFactorials == num;
    }

    // ------------------------------------------------------------------------
    // ARCHETYPE 4: AUTOMORPHIC NUMBER CHECK (Repeated in 2019, 2022)
    // A number whose square ends in the number itself (e.g. 25^2 = 625 -> ends in 25)
    // ------------------------------------------------------------------------
    public static boolean isAutomorphic(int num) {
        long square = (long) num * num;
        int temp = num;
        long divisor = 1;
        while (temp > 0) {
            divisor *= 10;
            temp /= 10;
        }
        return (square % divisor) == num;
    }

    // ------------------------------------------------------------------------
    // MAIN DEMONSTRATION HARNESS
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println(" ICSE CLASS X - 10-YEAR BOARD PATTERN HARNESS     ");
        System.out.println("==================================================");

        // 1. Test Piglatin
        String sampleWord = "TROUBLE";
        System.out.println("1. Piglatin Transformation:");
        System.out.println("   Original: " + sampleWord);
        System.out.println("   Piglatin: " + toPiglatin(sampleWord));

        // 2. Test Bubble Sort
        int[] scores = { 85, 42, 99, 12, 77, 56, 30, 91 };
        System.out.println("\n2. Bubble Sort (Ascending):");
        System.out.print("   Before: ");
        for (int v : scores) System.out.print(v + " ");
        bubbleSortAscending(scores);
        System.out.print("\n   After : ");
        for (int v : scores) System.out.print(v + " ");
        System.out.println();

        // 3. Test Special Number (145)
        int testNum1 = 145;
        System.out.println("\n3. Krishnamurthy / Special Number Check:");
        System.out.println("   " + testNum1 + " is Special: " + isSpecialNumber(testNum1));

        // 4. Test Automorphic Number (25, 76)
        int testNum2 = 25;
        System.out.println("\n4. Automorphic Number Check:");
        System.out.println("   " + testNum2 + " is Automorphic: " + isAutomorphic(testNum2) + " (Square = " + (testNum2 * testNum2) + ")");
        System.out.println("==================================================");
    }
}

/**
 * File: ModulusOperatorDeepDiveDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 3)
 * Description: Deep dive into the Java modulus (%) operator with positive, negative,
 *              and floating-point numbers, circular ring buffers, hash bucket indexing,
 *              unit conversions (hours/minutes, Indian Rupee paise), and batch scheduling.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class ModulusOperatorDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 3 MODULUS OPERATOR DEEP DIVE (%)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Full Sign Truth Matrix (The Dividend Sign Invariant)
        System.out.println("--- 1. FULL SIGN TRUTH MATRIX (a % b = a - (a / b) * b) ---");
        int[][] testPairs = {
                {15, 4},
                {-15, 4},
                {15, -4},
                {-15, -4}
        };

        for (int[] pair : testPairs) {
            int a = pair[0];
            int b = pair[1];
            int rem = a % b;
            System.out.printf(" %3d %% %3d  =  %2d | (Formula: %d - (%d * %d) = %d)%n",
                    a, b, rem, a, (a / b), b, rem);
        }
        System.out.println("Observation: The sign of the result matches the dividend 'a' in ALL 4 cases.\n");

        // 2. Floating-Point Modulus with Precision Analysis
        System.out.println("--- 2. FLOATING-POINT MODULUS & IEEE 754 PRECISION ---");
        double fDividend = 14.75;
        double fDivisor = 4.50;
        double fResult = fDividend % fDivisor; // 14.75 - (3 * 4.50) = 14.75 - 13.50 = 1.25

        System.out.printf("%.2f %% %.2f = %.2f (Exact remainder)%n", fDividend, fDivisor, fResult);
        System.out.printf("5.5 %% 2.0   = %.2f%n", (5.5 % 2.0));
        System.out.printf("10.0 %% 0.0  = %f (Floating division by zero remainder is NaN!)%n%n", (10.0 % 0.0));

        // 3. Time & Currency Unit Conversion Algorithms
        System.out.println("--- 3. UNIT CONVERSIONS: TIME & INDIAN RUPEE (₹) PAISE ---");
        int totalMinutes = 345;
        int hours = totalMinutes / 60;
        int remainingMinutes = totalMinutes % 60;
        System.out.printf("Total Minutes: %d mins &rarr; %d Hours and %d Minutes%n",
                totalMinutes, hours, remainingMinutes);

        long totalPaise = 1875075L; // ₹18,750.75
        long rupees = totalPaise / 100;
        long paise = totalPaise % 100;
        System.out.printf("Total Paise: %d paise &rarr; ₹%,d and %02d Paise%n%n",
                totalPaise, rupees, paise);

        // 4. Circular Buffer Indexing (Ring Buffers & Carousels)
        System.out.println("--- 4. CIRCULAR BUFFER WRAP-AROUND INDEXING ---");
        String[] labRooms = {"Lab 1 (Barrackpore)", "Lab 2 (Naihati)", "Lab 3 (Shyamnagar)", "Lab 4 (Ichapur)"};
        int bufferSize = labRooms.length;

        System.out.println("Simulating 8 sequential student workstation allocations:");
        for (int i = 0; i < 8; i++) {
            int targetIndex = i % bufferSize;
            System.out.printf(" Student #%d -> Assigned: %s (Index: %d)%n", (i + 1), labRooms[targetIndex], targetIndex);
        }

        // 5. Production-Safe Hash Bucket Indexing
        System.out.println("\n--- 5. PRODUCTION-SAFE HASH BUCKET INDEXING ---");
        String testKey = "SwadeepHui";
        int numBuckets = 16;

        // INSECURE: Math.abs(Integer.MIN_VALUE) remains negative!
        // PRODUCTION SAFE IDIOM: Bitwise mask (hash & 0x7FFFFFFF) % numBuckets:
        int hashCode = testKey.hashCode();
        int safeBucketIndex = (hashCode & 0x7FFFFFFF) % numBuckets;

        System.out.printf("Key: \"%s\" | HashCode: %d | Safe Bucket [0..%d]: %d%n",
                testKey, hashCode, (numBuckets - 1), safeBucketIndex);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. a % b sign is 100% determined by dividend 'a'.");
        System.out.println("2. Java supports native floating-point modulus (e.g. 14.75 % 4.5 = 1.25).");
        System.out.println("3. Modulus is the standard engine for circular arrays, clock time, and currency units.");
        System.out.println("4. For hash indexing, use '(hash & 0x7FFFFFFF) % buckets' to avoid negative index traps.");
        System.out.println("================================================================================");
    }
}

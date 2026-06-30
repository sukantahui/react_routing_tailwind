/**
 * Simulates processing student records from Barrackpore to Naihati.
 * Two approaches: a simple O(n²) comparison vs an O(n log n) sort + scan.
 * Shows how algorithm choice affects runtime in practice.
 */
import java.util.Arrays;
import java.util.Random;

public class RealWorldImpact {
    public static void main(String[] args) {
        int numStudents = 50_000;  // 50k records
        String[] studentNames = generateNames(numStudents);
        String target = "Debangshu";

        // --- Approach 1: O(n) linear scan (best we can do for unsorted) ---
        long startLinear = System.nanoTime();
        boolean foundLinear = linearSearch(studentNames, target);
        long endLinear = System.nanoTime();
        long timeLinear = endLinear - startLinear;

        // --- Approach 2: O(n log n) sort + O(log n) binary search ---
        long startSort = System.nanoTime();
        Arrays.sort(studentNames);  // O(n log n)
        long endSort = System.nanoTime();
        long timeSort = endSort - startSort;

        long startBinary = System.nanoTime();
        boolean foundBinary = binarySearch(studentNames, target);
        long endBinary = System.nanoTime();
        long timeBinary = endBinary - startBinary;

        long totalTimeAdvanced = (endSort - startSort) + (endBinary - startBinary);

        System.out.println("Processing " + numStudents + " student records from Barrackpore to Naihati.");
        System.out.println("Linear search time: " + timeLinear / 1_000_000 + " ms");
        System.out.println("Sort + binary search time: " + totalTimeAdvanced / 1_000_000 + " ms");
        System.out.println("Advanced approach is " + (timeLinear / totalTimeAdvanced) + "x faster.");
        System.out.println("Found " + target + "? " + (foundLinear ? "Yes (linear)" : "No"));
        System.out.println("Found " + target + "? " + (foundBinary ? "Yes (binary)" : "No"));
    }

    static boolean linearSearch(String[] arr, String target) {
        for (String s : arr) {
            if (s.equals(target)) return true;
        }
        return false;
    }

    static boolean binarySearch(String[] arr, String target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            int cmp = arr[mid].compareTo(target);
            if (cmp == 0) return true;
            if (cmp < 0) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }

    static String[] generateNames(int count) {
        String[] names = {
            "Swadeep", "Tuhina", "Abhronila", "Susmita", "Debangshu",
            "Rahul", "Priya", "Amit", "Sneha", "Vikram", "Anjali"
        };
        Random rand = new Random(42);
        String[] result = new String[count];
        for (int i = 0; i < count; i++) {
            result[i] = names[rand.nextInt(names.length)] + "_" + i;
        }
        return result;
    }
}
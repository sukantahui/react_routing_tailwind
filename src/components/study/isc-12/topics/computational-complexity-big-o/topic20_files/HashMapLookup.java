import java.util.HashMap;
import java.util.Map;

/**
 * Demonstrates that HashMap operations (put, get) are O(1) on average.
 */
public class HashMapLookup {
    public static void main(String[] args) {
        // Test with different map sizes
        int[] sizes = {100, 1000, 10000, 100000};

        System.out.println("HashMap operations (O(1) average):");
        System.out.println("Size\t\tPut (ns)\tGet (ns)");

        for (int size : sizes) {
            Map<Integer, String> map = new HashMap<>();

            // Measure put time
            long start = System.nanoTime();
            for (int i = 0; i < size; i++) {
                map.put(i, "Value-" + i);
            }
            long end = System.nanoTime();
            long putTime = (end - start) / size; // average per put

            // Measure get time
            start = System.nanoTime();
            for (int i = 0; i < size; i++) {
                String value = map.get(i);
            }
            end = System.nanoTime();
            long getTime = (end - start) / size; // average per get

            System.out.println(size + "\t\t" + putTime + "\t\t" + getTime);
        }

        System.out.println("\nHashMap put and get are O(1) on average.");
        System.out.println("Note: In worst case (all collisions), it can degrade to O(n).");
    }
}
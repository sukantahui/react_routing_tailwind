/**
 * Demonstrates that array access by index is O(1) — constant time.
 * Regardless of array size or which index you access, time is constant.
 */
public class ArrayAccess {
    public static void main(String[] args) {
        // Test with different array sizes
        int[] sizes = {100, 10000, 1000000, 10000000};

        System.out.println("Array access time by index (O(1)):");
        System.out.println("Size\t\tTime (ns)\tIndex");

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with dummy data
            for (int i = 0; i < size; i++) arr[i] = i;

            // Access first element
            long start = System.nanoTime();
            int val1 = arr[0];
            long end = System.nanoTime();
            long time1 = end - start;

            // Access last element
            start = System.nanoTime();
            int val2 = arr[size - 1];
            end = System.nanoTime();
            long time2 = end - start;

            // Access middle element
            start = System.nanoTime();
            int val3 = arr[size / 2];
            end = System.nanoTime();
            long time3 = end - start;

            // Access random element
            int randomIndex = (int)(Math.random() * size);
            start = System.nanoTime();
            int val4 = arr[randomIndex];
            end = System.nanoTime();
            long time4 = end - start;

            System.out.println(size + "\t\t" + time1 + "\t\t0");
            System.out.println("\t\t" + time2 + "\t\t" + (size-1));
            System.out.println("\t\t" + time3 + "\t\t" + (size/2));
            System.out.println("\t\t" + time4 + "\t\trandom");
            System.out.println("---");
        }

        System.out.println("All accesses take approximately the same time (O(1)).");
    }
}
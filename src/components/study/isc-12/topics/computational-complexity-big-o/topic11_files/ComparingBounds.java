/**
 * Compares O, Ω, and Θ for several algorithms.
 */
public class ComparingBounds {
    public static void main(String[] args) {
        System.out.println("Algorithm\t\tO\tΩ\tΘ");
        System.out.println("----------------------------------------------");

        // Linear search
        System.out.println("Linear search\t\tO(n)\tΩ(1)\t— (no Θ overall)");

        // Binary search (best-case)
        System.out.println("Binary search (best)\tO(1)\tΩ(1)\tΘ(1) (for best case)");
        // Binary search (worst-case)
        System.out.println("Binary search (worst)\tO(log n)\tΩ(log n)\tΘ(log n) (for worst case)");

        // Array sum
        System.out.println("Array sum\t\tO(n)\tΩ(n)\tΘ(n)");

        // Nested loop
        System.out.println("Nested loop (n²)\tO(n²)\tΩ(n²)\tΘ(n²)");

        // Merge sort
        System.out.println("Merge sort\t\tO(n log n)\tΩ(n log n)\tΘ(n log n)");

        // Quicksort (average)
        System.out.println("Quicksort (avg)\tO(n log n)\tΩ(n log n)\tΘ(n log n) (avg)");

        // Bubble sort (optimized)
        System.out.println("Bubble sort (opt)\tO(n²)\tΩ(n)\t— (no Θ overall)");
    }
}
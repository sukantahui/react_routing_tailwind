import java.util.Arrays;
import java.util.Comparator;

public class BubbleSortDescendingWithCompare {
    
    // Generic bubble sort with comparator
    public static <T> void bubbleSort(T[] arr, Comparator<T> comp) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                // Use comparator to determine order
                if (comp.compare(arr[j], arr[j + 1]) < 0) {
                    T temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            if (!swapped) break;
        }
    }
    
    // Convenience methods
    public static void bubbleSortDescending(Integer[] arr) {
        bubbleSort(arr, Comparator.naturalOrder());
    }
    
    public static void bubbleSortDescending(String[] arr) {
        bubbleSort(arr, Comparator.naturalOrder());
    }
    
    public static void main(String[] args) {
        // Integer array
        Integer[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original numbers: " + Arrays.toString(numbers));
        bubbleSortDescending(numbers);
        System.out.println("Descending: " + Arrays.toString(numbers));
        
        // String array - names from Barrackpore
        String[] names = {"Swadeep", "Tuhina", "Abhronila", "Nandini", "Riddhiman", "Angshuman"};
        System.out.println("\nOriginal names: " + Arrays.toString(names));
        bubbleSortDescending(names);
        System.out.println("Descending alphabetical: " + Arrays.toString(names));
        
        // Using custom comparator for different order
        String[] cities = {"Barrackpore", "Shyamnagar", "Ichapur", "Naihati"};
        System.out.println("\nCities by length (descending):");
        System.out.println("Original: " + Arrays.toString(cities));
        bubbleSort(cities, (a, b) -> Integer.compare(b.length(), a.length()));
        System.out.println("By length desc: " + Arrays.toString(cities));
    }
}
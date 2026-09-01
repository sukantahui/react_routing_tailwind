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
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original numbers: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSortDescending(numbers);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Descending: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // String array - names from Barrackpore
        String[] names = {"Swadeep", "Tuhina", "Abhronila", "Nandini", "Riddhiman", "Angshuman"};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nOriginal names: " + "[");
        for (int i = 0; i < names.length; i++) {
            System.out.print(names[i] + (i < names.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSortDescending(names);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Descending alphabetical: " + "[");
        for (int i = 0; i < names.length; i++) {
            System.out.print(names[i] + (i < names.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Using custom comparator for different order
        String[] cities = {"Barrackpore", "Shyamnagar", "Ichapur", "Naihati"};
        System.out.println("\nCities by length (descending):");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original: " + "[");
        for (int i = 0; i < cities.length; i++) {
            System.out.print(cities[i] + (i < cities.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSort(cities, (a, b) -> Integer.compare(b.length(), a.length()));
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("By length desc: " + "[");
        for (int i = 0; i < cities.length; i++) {
            System.out.print(cities[i] + (i < cities.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}
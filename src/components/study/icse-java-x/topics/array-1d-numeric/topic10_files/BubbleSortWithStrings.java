import java.util.Arrays;

public class BubbleSortWithStrings {
    
    // Bubble sort for String arrays
    public static void bubbleSort(String[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                // compareTo returns negative if first < second
                if (arr[j].compareTo(arr[j + 1]) > 0) {
                    String temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            if (!swapped) break;
        }
    }
    
    // Bubble sort for arrays of any Comparable type
    public static <T extends Comparable<T>> void bubbleSortGeneric(T[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j].compareTo(arr[j + 1]) > 0) {
                    T temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            if (!swapped) break;
        }
    }
    
    public static void main(String[] args) {
        // Student names from Barrackpore school
        String[] students = {"Swadeep", "Tuhina", "Abhronila", "Nandini", "Riddhiman", "Angshuman"};
        
        System.out.println("Original names: " + Arrays.toString(students));
        bubbleSort(students);
        System.out.println("Sorted names: " + Arrays.toString(students));
        
        // City names
        String[] cities = {"Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata"};
        System.out.println("\nOriginal cities: " + Arrays.toString(cities));
        bubbleSort(cities);
        System.out.println("Sorted cities: " + Arrays.toString(cities));
        
        // Using generic version with Double
        Double[] scores = {78.5, 92.3, 67.8, 88.0, 95.5};
        System.out.println("\nOriginal scores: " + Arrays.toString(scores));
        bubbleSortGeneric(scores);
        System.out.println("Sorted scores: " + Arrays.toString(scores));
    }
}
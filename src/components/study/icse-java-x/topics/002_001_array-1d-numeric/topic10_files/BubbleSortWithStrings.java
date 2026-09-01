
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
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original names: " + "[");
        for (int i = 0; i < students.length; i++) {
            System.out.print(students[i] + (i < students.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSort(students);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted names: " + "[");
        for (int i = 0; i < students.length; i++) {
            System.out.print(students[i] + (i < students.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // City names
        String[] cities = {"Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata"};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nOriginal cities: " + "[");
        for (int i = 0; i < cities.length; i++) {
            System.out.print(cities[i] + (i < cities.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSort(cities);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted cities: " + "[");
        for (int i = 0; i < cities.length; i++) {
            System.out.print(cities[i] + (i < cities.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Using generic version with Double
        Double[] scores = {78.5, 92.3, 67.8, 88.0, 95.5};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nOriginal scores: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        bubbleSortGeneric(scores);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted scores: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}
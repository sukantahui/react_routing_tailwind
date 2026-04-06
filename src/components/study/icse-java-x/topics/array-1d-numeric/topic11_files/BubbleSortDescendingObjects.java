import java.util.Arrays;

class Student implements Comparable<Student> {
    String name;
    int percentage;
    
    Student(String name, int percentage) {
        this.name = name;
        this.percentage = percentage;
    }
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.percentage, other.percentage);
    }
    
    @Override
    public String toString() {
        return name + "(" + percentage + "%)";
    }
}

public class BubbleSortDescendingObjects {
    
    // Bubble sort for Comparable objects (descending)
    public static <T extends Comparable<T>> void bubbleSortDescending(T[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                // Reverse comparison for descending order
                if (arr[j].compareTo(arr[j + 1]) < 0) {
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
        // Student objects - Barrackpore school results
        Student[] students = {
            new Student("Swadeep", 85),
            new Student("Tuhina", 92),
            new Student("Abhronila", 78),
            new Student("Nandini", 96),
            new Student("Riddhiman", 88),
            new Student("Angshuman", 91)
        };
        
        System.out.println("Original student list:");
        for (Student s : students) {
            System.out.println("  " + s);
        }
        
        bubbleSortDescending(students);
        
        System.out.println("\nRanked by percentage (highest first):");
        for (Student s : students) {
            System.out.println("  " + s);
        }
        
        // Double array
        Double[] temperatures = {98.6, 72.5, 100.2, 65.8, 85.3};
        System.out.println("\nOriginal temps: " + Arrays.toString(temperatures));
        bubbleSortDescending(temperatures);
        System.out.println("Descending temps: " + Arrays.toString(temperatures));
    }
}
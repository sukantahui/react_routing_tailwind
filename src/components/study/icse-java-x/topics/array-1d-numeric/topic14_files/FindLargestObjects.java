import java.util.Arrays;
import java.util.Comparator;

class Student implements Comparable<Student> {
    String name;
    int score;
    
    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.score, other.score);
    }
    
    @Override
    public String toString() {
        return name + " (" + score + ")";
    }
}

public class FindLargestObjects {
    
    // Find max using Comparable
    public static <T extends Comparable<T>> T findMax(T[] arr) {
        if (arr == null || arr.length == 0) {
            return null;
        }
        
        T max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i].compareTo(max) > 0) {
                max = arr[i];
            }
        }
        return max;
    }
    
    // Find max using custom Comparator
    public static <T> T findMax(T[] arr, Comparator<T> comp) {
        if (arr == null || arr.length == 0) {
            return null;
        }
        
        T max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (comp.compare(arr[i], max) > 0) {
                max = arr[i];
            }
        }
        return max;
    }
    
    public static void main(String[] args) {
        // Student objects
        Student[] students = {
            new Student("Swadeep", 85),
            new Student("Tuhina", 92),
            new Student("Abhronila", 78),
            new Student("Nandini", 96),
            new Student("Riddhiman", 88),
            new Student("Angshuman", 91)
        };
        
        System.out.println("Students: " + Arrays.toString(students));
        
        Student topper = findMax(students);
        System.out.println("\nTopper: " + topper);
        
        // String array - find longest string
        String[] names = {"Swadeep", "Tuhina", "Abhronila", "Riddhiman", "Angshuman"};
        System.out.println("\nNames: " + Arrays.toString(names));
        
        String longest = findMax(names, (a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("Longest name: " + longest);
        
        // Double array
        Double[] prices = {45.99, 67.50, 23.75, 89.99, 12.25, 78.30};
        System.out.println("\nPrices: " + Arrays.toString(prices));
        System.out.println("Highest price: " + findMax(prices));
        
        // Custom object with different comparison
        System.out.println("\nStudents by name length (longest first):");
        Student longestName = findMax(students, (a, b) -> Integer.compare(a.name.length(), b.name.length()));
        System.out.println("Student with longest name: " + longestName);
    }
}
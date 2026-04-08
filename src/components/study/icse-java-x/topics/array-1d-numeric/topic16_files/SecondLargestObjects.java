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

public class SecondLargestObjects {
    
    // Find second largest using Comparable
    public static <T extends Comparable<T>> T findSecondLargest(T[] arr) {
        if (arr == null || arr.length < 2) {
            return null;
        }
        
        T first = arr[0];
        T second = null;
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i].compareTo(first) > 0) {
                second = first;
                first = arr[i];
            } else if (second == null || (arr[i].compareTo(second) > 0 && arr[i].compareTo(first) != 0)) {
                second = arr[i];
            }
        }
        
        return second;
    }
    
    // Find second largest using Comparator
    public static <T> T findSecondLargest(T[] arr, Comparator<T> comp) {
        if (arr == null || arr.length < 2) {
            return null;
        }
        
        T first = arr[0];
        T second = null;
        
        for (int i = 1; i < arr.length; i++) {
            if (comp.compare(arr[i], first) > 0) {
                second = first;
                first = arr[i];
            } else if (second == null || (comp.compare(arr[i], second) > 0 && comp.compare(arr[i], first) != 0)) {
                second = arr[i];
            }
        }
        
        return second;
    }
    
    public static void main(String[] args) {
        // Student scores - find second topper
        Student[] students = {
            new Student("Swadeep", 85),
            new Student("Tuhina", 92),
            new Student("Abhronila", 78),
            new Student("Nandini", 96),
            new Student("Riddhiman", 88),
            new Student("Angshuman", 91)
        };
        
        System.out.println("Students: " + Arrays.toString(students));
        
        Student secondTopper = findSecondLargest(students);
        System.out.println("\nSecond topper: " + secondTopper);
        
        // Find second longest string
        String[] names = {"Swadeep", "Tuhina", "Abhronila", "Riddhiman", "Angshuman"};
        System.out.println("\nNames: " + Arrays.toString(names));
        
        String secondLongest = findSecondLargest(names, (a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("Second longest name: " + secondLongest);
        
        // Product prices - find second most expensive
        Product[] products = {
            new Product("Laptop", 50000),
            new Product("Phone", 30000),
            new Product("Tablet", 25000),
            new Product("Watch", 15000),
            new Product("Headphones", 8000)
        };
        
        System.out.println("\nProducts: " + Arrays.toString(products));
        Product secondMostExpensive = findSecondLargest(products);
        System.out.println("Second most expensive: " + secondMostExpensive);
        
        // Integer array
        Integer[] scores = {45, 67, 23, 89, 12, 78, 34};
        System.out.println("\nScores: " + Arrays.toString(scores));
        System.out.println("Second highest score: " + findSecondLargest(scores));
    }
}

// Helper class for product
class Product implements Comparable<Product> {
    String name;
    double price;
    
    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public int compareTo(Product other) {
        return Double.compare(this.price, other.price);
    }
    
    @Override
    public String toString() {
        return name + " (₹" + price + ")";
    }
}
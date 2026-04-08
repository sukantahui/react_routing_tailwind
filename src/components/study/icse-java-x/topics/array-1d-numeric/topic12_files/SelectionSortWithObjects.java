import java.util.Arrays;

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

public class SelectionSortWithObjects {
    
    // Generic selection sort for Comparable objects
    public static <T extends Comparable<T>> void selectionSort(T[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (arr[j].compareTo(arr[minIndex]) < 0) {
                    minIndex = j;
                }
            }
            
            if (minIndex != i) {
                T temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
    
    // Selection sort with custom comparator (descending)
    public static <T> void selectionSortDescending(T[] arr, java.util.Comparator<T> comp) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (comp.compare(arr[j], arr[minIndex]) > 0) { // Note: > for descending
                    minIndex = j;
                }
            }
            
            if (minIndex != i) {
                T temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        // Product prices - Barrackpore store
        Product[] products = {
            new Product("Notebook", 50),
            new Product("Pen", 20),
            new Product("Eraser", 10),
            new Product("Scale", 30),
            new Product("Sharpener", 15)
        };
        
        System.out.println("Original products:");
        for (Product p : products) {
            System.out.println("  " + p);
        }
        
        selectionSort(products);
        
        System.out.println("\nSorted by price (ascending):");
        for (Product p : products) {
            System.out.println("  " + p);
        }
        
        // String array - student names
        String[] students = {"Swadeep", "Tuhina", "Abhronila", "Nandini", "Riddhiman"};
        System.out.println("\nOriginal names: " + Arrays.toString(students));
        selectionSort(students);
        System.out.println("Sorted names: " + Arrays.toString(students));
        
        // Descending order using custom comparator
        Integer[] scores = {85, 92, 78, 96, 88, 91};
        System.out.println("\nOriginal scores: " + Arrays.toString(scores));
        selectionSortDescending(scores, (a, b) -> a.compareTo(b));
        System.out.println("Descending scores: " + Arrays.toString(scores));
    }
}
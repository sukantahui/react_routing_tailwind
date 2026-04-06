import java.util.Arrays;
import java.util.Comparator;

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

public class FindSmallestObjects {
    
    // Find min using Comparable
    public static <T extends Comparable<T>> T findMin(T[] arr) {
        if (arr == null || arr.length == 0) {
            return null;
        }
        
        T min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i].compareTo(min) < 0) {  // Note: < 0 for minimum
                min = arr[i];
            }
        }
        return min;
    }
    
    // Find min using custom Comparator
    public static <T> T findMin(T[] arr, Comparator<T> comp) {
        if (arr == null || arr.length == 0) {
            return null;
        }
        
        T min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (comp.compare(arr[i], min) < 0) {
                min = arr[i];
            }
        }
        return min;
    }
    
    public static void main(String[] args) {
        // Product prices - find cheapest
        Product[] products = {
            new Product("Notebook", 50),
            new Product("Pen", 20),
            new Product("Eraser", 10),
            new Product("Scale", 30),
            new Product("Sharpener", 15)
        };
        
        System.out.println("Products: " + Arrays.toString(products));
        
        Product cheapest = findMin(products);
        System.out.println("\nCheapest product: " + cheapest);
        
        // String array - find shortest name
        String[] names = {"Swadeep", "Tuhina", "Abhronila", "Riddhiman", "Angshuman"};
        System.out.println("\nNames: " + Arrays.toString(names));
        
        String shortest = findMin(names, (a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("Shortest name: " + shortest);
        
        // Double array - find lowest price
        Double[] prices = {45.99, 67.50, 23.75, 89.99, 12.25, 78.30};
        System.out.println("\nPrices: " + Arrays.toString(prices));
        System.out.println("Lowest price: " + findMin(prices));
        
        // Student scores - find lowest
        Integer[] scores = {85, 92, 78, 96, 67, 88, 91};
        System.out.println("\nStudent scores: " + Arrays.toString(scores));
        System.out.println("Lowest score: " + findMin(scores));
        
        // Custom object with different comparison (by name length)
        System.out.println("\nStudents by name length (shortest first):");
        Product shortestName = findMin(products, (a, b) -> Integer.compare(a.name.length(), b.name.length()));
        System.out.println("Product with shortest name: " + shortestName);
    }
}

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
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nOriginal names: " + "[");
        for (int i = 0; i < students.length; i++) {
            System.out.print(students[i] + (i < students.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSort(students);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted names: " + "[");
        for (int i = 0; i < students.length; i++) {
            System.out.print(students[i] + (i < students.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Descending order using custom comparator
        Integer[] scores = {85, 92, 78, 96, 88, 91};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nOriginal scores: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSortDescending(scores, (a, b) -> a.compareTo(b));
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Descending scores: " + "[");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + (i < scores.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}
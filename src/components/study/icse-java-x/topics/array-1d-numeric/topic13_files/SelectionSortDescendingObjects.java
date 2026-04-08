import java.util.Arrays;
import java.util.Comparator;

class Employee implements Comparable<Employee> {
    String name;
    double salary;
    
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    @Override
    public int compareTo(Employee other) {
        return Double.compare(this.salary, other.salary);
    }
    
    @Override
    public String toString() {
        return name + " (₹" + salary + ")";
    }
}

public class SelectionSortDescendingObjects {
    
    // Generic descending selection sort for Comparable objects
    public static <T extends Comparable<T>> void selectionSortDescending(T[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            int maxIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                // Note: compareTo > 0 for descending
                if (arr[j].compareTo(arr[maxIndex]) > 0) {
                    maxIndex = j;
                }
            }
            
            if (maxIndex != i) {
                T temp = arr[i];
                arr[i] = arr[maxIndex];
                arr[maxIndex] = temp;
            }
        }
    }
    
    // Selection sort with custom comparator for descending order
    public static <T> void selectionSortDescending(T[] arr, Comparator<T> comp) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            int maxIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (comp.compare(arr[j], arr[maxIndex]) > 0) {
                    maxIndex = j;
                }
            }
            
            if (maxIndex != i) {
                T temp = arr[i];
                arr[i] = arr[maxIndex];
                arr[maxIndex] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        // Employee salaries - Barrackpore company
        Employee[] employees = {
            new Employee("Swadeep", 50000),
            new Employee("Tuhina", 75000),
            new Employee("Abhronila", 60000),
            new Employee("Nandini", 85000),
            new Employee("Riddhiman", 70000)
        };
        
        System.out.println("Original employees:");
        for (Employee e : employees) {
            System.out.println("  " + e);
        }
        
        selectionSortDescending(employees);
        
        System.out.println("\nSorted by salary (highest first):");
        for (Employee e : employees) {
            System.out.println("  " + e);
        }
        
        // String array - cities
        String[] cities = {"Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata"};
        System.out.println("\nOriginal cities: " + Arrays.toString(cities));
        selectionSortDescending(cities);
        System.out.println("Descending alphabetical: " + Arrays.toString(cities));
        
        // Using custom comparator for string length (descending)
        String[] names = {"Swadeep", "Tuhina", "Abhronila", "Nandini"};
        System.out.println("\nNames by length (descending):");
        System.out.println("Original: " + Arrays.toString(names));
        selectionSortDescending(names, (a, b) -> Integer.compare(b.length(), a.length()));
        System.out.println("By length desc: " + Arrays.toString(names));
    }
}
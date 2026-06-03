import java.util.ArrayList;
import java.util.List;

public class DynamicAllocation {
    public static void main(String[] args) {
        // In Java, dynamic allocation is automatic with 'new'
        int[] arr = new int[10];
        System.out.println("Original base reference: " + arr);
        
        // Reallocation: create a new larger array
        int[] newArr = new int[20];
        System.arraycopy(arr, 0, newArr, 0, arr.length);
        arr = newArr; // base address changes
        System.out.println("New base reference after reallocation: " + arr);
        
        // In C: realloc can move the array to a new address.
        // Always use the returned pointer; old pointer becomes invalid.
    }
}
import java.util.Arrays;

public class CompareSorts {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void main(String[] args) {
        int size = 10000;
        int[] arr1 = new int[size];
        int[] arr2 = new int[size];
        // Fill with random numbers
        for (int i = 0; i < size; i++) {
            int val = (int)(Math.random() * size);
            arr1[i] = val;
            arr2[i] = val;
        }
        
        long start = System.nanoTime();
        bubbleSort(arr1);
        long end = System.nanoTime();
        System.out.println("Bubble sort time: " + (end - start) / 1e6 + " ms");
        
        start = System.nanoTime();
        selectionSort(arr2);
        end = System.nanoTime();
        System.out.println("Selection sort time: " + (end - start) / 1e6 + " ms");
        
        // Note: Both are O(n^2), but selection sort often faster due to fewer swaps.
    }
}
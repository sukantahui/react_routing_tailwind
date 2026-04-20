public class SelectionSortStepByStep {
    public static void main(String[] args) {
        int[] arr = {29, 10, 14, 37, 13};
        System.out.println("Step-by-step selection sort:");
        printArray(arr);
        
        for (int i = 0; i < arr.length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            System.out.println("Minimum from index " + i + " to end is " + arr[minIdx] + " at position " + minIdx);
            // Swap
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            printArray(arr);
        }
    }
    
    public static void printArray(int[] arr) {
        for (int num : arr) System.out.print(num + " ");
        System.out.println();
    }
}
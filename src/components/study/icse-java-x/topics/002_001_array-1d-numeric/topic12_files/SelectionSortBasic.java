
public class SelectionSortBasic {
    
    // Basic selection sort
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            // Find minimum element in unsorted portion
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap minimum with first element of unsorted portion
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11};
        
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Original array: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSort(numbers);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted array: " + "[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + (i < numbers.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        
        // Barrackpore school roll numbers
        int[] rollNos = {105, 102, 108, 101, 107, 104, 103, 106};
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("\nRoll numbers: " + "[");
        for (int i = 0; i < rollNos.length; i++) {
            System.out.print(rollNos[i] + (i < rollNos.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        selectionSort(rollNos);
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("Sorted rolls: " + "[");
        for (int i = 0; i < rollNos.length; i++) {
            System.out.print(rollNos[i] + (i < rollNos.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}
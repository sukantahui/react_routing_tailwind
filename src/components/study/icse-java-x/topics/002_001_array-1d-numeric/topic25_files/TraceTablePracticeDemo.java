public class TraceTablePracticeDemo {
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        int n = arr.length;

        System.out.println("--- Trace Table Execution Log (Selection Sort) ---");
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;

            System.out.print("Pass " + (i + 1) + " (minIdx=" + minIdx + "): [ ");
            for (int k = 0; k < n; k++) {
                System.out.print(arr[k] + (k < n - 1 ? ", " : ""));
            }
            System.out.println(" ]");
        }
    }
}
/**
 * Analyzes linear search for best, worst, and average cases.
 * Shows how many steps are executed for each case.
 */
public class LinearSearchAnalysis {
    public static void main(String[] args) {
        int[] arr = new int[100000];
        for (int i = 0; i < arr.length; i++) arr[i] = i;

        System.out.println("Linear search analysis (n = " + arr.length + ")");
        System.out.println("----------------------------------------------");

        // Best case: target at index 0
        int steps = linearSearchWithSteps(arr, 0);
        System.out.println("Best case (target at first): " + steps + " steps → Ω(1)");

        // Worst case: target at last
        steps = linearSearchWithSteps(arr, arr.length - 1);
        System.out.println("Worst case (target at last): " + steps + " steps → O(n)");

        // Worst case: target not found
        steps = linearSearchWithSteps(arr, 1000000);
        System.out.println("Worst case (target not found): " + steps + " steps → O(n)");

        // Average case: target in middle
        int middle = arr.length / 2;
        steps = linearSearchWithSteps(arr, arr[middle]);
        System.out.println("Average case (target at middle): " + steps + " steps → Θ(n) average");

        // Simulate average over all positions
        double avgSteps = 0;
        for (int i = 0; i < arr.length; i++) {
            avgSteps += linearSearchWithSteps(arr, arr[i]);
        }
        avgSteps /= arr.length;
        System.out.println("Average over all positions: " + avgSteps + " steps → Θ(n)");
    }

    public static int linearSearchWithSteps(int[] arr, int target) {
        int steps = 0;
        for (int i = 0; i < arr.length; i++) {
            steps++;
            if (arr[i] == target) return steps;
        }
        return steps; // not found
    }
}
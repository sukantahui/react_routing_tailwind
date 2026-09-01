import java.util.ArrayList;

public class LinearSearchMultiple {
    
    // Find all occurrences
    public static ArrayList<Integer> findAllOccurrences(int[] arr, int target) {
        ArrayList<Integer> positions = new ArrayList<>();
        
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                positions.add(i);
            }
        }
        return positions;
    }
    
    // Find last occurrence
    public static int findLastOccurrence(int[] arr, int target) {
        int lastIndex = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                lastIndex = i;
            }
        }
        return lastIndex;
    }
    
    public static void main(String[] args) {
        int[] numbers = {23, 45, 23, 67, 23, 89, 23, 12};
        int target = 23;
        
        // Find all positions
        ArrayList<Integer> positions = findAllOccurrences(numbers, target);
        System.out.println(target + " found at indices: " + positions);
        
        // Find last position
        int lastPos = findLastOccurrence(numbers, target);
        System.out.println("Last occurrence at index: " + lastPos);
        
        // Count frequency
        System.out.println("Frequency: " + positions.size());
    }
}
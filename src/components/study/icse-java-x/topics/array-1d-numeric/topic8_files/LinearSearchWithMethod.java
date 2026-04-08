public class LinearSearchWithMethod {
    
    // Reusable linear search method
    public static int linearSearch(int[] arr, int target) {
        if (arr == null) {
            return -1;  // Handle null array
        }
        
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Found at index i
            }
        }
        return -1;  // Not found
    }
    
    public static void main(String[] args) {
        int[] scores = {45, 67, 89, 34, 78, 90, 56};
        
        int searchFor = 78;
        int result = linearSearch(scores, searchFor);
        
        if (result != -1) {
            System.out.println(searchFor + " found at position: " + result);
        } else {
            System.out.println(searchFor + " not found");
        }
        
        // Search for non-existent value
        System.out.println("Searching for 100: " + linearSearch(scores, 100));
    }
}
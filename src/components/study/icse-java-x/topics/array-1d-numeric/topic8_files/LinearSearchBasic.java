public class LinearSearchBasic {
    public static void main(String[] args) {
        int[] marks = {78, 89, 92, 67, 85, 90, 76};
        int target = 67;
        int position = -1;
        
        // Linear search
        for (int i = 0; i < marks.length; i++) {
            if (marks[i] == target) {
                position = i;
                break;  // Exit loop when found
            }
        }
        
        if (position != -1) {
            System.out.println(target + " found at index: " + position);
        } else {
            System.out.println(target + " not found in array");
        }
    }
}
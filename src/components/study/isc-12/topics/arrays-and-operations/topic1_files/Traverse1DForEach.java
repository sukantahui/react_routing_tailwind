public class Traverse1DForEach {
    public static void main(String[] args) {
        int[] marks = {85, 90, 78, 92, 88};
        
        // Enhanced for loop (for-each) - read only
        for (int m : marks) {
            System.out.println("Mark: " + m);
        }
        
        // Finding maximum using for-each
        int max = Integer.MIN_VALUE;
        for (int m : marks) {
            if (m > max) max = m;
        }
        System.out.println("Maximum mark: " + max);
        
        // This does NOT modify the array!
        for (int m : marks) {
            m = m * 2;  // only changes local variable 'm'
        }
        // marks array remains unchanged
    }
}
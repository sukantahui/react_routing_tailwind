public class Traverse1DForLoop {
    public static void main(String[] args) {
        int[] marks = {85, 90, 78, 92, 88};
        
        // Traditional for loop with index
        for (int i = 0; i < marks.length; i++) {
            System.out.println("Element at index " + i + ": " + marks[i]);
        }
        
        // Summing using index loop
        int sum = 0;
        for (int i = 0; i < marks.length; i++) {
            sum += marks[i];
        }
        System.out.println("Total sum: " + sum);
        
        // Modifying elements (double each mark)
        for (int i = 0; i < marks.length; i++) {
            marks[i] = marks[i] * 2;
        }
    }
}
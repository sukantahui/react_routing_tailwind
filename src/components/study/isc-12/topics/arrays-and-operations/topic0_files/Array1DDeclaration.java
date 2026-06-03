public class Array1DDeclaration {
    public static void main(String[] args) {
        // Declaration and initialization of a 1D array
        int[] marks = new int[5];   // array of 5 integers
        int[] ages = {18, 19, 20, 21, 22}; // array literal
        
        // Accessing and modifying elements
        marks[0] = 85;
        marks[1] = 90;
        System.out.println("First mark: " + marks[0]);
        System.out.println("Ages length: " + ages.length);
        
        // Iterating using for-each loop
        for (int age : ages) {
            System.out.print(age + " ");
        }
    }
}
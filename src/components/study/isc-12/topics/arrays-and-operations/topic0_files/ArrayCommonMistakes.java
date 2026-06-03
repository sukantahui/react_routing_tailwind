public class ArrayCommonMistakes {
    public static void main(String[] args) {
        // MISTAKE 1: Off-by-one error
        int[] numbers = new int[5];
        // numbers[5] = 10;  // ArrayIndexOutOfBoundsException (index 0-4)
        
        // MISTAKE 2: Uninitialized array
        int[] values;        // declared but not initialized
        // values[0] = 5;    // Compilation error: variable might not have been initialized
        
        // MISTAKE 3: Confusing length vs length()
        String[] names = new String[3];
        int len = names.length;   // correct for arrays
        // int len2 = names.length(); // wrong - length() is for Strings
        
        // MISTAKE 4: Using array variable before allocation
        int[] data = null;
        // data[0] = 10;  // NullPointerException
    }
}
public class ElementSizeExample {
    public static void main(String[] args) {
        int base = 1000;
        int rows = 3, cols = 4;
        
        // Different data types have different sizes
        // In Java, we simulate using sizes
        int intSize = 4;
        int doubleSize = 8;
        int charSize = 2; // Java char is 2 bytes
        
        int i = 1, j = 2;
        
        int intAddr = base + (i * cols + j) * intSize;
        int doubleAddr = base + (i * cols + j) * doubleSize;
        int charAddr = base + (i * cols + j) * charSize;
        
        System.out.println("Address for int[1][2]: " + intAddr);
        System.out.println("Address for double[1][2]: " + doubleAddr);
        System.out.println("Address for char[1][2]: " + charAddr);
    }
}
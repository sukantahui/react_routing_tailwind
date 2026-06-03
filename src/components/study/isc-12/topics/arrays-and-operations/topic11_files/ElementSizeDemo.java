public class ElementSizeDemo {
    public static void main(String[] args) {
        // In Java, primitive sizes are fixed.
        System.out.println("Size of byte: " + Byte.BYTES + " bytes");
        System.out.println("Size of short: " + Short.BYTES + " bytes");
        System.out.println("Size of int: " + Integer.BYTES + " bytes");
        System.out.println("Size of long: " + Long.BYTES + " bytes");
        System.out.println("Size of float: " + Float.BYTES + " bytes");
        System.out.println("Size of double: " + Double.BYTES + " bytes");
        System.out.println("Size of char: " + Character.BYTES + " bytes");
        
        // Simulating address calculation with different element sizes
        int base = 1000;
        int offset = 5; // 5th element
        int intAddr = base + offset * Integer.BYTES;
        int doubleAddr = base + offset * Double.BYTES;
        System.out.println("Address of 5th int element: " + intAddr);
        System.out.println("Address of 5th double element: " + doubleAddr);
    }
}
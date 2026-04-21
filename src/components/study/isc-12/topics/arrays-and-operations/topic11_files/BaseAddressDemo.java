public class BaseAddressDemo {
    public static void main(String[] args) {
        int[] arr = new int[10];
        // In Java, we can't directly print the raw memory address,
        // but we can get a hash code (not the same as address).
        System.out.println("Array reference: " + arr);
        System.out.println("Hash code (approximate): " + System.identityHashCode(arr));
        
        // In C, you would do: printf("%p", arr);
        // The base address is the starting address of the first element.
    }
}
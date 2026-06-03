public class PointerArithmetic {
    public static void main(String[] args) {
        // Simulating pointer arithmetic in Java using array indices
        int[] arr = {10, 20, 30, 40, 50};
        int baseAddress = 1000; // simulated base
        int elementSize = Integer.BYTES;
        
        for (int i = 0; i < arr.length; i++) {
            int address = baseAddress + i * elementSize;
            System.out.println("arr[" + i + "] @ address " + address + " = " + arr[i]);
        }
        
        // In C: int *ptr = arr; ptr++; advances by sizeof(int) bytes
        // Here we simulate by incrementing index
        int index = 0;
        System.out.println("First element: " + arr[index]);
        index++; // move to next element
        System.out.println("Second element: " + arr[index]);
    }
}
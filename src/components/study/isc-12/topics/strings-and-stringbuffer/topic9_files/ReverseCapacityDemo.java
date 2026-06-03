// topic9_files/ReverseCapacityDemo.java
public class ReverseCapacityDemo {
    public static void main(String[] args) {
        // Reverse demonstration
        StringBuffer sb = new StringBuffer("StringBuffer");
        System.out.println("Original: " + sb);
        sb.reverse();
        System.out.println("Reversed: " + sb);
        sb.reverse(); // back to original
        System.out.println("Reversed again: " + sb);
        
        // Palindrome check using reverse
        String word = "radar";
        StringBuffer test = new StringBuffer(word);
        boolean isPalindrome = test.reverse().toString().equals(word);
        System.out.println("\n'" + word + "' is palindrome? " + isPalindrome);
        
        // Capacity and length
        StringBuffer sb2 = new StringBuffer(); // default capacity 16
        System.out.println("\nDefault capacity: " + sb2.capacity());
        System.out.println("Length: " + sb2.length());
        
        sb2.append("Hello");
        System.out.println("After append 'Hello': length=" + sb2.length() + ", capacity=" + sb2.capacity());
        
        sb2.append("ThisIsALongStringThatExceeds16Characters");
        System.out.println("After large append: length=" + sb2.length() + ", capacity=" + sb2.capacity());
        
        // ensureCapacity
        StringBuffer sb3 = new StringBuffer();
        System.out.println("\nInitial capacity: " + sb3.capacity());
        sb3.ensureCapacity(100);
        System.out.println("After ensureCapacity(100): " + sb3.capacity());
        
        // setLength
        sb3.append("abcdefghij");
        System.out.println("Buffer: " + sb3);
        sb3.setLength(5);
        System.out.println("After setLength(5): " + sb3);
        sb3.setLength(10);
        System.out.println("After setLength(10): " + sb3 + " (padded with null chars)");
        
        // Performance tip: pre-sizing avoids resizes
        int iterations = 100000;
        StringBuffer sb4 = new StringBuffer(iterations); // pre-sized
        long start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            sb4.append('a');
        }
        long end = System.nanoTime();
        System.out.println("\nPre-sized append time: " + (end - start) / 1_000_000 + " ms");
    }
}
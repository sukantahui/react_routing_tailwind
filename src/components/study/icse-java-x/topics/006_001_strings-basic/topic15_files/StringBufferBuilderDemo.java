/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 15: Introduction to StringBuilder and StringBuffer
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringBufferBuilderDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    STRINGBUILDER & STRINGBUFFER MUTABILITY       ");
        System.out.println("==================================================");

        // 1. StringBuffer (Thread-safe, synchronized, mutable)
        StringBuffer sb = new StringBuffer("Barrackpore");
        System.out.println("[1] Initial StringBuffer: " + sb);
        System.out.println("    Initial Capacity    : " + sb.capacity()); // 11 + 16 = 27

        // 2. append() modifies in place!
        sb.append(" Lab");
        System.out.println("\n[2] After append(\" Lab\"): " + sb);

        // 3. insert() at specified index
        sb.insert(0, "ICSE ");
        System.out.println("[3] After insert(0, \"ICSE \"): " + sb);

        // 4. reverse() in place! (Not available in String class)
        sb.reverse();
        System.out.println("[4] After reverse(): " + sb);
        sb.reverse(); // Reverse back to normal

        // 5. delete(start, end)
        sb.delete(0, 5); // Deletes "ICSE "
        System.out.println("[5] After delete(0, 5): " + sb);

        // 6. setCharAt(index, char)
        sb.setCharAt(0, 'b');
        System.out.println("[6] After setCharAt(0, 'b'): " + sb);

        System.out.println("==================================================");
    }
}
// topic7_files/StringBufferMethods.java
public class StringBufferMethods {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Hello World");
        
        // length() and capacity()
        System.out.println("Original: " + sb);
        System.out.println("length: " + sb.length());
        System.out.println("capacity: " + sb.capacity());
        
        // charAt() and setCharAt()
        System.out.println("charAt(0): " + sb.charAt(0));
        sb.setCharAt(0, 'h');
        System.out.println("After setCharAt(0,'h'): " + sb);
        
        // substring()
        String sub = sb.substring(6); // from index 6 to end
        System.out.println("substring(6): " + sub);
        String subRange = sb.substring(0, 5);
        System.out.println("substring(0,5): " + subRange);
        
        // replace()
        sb.replace(0, 5, "Hi");
        System.out.println("After replace(0,5,'Hi'): " + sb);
        
        // delete() and deleteCharAt()
        sb.delete(2, 5); // delete indices 2-4
        System.out.println("After delete(2,5): " + sb);
        sb.deleteCharAt(0);
        System.out.println("After deleteCharAt(0): " + sb);
        
        // ensureCapacity()
        System.out.println("\nBefore ensureCapacity, capacity: " + sb.capacity());
        sb.ensureCapacity(100);
        System.out.println("After ensureCapacity(100): " + sb.capacity());
        
        // indexOf()
        sb = new StringBuffer("Java is fun, Java is powerful");
        int firstJava = sb.indexOf("Java");
        int secondJava = sb.indexOf("Java", firstJava + 1);
        System.out.println("\nFirst 'Java' at: " + firstJava);
        System.out.println("Second 'Java' at: " + secondJava);
        
        // lastIndexOf()
        int lastJava = sb.lastIndexOf("Java");
        System.out.println("Last 'Java' at: " + lastJava);
        
        // getChars()
        char[] dest = new char[4];
        sb.getChars(0, 4, dest, 0);
        System.out.print("getChars(0,4): ");
        for(char c : dest) System.out.print(c);
        System.out.println();
    }
}
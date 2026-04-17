// topic9_files/AppendDemo.java
public class AppendDemo {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer();
        
        // Append different types
        sb.append("Hello");           // String
        sb.append(' ');               // char
        sb.append(123);               // int
        sb.append(" ");               
        sb.append(45.67);             // double
        sb.append(" ");
        sb.append(true);              // boolean
        
        System.out.println("After appends: " + sb);
        
        // Chaining appends
        StringBuffer chained = new StringBuffer()
            .append("Student: ")
            .append("Swadeep")
            .append(", City: ")
            .append("Barrackpore");
        System.out.println("Chained: " + chained);
        
        // Appending null
        StringBuffer nullTest = new StringBuffer("Value: ");
        nullTest.append(null);
        System.out.println("Append null: " + nullTest); // "Value: null"
        
        // Appending object (calls toString)
        Object obj = new Object() {
            public String toString() { return "CustomObject"; }
        };
        sb.append(obj);
        System.out.println("After object: " + sb);
        
        // Pre-sizing to improve performance
        StringBuffer large = new StringBuffer(1000);
        long start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            large.append("a");
        }
        long end = System.nanoTime();
        System.out.println("Pre-sized append time: " + (end - start) / 1_000_000 + " ms");
    }
}
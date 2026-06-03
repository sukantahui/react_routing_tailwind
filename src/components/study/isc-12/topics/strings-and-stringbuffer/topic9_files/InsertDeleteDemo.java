// topic9_files/InsertDeleteDemo.java
public class InsertDeleteDemo {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("HelloWorld");
        System.out.println("Original: " + sb);
        
        // Insert at position 5
        sb.insert(5, " ");
        System.out.println("After insert(5,' '): " + sb);
        
        // Insert multiple characters
        sb.insert(6, "beautiful ");
        System.out.println("After insert(6,'beautiful '): " + sb);
        
        // Insert at beginning
        sb.insert(0, "Greeting: ");
        System.out.println("After insert(0,'Greeting: '): " + sb);
        
        // Delete a range
        sb.delete(0, 10); // remove "Greeting: "
        System.out.println("After delete(0,10): " + sb);
        
        // Delete single character
        sb.deleteCharAt(5); // remove space after "Hello"
        System.out.println("After deleteCharAt(5): " + sb);
        
        // Replace a range
        sb.replace(0, 5, "Hi");
        System.out.println("After replace(0,5,'Hi'): " + sb);
        
        // Real-world: building an HTML tag
        StringBuffer html = new StringBuffer();
        html.append("<div>").append("Content").append("</div>");
        html.insert(html.indexOf(">") + 1, "Inserted ");
        System.out.println("HTML: " + html);
        
        // Clear buffer using setLength
        sb.setLength(0);
        System.out.println("After clear, length: " + sb.length());
    }
}
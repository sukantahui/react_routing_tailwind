/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 007_001: Encapsulation
 * Topic 2: Data Hiding & Security Architecture
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class DataHidingSecurityDemo {
    private String title = "Data Hiding & Security Architecture";
    
    public void display() {
        System.out.println("Topic 2: " + title);
    }
    
    public static void main(String[] args) {
        DataHidingSecurityDemo demo = new DataHidingSecurityDemo();
        demo.display();
    }
}

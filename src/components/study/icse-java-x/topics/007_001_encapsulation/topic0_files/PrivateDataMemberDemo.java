/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 007_001: Encapsulation
 * Topic 0: Private Data Members & Access Control
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class PrivateDataMemberDemo {
    private String title = "Private Data Members & Access Control";
    
    public void display() {
        System.out.println("Topic 0: " + title);
    }
    
    public static void main(String[] args) {
        PrivateDataMemberDemo demo = new PrivateDataMemberDemo();
        demo.display();
    }
}

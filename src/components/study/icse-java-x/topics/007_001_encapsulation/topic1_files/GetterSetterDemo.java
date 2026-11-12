/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 007_001: Encapsulation
 * Topic 1: Getter (Accessor) and Setter (Mutator) Methods
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class GetterSetterDemo {
    private String title = "Getter (Accessor) and Setter (Mutator) Methods";
    
    public void display() {
        System.out.println("Topic 1: " + title);
    }
    
    public static void main(String[] args) {
        GetterSetterDemo demo = new GetterSetterDemo();
        demo.display();
    }
}

/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 007_002_inheritance
 * Topic 2: Method Overriding Overview
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class MethodOverridingDemo {
    private String topicName = "Method Overriding Overview";
    
    public void display() {
        System.out.println("Topic 2: " + topicName);
    }
    
    public static void main(String[] args) {
        MethodOverridingDemo demo = new MethodOverridingDemo();
        demo.display();
    }
}

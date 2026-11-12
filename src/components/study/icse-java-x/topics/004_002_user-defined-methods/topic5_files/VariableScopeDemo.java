/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 004_002_user-defined-methods
 * Topic 5: Scope of Variables (Local vs Instance Variables)
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class VariableScopeDemo {
    private String topicName = "Scope of Variables (Local vs Instance Variables)";
    
    public void printDetails() {
        System.out.println("Topic 5: " + topicName);
    }
    
    public static void main(String[] args) {
        VariableScopeDemo demo = new VariableScopeDemo();
        demo.printDetails();
    }
}

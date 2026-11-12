/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 004_002_user-defined-methods
 * Topic 0: Method Declaration and Signature
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class MethodDeclarationDemo {
    private String topicName = "Method Declaration and Signature";
    
    public void printDetails() {
        System.out.println("Topic 0: " + topicName);
    }
    
    public static void main(String[] args) {
        MethodDeclarationDemo demo = new MethodDeclarationDemo();
        demo.printDetails();
    }
}

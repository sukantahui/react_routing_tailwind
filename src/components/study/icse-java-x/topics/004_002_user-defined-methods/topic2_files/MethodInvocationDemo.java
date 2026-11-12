/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 004_002_user-defined-methods
 * Topic 2: Method Calling and Execution Flow
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class MethodInvocationDemo {
    private String topicName = "Method Calling and Execution Flow";
    
    public void printDetails() {
        System.out.println("Topic 2: " + topicName);
    }
    
    public static void main(String[] args) {
        MethodInvocationDemo demo = new MethodInvocationDemo();
        demo.printDetails();
    }
}

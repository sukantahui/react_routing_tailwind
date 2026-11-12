/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 004_002_user-defined-methods
 * Topic 3: Parameter Passing Mechanisms (Pass by Value)
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class PassByValueDemo {
    private String topicName = "Parameter Passing Mechanisms (Pass by Value)";
    
    public void printDetails() {
        System.out.println("Topic 3: " + topicName);
    }
    
    public static void main(String[] args) {
        PassByValueDemo demo = new PassByValueDemo();
        demo.printDetails();
    }
}

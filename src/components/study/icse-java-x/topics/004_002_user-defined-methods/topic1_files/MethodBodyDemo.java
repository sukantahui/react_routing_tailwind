/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 004_002_user-defined-methods
 * Topic 1: Method Definition and Body
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class MethodBodyDemo {
    private String topicName = "Method Definition and Body";
    
    public void printDetails() {
        System.out.println("Topic 1: " + topicName);
    }
    
    public static void main(String[] args) {
        MethodBodyDemo demo = new MethodBodyDemo();
        demo.printDetails();
    }
}

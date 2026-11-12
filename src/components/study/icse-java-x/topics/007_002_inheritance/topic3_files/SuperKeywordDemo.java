/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 007_002_inheritance
 * Topic 3: Use of super Keyword in Constructors & Methods
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class SuperKeywordDemo {
    private String topicName = "Use of super Keyword in Constructors & Methods";
    
    public void display() {
        System.out.println("Topic 3: " + topicName);
    }
    
    public static void main(String[] args) {
        SuperKeywordDemo demo = new SuperKeywordDemo();
        demo.display();
    }
}

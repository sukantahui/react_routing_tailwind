// ClassStructureAndMainDemo.java
// Revision of Class IX Basic Class Structure & BlueJ Entry Point
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class ClassStructureAndMainDemo {
    // Instance variables / Class fields
    private String institution = "Coder & AccoTax, Barrackpore";
    
    // Member method
    public void displayInfo() {
        System.out.println("Institute: " + institution);
        System.out.println("Teacher: Sukanta Hui (Contact: 7003756860)");
    }
    
    // Standard JVM Entry Point
    public static void main(String[] args) {
        System.out.println("=== BLUEJ CLASS ANATOMY DEMO ===");
        System.out.println("Execution starts in public static void main(String[] args)");
        
        // Creating an object of the class
        ClassStructureAndMainDemo demo = new ClassStructureAndMainDemo();
        
        // Invoking instance method
        demo.displayInfo();
    }
}
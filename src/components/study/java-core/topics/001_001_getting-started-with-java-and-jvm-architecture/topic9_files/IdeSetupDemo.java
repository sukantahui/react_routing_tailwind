/**
 * File: IdeSetupDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 9 - Choosing and setting up IDEs (IntelliJ IDEA, Eclipse, VS Code, BlueJ)
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class IdeSetupDemo {

    public static void main(String[] args) {
        System.out.println("=== Java IDE Landscape Comparison ===");
        
        String[] ides = {
            "1. IntelliJ IDEA (Community / Ultimate) - Industry standard, intelligent refactoring, smart autocomplete",
            "2. Eclipse IDE - Battle-tested open-source platform, enterprise plugin ecosystem",
            "3. Visual Studio Code - Lightweight editor with Extension Pack for Java (Language Server Protocol)",
            "4. BlueJ - Educational IDE designed for beginners to visualize object interactions"
        };
        
        for (String ide : ides) {
            System.out.println(ide);
        }
        
        // Lab mentorship scenario
        String student = "Swadeep";
        String lab = "Barrackpore Advanced Lab";
        System.out.println("\nMentorship Recommendation: " + student + " uses IntelliJ IDEA at " + lab + " for enterprise-grade productivity.");
    }
}

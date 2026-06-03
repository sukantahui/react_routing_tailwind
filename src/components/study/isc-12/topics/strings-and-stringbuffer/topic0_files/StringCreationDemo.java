// topic0_files/StringCreationDemo.java
public class StringCreationDemo {
    public static void main(String[] args) {
        // Using literal (goes to String Pool)
        String city1 = "Barrackpore";
        String city2 = "Barrackpore";
        
        // Using new keyword (forces new object on Heap)
        String city3 = new String("Barrackpore");
        
        // Check reference equality
        System.out.println("city1 == city2: " + (city1 == city2));     // true (same object)
        System.out.println("city1 == city3: " + (city1 == city3));     // false (different objects)
        System.out.println("city1 equals city3: " + city1.equals(city3)); // true (same content)
        
        // Practical tip: prefer literals
        String student = "Tuhina";
        String grade = "A+";
        String message = student + " scored " + grade;  // concatenation
        System.out.println(message);
    }
}
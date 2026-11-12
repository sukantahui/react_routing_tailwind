// ConditionalStatementsDemo.java
// Revision of Class IX Conditional Logic
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class ConditionalStatementsDemo {
    public static void main(String[] args) {
        System.out.println("=== CLASS IX REVISION: CONDITIONAL STATEMENTS ===");
        
        int marks = 85;
        
        // 1. If-Else-If Ladder
        char grade;
        if (marks >= 90) {
            grade = 'A';
        } else if (marks >= 80) {
            grade = 'B';
        } else if (marks >= 70) {
            grade = 'C';
        } else {
            grade = 'D';
        }
        System.out.println("Marks: " + marks + " -> Grade: " + grade);
        
        // 2. Ternary Operator
        String result = (marks >= 40) ? "PASS" : "FAIL";
        System.out.println("Result: " + result);
        
        // 3. Switch-Case Selection
        int day = 3;
        String dayName;
        switch (day) {
            case 1: dayName = "Monday"; break;
            case 2: dayName = "Tuesday"; break;
            case 3: dayName = "Wednesday"; break;
            case 4: dayName = "Thursday"; break;
            case 5: dayName = "Friday"; break;
            case 6: dayName = "Saturday"; break;
            case 7: dayName = "Sunday"; break;
            default: dayName = "Invalid Day"; break;
        }
        System.out.println("Day " + day + " is: " + dayName);
    }
}
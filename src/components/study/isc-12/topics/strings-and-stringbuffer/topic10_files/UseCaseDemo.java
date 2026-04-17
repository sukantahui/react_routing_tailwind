// topic10_files/UseCaseDemo.java
public class UseCaseDemo {
    public static void main(String[] args) {
        // Use Case 1: Fixed constant (String)
        final String APP_NAME = "Student Management System";
        System.out.println("App: " + APP_NAME);
        
        // Use Case 2: Building a comma-separated list (StringBuilder)
        String[] students = {"Swadeep", "Tuhina", "Abhronila", "Debangshu"};
        StringBuilder list = new StringBuilder();
        for (int i = 0; i < students.length; i++) {
            list.append(students[i]);
            if (i < students.length - 1) list.append(", ");
        }
        System.out.println("Student list: " + list);
        
        // Use Case 3: Multi-threaded logging (StringBuffer)
        // Conceptual: multiple threads call this
        StringBuffer log = new StringBuffer();
        log.append("[INFO] Thread-1: Started\n");
        log.append("[INFO] Thread-2: Processing\n");
        System.out.println("Log buffer: " + log);
        
        // Use Case 4: HashMap key (String)
        java.util.HashMap<String, Integer> scores = new java.util.HashMap<>();
        scores.put("Swadeep", 95);
        scores.put("Tuhina", 88);
        System.out.println("Swadeep's score: " + scores.get("Swadeep"));
        
        // Use Case 5: Returning a string from a method (String, not StringBuilder)
        String processed = processText("  Hello World  ");
        System.out.println("Processed: '" + processed + "'");
        
        // Use Case 6: Building SQL query (StringBuilder)
        String name = "Swadeep";
        int age = 20;
        StringBuilder sql = new StringBuilder("INSERT INTO students (name, age) VALUES ('");
        sql.append(name).append("', ").append(age).append(")");
        System.out.println("SQL: " + sql);
    }
    
    // Good practice: return immutable String
    public static String processText(String input) {
        if (input == null) return "";
        StringBuilder sb = new StringBuilder(input.trim());
        sb.reverse();
        return sb.toString();  // return String, not StringBuilder
    }
}
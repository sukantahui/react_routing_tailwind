// topic8_files/WhenToUseWhat.java
public class WhenToUseWhat {
    public static void main(String[] args) {
        // Scenario 1: Fixed text (use String)
        String greeting = "Welcome to Barrackpore!";
        String name = "Swadeep";
        System.out.println(greeting + " " + name);  // fine for few concatenations
        
        // Scenario 2: Building a string in a loop (use StringBuilder)
        StringBuilder csv = new StringBuilder();
        String[] students = {"Swadeep", "Tuhina", "Abhronila", "Debangshu"};
        for (int i = 0; i < students.length; i++) {
            csv.append(students[i]);
            if (i < students.length - 1) csv.append(", ");
        }
        System.out.println("CSV: " + csv);
        
        // Scenario 3: Multi‑threaded logging (use StringBuffer)
        // (Conceptual – would need multiple threads)
        StringBuffer log = new StringBuffer();
        // Imagine multiple threads calling log.append(...)
        log.append("[INFO] Application started\n");
        log.append("[WARN] Low memory\n");
        System.out.println("Log buffer: " + log);
        
        // Scenario 4: HashMap key (use String)
        String key = "user:123";
        java.util.HashMap<String, String> map = new java.util.HashMap<>();
        map.put(key, "Swadeep Mukherjee");
        System.out.println("Value: " + map.get("user:123"));
        
        // BAD: Using StringBuilder as key
        StringBuilder badKey = new StringBuilder("user");
        map.put(badKey.toString(), "This works if you convert to String");
        // But don't use mutable objects as keys directly
        
        // Scenario 5: Returning a string (return String, not StringBuilder)
        String processed = processText("  Hello World  ");
        System.out.println("Processed: '" + processed + "'");
    }
    
    // Good practice: return immutable String
    public static String processText(String input) {
        if (input == null) return "";
        // Use StringBuilder internally for efficiency
        StringBuilder sb = new StringBuilder(input.trim());
        sb.reverse();
        return sb.toString();  // return String
    }
}
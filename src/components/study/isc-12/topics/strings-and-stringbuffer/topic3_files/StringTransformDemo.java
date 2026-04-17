// topic3_files/StringTransformDemo.java
public class StringTransformDemo {
    public static void main(String[] args) {
        // Real-world data cleaning
        String userInput = "  Swadeep@GMAIL.com  ";
        String cleaned = userInput.trim().toLowerCase();
        System.out.println("Cleaned email: '" + cleaned + "'");
        
        // Phone number formatting
        String phone = "9876543210";
        String formatted = phone.replaceFirst("(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3");
        System.out.println("Formatted phone: " + formatted);
        
        // Removing extra spaces
        String messy = "Ichapur    is   a   city";
        String normalized = messy.replaceAll("\\s+", " ");
        System.out.println("Normalized: " + normalized);
        
        // Checking file extension
        String filename = "report.pdf";
        if (filename.endsWith(".pdf")) {
            System.out.println("It's a PDF file.");
        }
        
        // Extracting city from address
        String address = "123 Main St, Shyamnagar, West Bengal";
        int firstComma = address.indexOf(',');
        int secondComma = address.indexOf(',', firstComma + 1);
        String city = address.substring(firstComma + 2, secondComma);
        System.out.println("City: " + city);
        
        // Chaining example
        String result = "  Hello   World  ".trim().replaceAll("\\s+", " ").toUpperCase();
        System.out.println("Chained result: " + result); // "HELLO WORLD"
        
        // Repeat (Java 11+)
        String line = "-".repeat(30);
        System.out.println(line);
    }
}
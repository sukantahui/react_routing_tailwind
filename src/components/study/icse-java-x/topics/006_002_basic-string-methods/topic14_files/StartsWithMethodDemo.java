// StartsWithMethodDemo.java
// ICSE Class X: startsWith() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class StartsWithMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: startsWith() ===");
        
        String phone = "+91-9876543210";
        String url = "https://coderandaccotax.in";
        String name = "Dr. Swadeep Banerjee";
        
        // 1. Prefix checks
        System.out.println("Is Indian number (+91)? " + phone.startsWith("+91")); // true
        System.out.println("Is secure HTTPS URL? " + url.startsWith("https://")); // true
        System.out.println("Is Doctor title? " + name.startsWith("Dr.")); // true
        
        // 2. Case sensitivity
        System.out.println("Phone starts with lowercase? " + phone.startsWith("+91"));
        System.out.println("URL starts with uppercase HTTP? " + url.startsWith("HTTPS")); // false
        
        // 3. Offset variation: checks if 'Swadeep' starts at index 4
        System.out.println("Starts with 'Swadeep' at index 4? " + name.startsWith("Swadeep", 4)); // true
    }
}
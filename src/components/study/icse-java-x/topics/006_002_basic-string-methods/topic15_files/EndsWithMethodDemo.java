// EndsWithMethodDemo.java
// ICSE Class X: endsWith() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class EndsWithMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: endsWith() ===");
        
        String filename = "QuestionPaper2026.java";
        String email = "student@barrackpore.edu";
        
        // 1. File extension validation
        System.out.println("Is Java source file? " + filename.endsWith(".java")); // true
        System.out.println("Is PDF document? " + filename.endsWith(".pdf")); // false
        
        // 2. Domain check
        System.out.println("Is educational email? " + email.endsWith(".edu")); // true
        
        // 3. Case sensitivity trap
        String photo = "pic.PNG";
        System.out.println("photo.endsWith('.png'): " + photo.endsWith(".png")); // false
        System.out.println("Normalized check: " + photo.toLowerCase().endsWith(".png")); // true
        
        // 4. Trailing whitespace trap
        String faulty = "document.pdf ";
        System.out.println("Faulty trailing space check: " + faulty.endsWith(".pdf")); // false
        System.out.println("Trimmed before check: " + faulty.trim().endsWith(".pdf")); // true
    }
}
// UserDefinedMethodsIntroDemo.java
// Revision of Class IX User-Defined Methods
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class UserDefinedMethodsIntroDemo {
    
    // Method 1: Returns a double (calculates simple interest)
    public static double calcInterest(double p, double r, double t) {
        double interest = (p * r * t) / 100.0;
        return interest; // returns computed double to caller
    }
    
    // Method 2: Returns a boolean (prime number check)
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    // Method 3: Void method (prints formatted student banner)
    public static void printBanner(String name, int roll) {
        System.out.println("----------------------------------------");
        System.out.println("Student: " + name + " | Roll: " + roll);
        System.out.println("----------------------------------------");
    }

    public static void main(String[] args) {
        System.out.println("=== CLASS IX REVISION: USER DEFINED METHODS ===");
        
        // Calling void method
        printBanner("Swadeep", 101);
        
        // Calling method with return value
        double si = calcInterest(10000, 6.5, 2);
        System.out.println("Simple Interest: Rs " + si);
        
        // Calling predicate method
        int testNum = 29;
        System.out.println("Is " + testNum + " Prime? " + isPrime(testNum));
    }
}
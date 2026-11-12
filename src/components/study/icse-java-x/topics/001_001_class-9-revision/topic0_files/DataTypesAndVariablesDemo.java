// DataTypesAndVariablesDemo.java
// Revision of Class IX Primitives & Type Casting
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class DataTypesAndVariablesDemo {
    public static void main(String[] args) {
        System.out.println("=== CLASS IX REVISION: DATA TYPES & CASTING ===");
        
        // 1. Primitive Declarations
        byte b = 127;
        short s = 32000;
        int i = 2147483647;
        long l = 9876543210L;
        float f = 3.14159f;
        double d = 2.718281828459045;
        char ch = 'A';
        boolean flag = true;
        
        System.out.println("char value: " + ch + " (ASCII: " + (int)ch + ")");
        System.out.println("boolean flag: " + flag);
        
        // 2. Implicit Widening Type Casting
        int num = 45;
        double widened = num; // int automatically widened to double
        System.out.println("Implicit Widening (int 45 -> double): " + widened);
        
        // 3. Explicit Narrowing Type Casting
        double price = 99.85;
        int rounded = (int) price; // explicit truncation
        System.out.println("Explicit Narrowing (double 99.85 -> int): " + rounded);
        
        // 4. Character Arithmetic
        char nextChar = (char)(ch + 1);
        System.out.println("Character Arithmetic ('A' + 1): " + nextChar);
        
        // 5. Integer Division Caveat
        int x = 5, y = 2;
        System.out.println("Integer Division (5 / 2): " + (x / y));
        System.out.println("Double Division ((double)5 / 2): " + ((double)x / y));
    }
}
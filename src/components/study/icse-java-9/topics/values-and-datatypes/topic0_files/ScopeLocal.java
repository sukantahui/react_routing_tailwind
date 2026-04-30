// topic0_files/ScopeLocal.java
// Illustrates local variable scope and errors when out of scope

public class ScopeLocal {
    public static void main(String[] args) {
        // Local variable inside main
        int x = 10;

        if (x > 5) {
            int y = 20;    // y's scope is only inside this if block
            System.out.println("Inside if: x=" + x + ", y=" + y);
        }

        System.out.println("Outside if: x=" + x);
        // The following line would cause error: cannot find symbol y
        // System.out.println(y);
    }

    public void testMethod() {
        // x is not accessible here; each method has its own scope
        // System.out.println(x); // ERROR
    }
}
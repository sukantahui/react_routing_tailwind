// topic0_files/InitBestPractice.java
// Best practices for variable initialization to avoid errors

public class InitBestPractice {
    // Good: Initialize instance variables at declaration where possible
    private int id = -1;
    private String name = "Unknown";

    // Or initialize in constructor
    private double salary;

    public InitBestPractice(double salary) {
        this.salary = salary;  // mandatory initialization
    }

    // Always initialize local variables before use
    public void process() {
        int count = 0;          // explicit initialization
        boolean flag = false;   // explicit initialization

        if (flag) {
            count = 10;
        }
        // count is always initialized regardless of flag
        System.out.println("Count: " + count);
    }

    public static void main(String[] args) {
        InitBestPractice obj = new InitBestPractice(50000);
        obj.process();

        // Wrong: uninitialized local variable
        // int x;
        // System.out.println(x); // COMPILE ERROR
    }
}
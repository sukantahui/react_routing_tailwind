// topic0_files/ShadowingExample.java
// Shows variable shadowing (local variable hides instance variable)

public class ShadowingExample {
    private int value = 100;  // instance variable

    public void setValue(int value) {  // parameter shadows instance variable
        // Using 'this' to refer to instance variable
        this.value = value;    // assigns parameter to instance variable
        System.out.println("Parameter value: " + value);
        System.out.println("Instance value: " + this.value);
    }

    public void shadowBlock() {
        int x = 5;
        if (true) {
            int x = 10;   // ERROR: variable x is already defined in method
            // In Java, you cannot shadow a local variable inside a nested block
        }
        // But you can shadow an instance variable with a local variable:
        String value = "Shadowed";
        System.out.println("Local value: " + value);  // refers to local, not instance
        System.out.println("Instance value: " + this.value);
    }

    public static void main(String[] args) {
        ShadowingExample ex = new ShadowingExample();
        ex.setValue(250);
        ex.shadowBlock();
    }
}
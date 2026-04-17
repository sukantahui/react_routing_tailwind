// ConflictResolution.java
interface A {
    default void log() {
        System.out.println("A.log");
    }
}

interface B {
    default void log() {
        System.out.println("B.log");
    }
}

// Class implementing both interfaces – must resolve conflict
public class ConflictResolution implements A, B {
    // Override to resolve conflict
    @Override
    public void log() {
        System.out.println("My own log");
        // optionally call one of the defaults
        A.super.log();   // calls A's default
        // B.super.log(); // would call B's default
    }

    public static void main(String[] args) {
        ConflictResolution obj = new ConflictResolution();
        obj.log();
    }
}
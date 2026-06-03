// ComparisonDemo.java
public class ComparisonDemo {
    public static void main(String[] args) {
        // Using abstract class
        VehicleAbstract car1 = new CarAbstractImpl("Toyota", "Camry");
        car1.refuel(50);
        car1.start();
        System.out.println("Fuel level: " + car1.getFuelLevel());

        // Using interface
        VehicleInterface car2 = new CarInterfaceImpl("Honda", "Civic");
        car2.start();
        car2.refuel(30); // overridden
        // car2.getFuelLevel() // not available – interface has no state

        // Static method from interface
        VehicleInterface.printMaxSpeed();
    }
}
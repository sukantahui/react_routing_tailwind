// StaticMethodDemo.java
public class StaticMethodDemo {
    public static void main(String[] args) {
        // Calling static method from interface
        int maxSpeed = VehicleWithDefault.getMaxSpeed();
        System.out.println("Max speed from interface: " + maxSpeed);

        // This would NOT compile:
        // CarDefaultImpl.getMaxSpeed(); // static method not inherited

        CarDefaultImpl car = new CarDefaultImpl();
        car.start();
        car.honk(); // uses overridden version
        car.stop();
    }
}
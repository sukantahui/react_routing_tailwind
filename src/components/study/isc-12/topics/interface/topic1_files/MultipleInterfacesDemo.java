// MultipleInterfacesDemo.java
// Additional interface
interface ElectricVehicle {
    void chargeBattery();
}

// Class implementing two interfaces
class ElectricCar extends Car implements ElectricVehicle {
    @Override
    public void chargeBattery() {
        System.out.println("Charging battery...");
    }
}

public class MultipleInterfacesDemo {
    public static void main(String[] args) {
        // Polymorphic usage
        VehicleInterface myVehicle = new Car();
        myVehicle.startEngine();
        System.out.println("Fuel: " + myVehicle.getFuelLevel());

        ElectricCar tesla = new ElectricCar();
        tesla.chargeBattery();
        tesla.honk(); // from Car
        tesla.startEngine();
    }
}
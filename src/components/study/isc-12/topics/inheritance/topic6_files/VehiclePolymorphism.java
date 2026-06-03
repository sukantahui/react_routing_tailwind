// VehiclePolymorphism.java - Dynamic Dispatch & Method Overriding
// Story: Debangshu's garage in Shyamnagar

class Vehicle {
    protected String brand;
    
    Vehicle(String brand) {
        this.brand = brand;
    }
    
    void start() {
        System.out.println(brand + " vehicle is starting.");
    }
    
    void stop() {
        System.out.println(brand + " vehicle is stopping.");
    }
}

class Car extends Vehicle {
    private int numberOfDoors;
    
    Car(String brand, int doors) {
        super(brand);
        this.numberOfDoors = doors;
    }
    
    @Override
    void start() {
        System.out.println(brand + " car starts with ignition key.");
    }
    
    void openSunroof() {
        System.out.println(brand + " sunroof opened.");
    }
}

class Bike extends Vehicle {
    private boolean hasGear;
    
    Bike(String brand, boolean gear) {
        super(brand);
        this.hasGear = gear;
    }
    
    @Override
    void start() {
        System.out.println(brand + " bike starts with kick or self-start.");
    }
    
    void wheelie() {
        System.out.println(brand + " bike does a wheelie!");
    }
}

class ElectricCar extends Car {
    private int batteryCapacity;
    
    ElectricCar(String brand, int doors, int battery) {
        super(brand, doors);
        this.batteryCapacity = battery;
    }
    
    @Override
    void start() {
        System.out.println(brand + " electric car starts silently.");
    }
    
    void charge() {
        System.out.println(brand + " is charging with " + batteryCapacity + "kWh battery.");
    }
}

public class VehiclePolymorphism {
    public static void main(String[] args) {
        Vehicle v1 = new Car("Toyota", 4);
        Vehicle v2 = new Bike("Yamaha", true);
        Vehicle v3 = new ElectricCar("Tesla", 4, 75);
        
        Vehicle[] fleet = {v1, v2, v3};
        
        System.out.println("--- Starting all vehicles ---");
        for (Vehicle v : fleet) {
            v.start();   // dynamic dispatch in action!
        }
        
        System.out.println("\n--- Stopping all vehicles ---");
        for (Vehicle v : fleet) {
            v.stop();
        }
        
        // Accessing subclass-specific methods requires downcasting
        if (v3 instanceof ElectricCar) {
            ((ElectricCar) v3).charge();
        }
    }
}
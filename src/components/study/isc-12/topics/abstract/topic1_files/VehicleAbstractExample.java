// VehicleAbstractExample.java
// Real-world abstraction: Vehicle with abstract refuel method

abstract class Vehicle {
    protected String model;
    protected int fuelLevel; // in liters or percentage
    
    public Vehicle(String model) {
        this.model = model;
        this.fuelLevel = 0;
    }
    
    // Concrete method - common for all vehicles
    public void start() {
        if (fuelLevel > 0) {
            System.out.println(model + " engine started. Vroom!");
        } else {
            System.out.println(model + " cannot start. No fuel/charge!");
        }
    }
    
    public void stop() {
        System.out.println(model + " engine stopped.");
    }
    
    // Concrete method with default behavior (can be overridden)
    public void displayFuelStatus() {
        System.out.println(model + " fuel/charge level: " + fuelLevel);
    }
    
    // Abstract method - each vehicle refuels differently
    public abstract void refuel(int amount);
    
    // Another abstract method
    public abstract int getRange();
}

class PetrolCar extends Vehicle {
    private int fuelEfficiency; // km per liter
    
    public PetrolCar(String model, int fuelEfficiency) {
        super(model);
        this.fuelEfficiency = fuelEfficiency;
    }
    
    @Override
    public void refuel(int liters) {
        if (liters > 0) {
            fuelLevel += liters;
            System.out.println(model + " refueled with " + liters + " liters of petrol.");
            System.out.println("Fuel level now: " + fuelLevel + " liters");
        }
    }
    
    @Override
    public int getRange() {
        return fuelLevel * fuelEfficiency;
    }
}

class ElectricCar extends Vehicle {
    private int batteryEfficiency; // km per kWh
    private int maxBattery = 100; // percentage
    
    public ElectricCar(String model, int batteryEfficiency) {
        super(model);
        this.batteryEfficiency = batteryEfficiency;
        this.fuelLevel = 0; // fuelLevel represents charge %
    }
    
    @Override
    public void refuel(int chargePercent) {
        if (chargePercent > 0 && chargePercent <= 100) {
            fuelLevel = Math.min(maxBattery, chargePercent);
            System.out.println(model + " charged to " + fuelLevel + "%.");
            System.out.println("Battery level: " + fuelLevel + "%");
        }
    }
    
    @Override
    public int getRange() {
        // range = battery% * efficiency (simplified)
        return (fuelLevel * batteryEfficiency) / 100;
    }
    
    // Additional electric-specific method
    public void displayBatteryHealth() {
        System.out.println(model + " battery health: optimal");
    }
}

public class VehicleAbstractExample {
    public static void main(String[] args) {
        Vehicle car = new PetrolCar("Toyota Camry", 15);
        Vehicle ev = new ElectricCar("Tesla Model 3", 200);
        
        car.refuel(40);
        car.start();
        System.out.println("Range: " + car.getRange() + " km");
        car.stop();
        
        System.out.println();
        
        ev.refuel(80);
        ev.start();
        System.out.println("Range: " + ev.getRange() + " km");
        ev.stop();
        
        // ((ElectricCar) ev).displayBatteryHealth(); // downcasting to access specific method
    }
}
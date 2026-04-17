// AbstractInheritanceChain.java
// Demonstrates multi-level inheritance with abstract classes

// Level 1: Most abstract
abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    // Abstract methods at top level
    public abstract void makeSound();
    public abstract void move();
    
    // Concrete method
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public String getName() {
        return name;
    }
}

// Level 2: Partial implementation - still abstract
abstract class Mammal extends Animal {
    protected int bodyTemperature = 37; // Celsius
    
    public Mammal(String name) {
        super(name);
    }
    
    // Implements move() - all mammals move similarly
    @Override
    public void move() {
        System.out.println(name + " is walking/running");
    }
    
    // Adds new abstract method specific to mammals
    public abstract void feedMilk();
    
    // Concrete method for mammals
    public void regulateTemperature() {
        System.out.println(name + " regulating body temperature: " + bodyTemperature + "°C");
    }
}

// Level 3: Further specialization - still abstract?
abstract class Canine extends Mammal {
    public Canine(String name) {
        super(name);
    }
    
    // Can override or add more abstract methods
    public abstract void howl();
    
    // Concrete method for all canines
    public void wagTail() {
        System.out.println(name + " is wagging tail");
    }
}

// Level 4: Concrete class
class Dog extends Canine {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof! Woof!");
    }
    
    @Override
    public void feedMilk() {
        System.out.println(name + " the puppy drinks mother's milk");
    }
    
    @Override
    public void howl() {
        System.out.println(name + " howls: Awooooo!");
    }
    
    // Dog-specific behavior
    public void fetch() {
        System.out.println(name + " is fetching the ball");
    }
}

// Another concrete class at level 4
class Wolf extends Canine {
    private String packName;
    
    public Wolf(String name, String packName) {
        super(name);
        this.packName = packName;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " growls deeply");
    }
    
    @Override
    public void feedMilk() {
        System.out.println(name + " (wolf pup) nurses");
    }
    
    @Override
    public void howl() {
        System.out.println(name + " howls to the moon!");
    }
    
    public void huntInPack() {
        System.out.println(name + " is hunting with pack: " + packName);
    }
}

public class AbstractInheritanceChain {
    public static void main(String[] args) {
        System.out.println("=== Multi-Level Abstract Inheritance ===\n");
        
        // Polymorphic array using top-level abstract type
        Animal[] animals = {
            new Dog("Buddy", "Golden Retriever"),
            new Wolf("Shadow", "Northern Pack")
        };
        
        for (Animal animal : animals) {
            System.out.println("--- " + animal.getName() + " ---");
            animal.makeSound();
            animal.move();
            animal.eat();
            
            // Check if it's a Canine (downcasting)
            if (animal instanceof Canine) {
                Canine canine = (Canine) animal;
                canine.howl();
                canine.wagTail();
            }
            
            // Check for specific types
            if (animal instanceof Dog) {
                ((Dog) animal).fetch();
            } else if (animal instanceof Wolf) {
                ((Wolf) animal).huntInPack();
            }
            System.out.println();
        }
        
        // Demonstrate inheritance depth
        System.out.println("=== Inheritance Chain Length ===");
        Dog dog = new Dog("Max", "Beagle");
        System.out.println("Dog class hierarchy:");
        System.out.println("Dog extends Canine extends Mammal extends Animal extends Object");
        System.out.println("Total levels: 5 (including Object)");
    }
}
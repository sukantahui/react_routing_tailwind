// Basic Method Overriding Example
class Animal {
    String name;
    int age;
    
    public void makeSound() {
        System.out.println(name + " makes a generic animal sound");
    }
    
    public void move() {
        System.out.println(name + " moves in some way");
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

class Dog extends Animal {
    String breed;
    
    @Override
    public void makeSound() {
        System.out.println(name + " the " + breed + " barks: Woof! Woof!");
    }
    
    @Override
    public void move() {
        System.out.println(name + " runs on four legs");
    }
    
    // New method specific to Dog
    public void wagTail() {
        System.out.println(name + " is wagging tail happily!");
    }
}

class Cat extends Animal {
    String color;
    
    @Override
    public void makeSound() {
        System.out.println(name + " the " + color + " cat meows: Meow! Meow!");
    }
    
    @Override
    public void move() {
        System.out.println(name + " walks silently");
    }
    
    public void climb() {
        System.out.println(name + " is climbing a tree");
    }
}

public class BasicMethodOverriding {
    public static void main(String[] args) {
        System.out.println("=== Method Overriding Demo ===\n");
        
        // Dog object
        Dog dog = new Dog();
        dog.name = "Tommy";
        dog.age = 3;
        dog.breed = "Golden Retriever";
        
        System.out.println("--- Dog Behavior ---");
        dog.makeSound();  // Overridden
        dog.move();       // Overridden
        dog.eat();        // Inherited
        dog.wagTail();    // Own method
        
        System.out.println("\n--- Cat Behavior ---");
        
        // Cat object
        Cat cat = new Cat();
        cat.name = "Whiskers";
        cat.age = 2;
        cat.color = "White";
        
        cat.makeSound();  // Overridden
        cat.move();       // Overridden
        cat.eat();        // Inherited
        cat.climb();      // Own method
        
        System.out.println("\n--- Polymorphism in Action ---");
        // Parent reference, child object
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();
        
        animal1.name = "Buddy";
        animal2.name = "Mittens";
        
        animal1.makeSound();  // Calls Dog's version
        animal2.makeSound();  // Calls Cat's version
    }
}
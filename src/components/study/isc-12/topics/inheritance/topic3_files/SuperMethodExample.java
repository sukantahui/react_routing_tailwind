// SuperMethodExample.java
// Demonstrates using 'super' to call overridden parent class methods

class Animal {
    String species;
    
    Animal(String species) {
        this.species = species;
    }
    
    void makeSound() {
        System.out.println("The " + species + " makes a generic animal sound");
    }
    
    void eat() {
        System.out.println("The " + species + " is eating");
    }
}

class Dog extends Animal {
    String breed;
    
    Dog(String species, String breed) {
        super(species);  // Calling parent constructor
        this.breed = breed;
    }
    
    @Override
    void makeSound() {
        System.out.println("The " + breed + " dog barks: Woof! Woof!");
    }
    
    void demonstrateSuper() {
        System.out.println("\n--- Using super to call parent's overridden method ---");
        super.makeSound();  // Calls Animal's makeSound() method
        
        System.out.println("\n--- Calling parent's eat() method (not overridden) ---");
        super.eat();  // Works even though not overridden
        
        System.out.println("\n--- Calling child's own overridden method ---");
        this.makeSound();  // Calls Dog's makeSound()
    }
}

class Cat extends Animal {
    String color;
    
    Cat(String species, String color) {
        super(species);
        this.color = color;
    }
    
    @Override
    void makeSound() {
        System.out.println("The " + color + " cat meows: Meow! Meow!");
    }
    
    void compareSounds() {
        System.out.println("\n=== Comparing Parent vs Child Sounds ===");
        this.makeSound();      // Child's version
        super.makeSound();     // Parent's original version
    }
}

public class SuperMethodExample {
    public static void main(String[] args) {
        System.out.println("=== super Keyword - Method Access Demo ===\n");
        
        Dog dog = new Dog("Canine", "Golden Retriever");
        dog.demonstrateSuper();
        
        Cat cat = new Cat("Feline", "Orange");
        cat.compareSounds();
    }
}

/* EXPECTED OUTPUT:
=== super Keyword - Method Access Demo ===

--- Using super to call parent's overridden method ---
The Canine makes a generic animal sound

--- Calling parent's eat() method (not overridden) ---
The Canine is eating

--- Calling child's own overridden method ---
The Golden Retriever dog barks: Woof! Woof!

=== Comparing Parent vs Child Sounds ===
The Orange cat meows: Meow! Meow!
The Feline makes a generic animal sound
*/
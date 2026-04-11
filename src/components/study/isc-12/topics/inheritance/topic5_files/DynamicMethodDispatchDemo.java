// DynamicMethodDispatchDemo.java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks: Woof Woof!");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows: Meow Meow!");
    }
}

public class DynamicMethodDispatchDemo {
    public static void main(String[] args) {
        Animal myAnimal;   // reference of type Animal
        
        myAnimal = new Dog();
        myAnimal.sound();  // Output: Dog barks: Woof Woof!
        
        myAnimal = new Cat();
        myAnimal.sound();  // Output: Cat meows: Meow Meow!
        
        // Real-world: Swadeep uses a single reference to handle different animals
    }
}
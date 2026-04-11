// SuperCallDemo.java
class Person {
    String name;
    Person(String name) {
        this.name = name;
        System.out.println("Person constructor: " + name);
    }
}

class Student extends Person {
    int roll;
    Student(String name, int roll) {
        super(name);  // explicit call to parameterized parent constructor
        this.roll = roll;
        System.out.println("Student constructor: roll " + roll);
    }
}

public class SuperCallDemo {
    public static void main(String[] args) {
        Student s = new Student("Tuhina", 101);
    }
}
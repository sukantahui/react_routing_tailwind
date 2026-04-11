// RuntimePolymorphismDemo.java
// Demonstrating runtime polymorphism with an array of superclass references
class Student {
    void study() {
        System.out.println("Student studies general subjects");
    }
}

class ArtStudent extends Student {
    @Override
    void study() {
        System.out.println("ArtStudent paints and draws");
    }
}

class ScienceStudent extends Student {
    @Override
    void study() {
        System.out.println("ScienceStudent does experiments");
    }
}

class CommerceStudent extends Student {
    @Override
    void study() {
        System.out.println("CommerceStudent learns accounting");
    }
}

public class RuntimePolymorphismDemo {
    public static void main(String[] args) {
        // Array of superclass references
        Student[] students = {
            new ArtStudent(),
            new ScienceStudent(),
            new CommerceStudent(),
            new Student()
        };
        
        // Dynamic dispatch in a loop – each object's own study() is called
        for (Student s : students) {
            s.study();   // Which version runs? Depends on actual object type!
        }
        
        // Output:
        // ArtStudent paints and draws
        // ScienceStudent does experiments
        // CommerceStudent learns accounting
        // Student studies general subjects
        
        // Real-world: Tuhina's school can manage all students uniformly
        // while each behaves according to their specialization.
    }
}
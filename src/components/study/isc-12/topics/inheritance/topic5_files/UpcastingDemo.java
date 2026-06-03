// UpcastingDemo.java
class Teacher {
    void introduce() {
        System.out.println("I am a teacher");
    }
}

class MathTeacher extends Teacher {
    @Override
    void introduce() {
        System.out.println("I am a Math teacher, I love numbers");
    }
    
    void teachAlgebra() {
        System.out.println("Teaching algebra...");
    }
}

public class UpcastingDemo {
    public static void main(String[] args) {
        // Upcasting: subclass object assigned to superclass reference
        Teacher t = new MathTeacher();   // implicit upcasting
        t.introduce();   // dynamic dispatch calls MathTeacher's introduce()
        
        // t.teachAlgebra(); // ERROR! Reference type Teacher doesn't know teachAlgebra()
        
        // But the object is still a MathTeacher – dynamic dispatch works for overridden methods only.
        
        // Downcasting (with care)
        if (t instanceof MathTeacher) {
            MathTeacher mt = (MathTeacher) t;
            mt.teachAlgebra(); // Now it's safe
        }
    }
}
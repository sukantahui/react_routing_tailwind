// Real-world School Management System Example
class Person {
    String name;
    int age;
    String address;
    
    public void introduce() {
        System.out.println("Hi, I'm " + name + " from " + address);
    }
    
    public void celebrateBirthday() {
        age++;
        System.out.println(name + " is now " + age + " years old!");
    }
}

class Student extends Person {
    int rollNumber;
    String grade;
    String[] subjects = {"Math", "Science", "English"};
    
    public void study() {
        System.out.println(name + " is studying for " + grade + " grade");
    }
    
    public void attendClass() {
        System.out.println("Student " + name + " (Roll No: " + rollNumber + ") is attending class");
    }
    
    public void showSubjects() {
        System.out.print(name + "'s subjects: ");
        for(String subject : subjects) {
            System.out.print(subject + " ");
        }
        System.out.println();
    }
}

class Teacher extends Person {
    String employeeId;
    String subject;
    
    public void teach() {
        System.out.println("Teacher " + name + " is teaching " + subject);
    }
    
    public void gradePapers() {
        System.out.println(name + " is grading " + subject + " papers");
    }
}

public class InheritanceExample2 {
    public static void main(String[] args) {
        System.out.println("=== School Management System ===\n");
        
        // Creating a Student from Barrackpore
        Student student = new Student();
        student.name = "Tuhina";
        student.age = 15;
        student.address = "Barrackpore";
        student.rollNumber = 25;
        student.grade = "10th";
        
        student.introduce();
        student.study();
        student.attendClass();
        student.showSubjects();
        student.celebrateBirthday();
        
        System.out.println("\n--- --- ---\n");
        
        // Creating a Teacher from Shyamnagar
        Teacher teacher = new Teacher();
        teacher.name = "Abhronila";
        teacher.age = 32;
        teacher.address = "Shyamnagar";
        teacher.employeeId = "TCH-789";
        teacher.subject = "Computer Science";
        
        teacher.introduce();
        teacher.teach();
        teacher.gradePapers();
        teacher.celebrateBirthday();
    }
}

/* OUTPUT:
=== School Management System ===

Hi, I'm Tuhina from Barrackpore
Tuhina is studying for 10th grade
Student Tuhina (Roll No: 25) is attending class
Tuhina's subjects: Math Science English 
Tuhina is now 16 years old!

--- --- ---

Hi, I'm Abhronila from Shyamnagar
Teacher Abhronila is teaching Computer Science
Abhronila is grading Computer Science papers
Abhronila is now 33 years old!
*/
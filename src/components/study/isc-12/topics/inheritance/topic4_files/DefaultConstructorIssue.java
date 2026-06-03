// DefaultConstructorIssue.java
class Parent {
    Parent(int x) {
        System.out.println("Parent with value: " + x);
    }
}

// The following class will NOT compile because Parent has no default constructor.
// class Child extends Parent {
//     Child() {
//         // implicit super() tries to call Parent() -> ERROR
//     }
// }

// Correct version:
class ChildFixed extends Parent {
    ChildFixed() {
        super(100);  // explicit call solves the issue
        System.out.println("Child constructor");
    }
}

public class DefaultConstructorIssue {
    public static void main(String[] args) {
        ChildFixed obj = new ChildFixed();
    }
}
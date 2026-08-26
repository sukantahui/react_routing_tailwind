/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 1: Upper Bounded Type Parameters: Syntax (<T extends SuperClassOrInterface>)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

// Base Domain Model:
class AcademicMember {
    private final String name;
    private final String branch;

    public AcademicMember(String name, String branch) {
        this.name = name;
        this.branch = branch;
    }

    public String getName() { return name; }
    public String getBranch() { return branch; }
}

class TraineeStudent extends AcademicMember {
    public TraineeStudent(String name, String branch) { super(name, branch); }
}

class FacultyInstructor extends AcademicMember {
    public FacultyInstructor(String name, String branch) { super(name, branch); }
}

// Upper Bounded Generic Registry (T must be AcademicMember or its subclasses):
class BranchDirectory<T extends AcademicMember> {
    public void printBadge(T member) {
        System.out.printf("  [BADGE] Name: %-18s | Branch: %s%n", member.getName(), member.getBranch());
    }
}

public class UpperBoundedTypeParameterSyntaxDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: UPPER BOUNDED TYPE PARAMETERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BranchDirectory<TraineeStudent> studentDir = new BranchDirectory<>();
        BranchDirectory<FacultyInstructor> facultyDir = new BranchDirectory<>();

        System.out.println(">>> 1. Printing Badges for Upper Bounded Entities:");
        studentDir.printBadge(new TraineeStudent("Swadeep Paul", "Barrackpore Central"));
        studentDir.printBadge(new TraineeStudent("Tuhina Das", "Naihati Center"));
        facultyDir.printBadge(new FacultyInstructor("Sukanta Hui", "Barrackpore Head"));

        System.out.println("\n>>> UPPER BOUND TERMINOLOGY:");
        System.out.println("  - In '<T extends AcademicMember>', 'AcademicMember' acts as the UPPER BOUND (inclusive ceiling).");
        System.out.println("  - Any subtype below AcademicMember in the inheritance tree is permissible.");

        System.out.println("\n==========================================================================");
    }
}
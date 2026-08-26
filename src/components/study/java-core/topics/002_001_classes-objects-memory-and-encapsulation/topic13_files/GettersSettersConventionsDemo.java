/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 13: Getter and Setter Methods: Accessor and Mutator Conventions
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The JavaBeans Specification & Accessor/Mutator Patterns
 * ----------------------------------------------------------------------------
 * 1. What are Getters (Accessors) and Setters (Mutators)?
 *    - Standardized public methods used to read (get) and update (set) private fields.
 *    - They form the official Java contract defined in the JavaBeans API Specification (1997).
 *
 * 2. Official JavaBean Naming Conventions:
 *    -------------------------------------------------------------------------
 *    PROPERTY TYPE      FIELD NAME         GETTER CONVENTION      SETTER CONVENTION
 *    -------------------------------------------------------------------------
 *    Object/Primitive   studentName        getStudentName()       setStudentName(String n)
 *    Numeric            courseFeeInr       getCourseFeeInr()      setCourseFeeInr(double f)
 *    boolean (Primitive)isScholarshipHolder isScholarshipHolder()  setScholarshipHolder(boolean b)
 *    Boolean (Wrapper)  isEnrolled         getIsEnrolled()        setIsEnrolled(Boolean b)
 *    Indexed Array/List skills             getSkills(int i)       setSkills(int i, String s)
 *    -------------------------------------------------------------------------
 *
 * 3. Why Frameworks Rely on JavaBean Conventions:
 *    - Spring Boot (JSON serialization via Jackson)
 *    - Hibernate / JPA (Entity property mapping)
 *    - Jakarta EE / Struts / JSP (EL expression `${student.studentName}`)
 *    All frameworks inspect class metadata via Reflection to find `get...` and `set...`
 *    methods rather than reading fields directly!
 *
 * 4. Fluent Setters:
 *    - Standard JavaBeans specify `void setProperty(...)`, but modern fluent builders
 *      return `this` (`return this;`) for method chaining.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class GettersSettersConventionsDemo {

    // ------------------------------------------------------------------------
    // Domain Class: TraineeEnrollmentBean (Strict JavaBean Standard)
    // ------------------------------------------------------------------------
    public static class TraineeEnrollmentBean {

        // --- Private Encapsulated Properties ---
        private int rollNumber;
        private String studentFullName;
        private double courseFeeInr;
        private boolean activeScholarship;   // Primitive boolean -> uses is...() getter
        private Boolean remoteAccessGranted; // Wrapper Boolean -> uses get...() getter
        private List<String> technicalSkillsList;

        // No-Arg Constructor (Mandatory for JavaBean Specification & Frameworks)
        public TraineeEnrollmentBean() {
            this.technicalSkillsList = new ArrayList<>();
        }

        // Parameterized Constructor
        public TraineeEnrollmentBean(int rollNumber, String studentFullName, double courseFeeInr, boolean activeScholarship) {
            this();
            this.rollNumber = rollNumber;
            this.studentFullName = studentFullName;
            this.courseFeeInr = courseFeeInr;
            this.activeScholarship = activeScholarship;
            this.remoteAccessGranted = Boolean.FALSE;
        }

        // --- Standard JavaBean Accessors (Getters) ---
        public int getRollNumber() {
            return rollNumber;
        }

        public String getStudentFullName() {
            return studentFullName;
        }

        public double getCourseFeeInr() {
            return courseFeeInr;
        }

        // Primitive boolean getter: 'is' prefix convention
        public boolean isActiveScholarship() {
            return activeScholarship;
        }

        // Wrapper Boolean getter: 'get' prefix convention
        public Boolean getRemoteAccessGranted() {
            return remoteAccessGranted;
        }

        // Encapsulated collection getter (Unmodifiable View)
        public List<String> getTechnicalSkillsList() {
            return Collections.unmodifiableList(this.technicalSkillsList);
        }

        // Indexed Accessor: getSkill at index
        public String getSkill(int index) {
            if (index >= 0 && index < technicalSkillsList.size()) {
                return technicalSkillsList.get(index);
            }
            return null;
        }

        // --- Standard JavaBean Mutators (Setters) ---
        public void setRollNumber(int rollNumber) {
            if (rollNumber <= 0) {
                System.out.println("  [Setter Warning] Roll number must be positive. Rejected: " + rollNumber);
                return;
            }
            this.rollNumber = rollNumber;
        }

        public void setStudentFullName(String studentFullName) {
            if (studentFullName == null || studentFullName.trim().isEmpty()) {
                System.out.println("  [Setter Warning] Full name cannot be blank.");
                return;
            }
            this.studentFullName = studentFullName.trim();
        }

        public void setCourseFeeInr(double courseFeeInr) {
            if (courseFeeInr < 0.0) {
                System.out.println("  [Setter Warning] Course fee cannot be negative. Rejected: ₹" + courseFeeInr);
                return;
            }
            this.courseFeeInr = courseFeeInr;
        }

        public void setActiveScholarship(boolean activeScholarship) {
            this.activeScholarship = activeScholarship;
        }

        public void setRemoteAccessGranted(Boolean remoteAccessGranted) {
            this.remoteAccessGranted = (remoteAccessGranted != null) ? remoteAccessGranted : Boolean.FALSE;
        }

        // Indexed Mutator / Helper
        public void addSkill(String skill) {
            if (skill != null && !skill.trim().isEmpty()) {
                this.technicalSkillsList.add(skill.trim());
            }
        }

        // --- Modern Fluent Setter Variant (Returns 'this' for chaining) ---
        public TraineeEnrollmentBean withStudentFullName(String name) {
            setStudentFullName(name);
            return this;
        }

        public TraineeEnrollmentBean withCourseFeeInr(double fee) {
            setCourseFeeInr(fee);
            return this;
        }

        public void printBeanSummary() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | Roll Number    : %-42d |\n", rollNumber);
            System.out.printf("  | Student Name   : %-42s |\n", studentFullName);
            System.out.printf("  | Course Fee     : ₹%-42.2f |\n", courseFeeInr);
            System.out.printf("  | Has Scholarship: %-42b |\n", activeScholarship);
            System.out.printf("  | Remote Access  : %-42s |\n", remoteAccessGranted);
            System.out.printf("  | Skills Count   : %-42d |\n", technicalSkillsList.size());
            System.out.printf("  | Skills Items   : %-42s |\n", technicalSkillsList.toString());
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Simulated JSON Serializer using JavaBean Reflection Conventions
    // ------------------------------------------------------------------------
    public static void simulateJacksonJsonSerialization(TraineeEnrollmentBean bean) {
        System.out.println("  --> [Simulating Jackson JSON Serializer]");
        System.out.println("      Jackson discovers getters via reflection: getRollNumber(), getStudentFullName(), etc.");
        System.out.println("      Generated JSON Payload:");
        System.out.println("      {");
        System.out.printf("        \"rollNumber\": %d,\n", bean.getRollNumber());
        System.out.printf("        \"studentFullName\": \"%s\",\n", bean.getStudentFullName());
        System.out.printf("        \"courseFeeInr\": %.2f,\n", bean.getCourseFeeInr());
        System.out.printf("        \"activeScholarship\": %b,\n", bean.isActiveScholarship());
        System.out.printf("        \"remoteAccessGranted\": %s,\n", bean.getRemoteAccessGranted());
        System.out.printf("        \"skills\": %s\n", bean.getTechnicalSkillsList().toString());
        System.out.println("      }");
        System.out.println("  <-- [Serialization Complete]\n");
    }

    // ------------------------------------------------------------------------
    // Main Method: Comprehensive Demonstrations of Accessor/Mutator Conventions
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: JAVABEAN GETTERS & SETTERS CONVENTIONS");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Instantiating Bean & Modifying via Setters
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Instantiating TraineeEnrollmentBean for Swadeep Paul (Barrackpore)");
        TraineeEnrollmentBean swadeepBean = new TraineeEnrollmentBean();

        // Mutating fields via standard setters
        swadeepBean.setRollNumber(101);
        swadeepBean.setStudentFullName("Swadeep Paul");
        swadeepBean.setCourseFeeInr(8500.00);
        swadeepBean.setActiveScholarship(true);
        swadeepBean.setRemoteAccessGranted(Boolean.TRUE);
        swadeepBean.addSkill("Core Java");
        swadeepBean.addSkill("Spring Boot");
        swadeepBean.addSkill("PostgreSQL");

        swadeepBean.printBeanSummary();

        // --------------------------------------------------------------------
        // DEMO 2: Reading Properties via Getters (Standard vs Boolean Conventions)
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 2: Inspecting Accessor Conventions");
        System.out.println("  getRollNumber()             : " + swadeepBean.getRollNumber());
        System.out.println("  getStudentFullName()        : " + swadeepBean.getStudentFullName());
        System.out.println("  getCourseFeeInr()           : ₹" + swadeepBean.getCourseFeeInr());
        System.out.println("  isActiveScholarship()       : " + swadeepBean.isActiveScholarship() + " (Primitive boolean uses 'is')");
        System.out.println("  getRemoteAccessGranted()    : " + swadeepBean.getRemoteAccessGranted() + " (Wrapper Boolean uses 'get')");
        System.out.println("  getSkill(0) [Indexed]       : " + swadeepBean.getSkill(0));

        // --------------------------------------------------------------------
        // DEMO 3: Testing Invariant Guards inside Setters
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 3: Testing Validation Logic in Mutators");
        System.out.println("Attempting invalid fee: swadeepBean.setCourseFeeInr(-5000.0);");
        swadeepBean.setCourseFeeInr(-5000.0); // Rejected!

        System.out.println("Attempting blank name: swadeepBean.setStudentFullName(\"  \");");
        swadeepBean.setStudentFullName("  "); // Rejected!

        // --------------------------------------------------------------------
        // DEMO 4: Modern Fluent Builder Chaining
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: Modern Fluent Chaining on Tuhina Das (Naihati)");
        TraineeEnrollmentBean tuhinaBean = new TraineeEnrollmentBean()
                .withStudentFullName("Tuhina Das")
                .withCourseFeeInr(9200.00);
        tuhinaBean.setRollNumber(102);
        tuhinaBean.setActiveScholarship(true);
        tuhinaBean.addSkill("Microservices");
        tuhinaBean.addSkill("Docker & Kubernetes");

        tuhinaBean.printBeanSummary();

        // --------------------------------------------------------------------
        // DEMO 5: Simulating Framework JSON Reflection
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 5: How Spring Boot / Jackson Utilizes JavaBean Getters");
        simulateJacksonJsonSerialization(swadeepBean);

        System.out.println("==========================================================================");
        System.out.println(" JAVABEAN GETTER & SETTER CONVENTIONS DEMO COMPLETE");
        System.out.println("==========================================================================");
    }
}

/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 7: Creating Mocks - @Mock, @InjectMocks & MockitoExtension
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class CreatingMocksInjectMocksDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CREATING MOCKS WITH @MOCK & @INJECTMOCKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> DECLARATIVE MOCKITO SETUP PATTERN (JUnit 5):");
        System.out.println("  @ExtendWith(MockitoExtension.class)");
        System.out.println("  class StudentServiceTest {\n");
        System.out.println("      @Mock");
        System.out.println("      private StudentRepository studentRepository; // Creates simulated mock\n");
        System.out.println("      @Mock");
        System.out.println("      private EmailNotificationService notificationService;\n");
        System.out.println("      @InjectMocks");
        System.out.println("      private StudentService studentService; // Injects mocks into StudentService\n");
        System.out.println("      @Test");
        System.out.println("      void testStudentEnrollment() {");
        System.out.println("          // Test logic here...");
        System.out.println("      }");
        System.out.println("  }");

        System.out.println("\n==========================================================================");
    }
}

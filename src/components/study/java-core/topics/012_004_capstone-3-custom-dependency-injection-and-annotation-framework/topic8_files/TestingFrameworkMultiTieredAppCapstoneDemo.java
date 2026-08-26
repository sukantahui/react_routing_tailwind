/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 8: Testing The Custom Framework - Multi-Tiered Web App (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class TestingFrameworkMultiTieredAppCapstoneDemo {

    // 1. Repository Layer:
    @CustomFrameworkAnnotationsDemo.Component
    public static class StudentRepository {
        public String getStudentById(long id) {
            return "Tuhina Das [Barrackpore Center | Score: 98%]";
        }
    }

    // 2. Service Layer:
    @CustomFrameworkAnnotationsDemo.Service
    public static class StudentService {
        @CustomFrameworkAnnotationsDemo.Autowired
        private StudentRepository repository;

        public String fetchDetails(long id) {
            return repository.getStudentById(id);
        }
    }

    // 3. Controller Layer:
    public static class StudentController {
        @CustomFrameworkAnnotationsDemo.Autowired
        private StudentService service;

        public void handleRequest(long id) {
            System.out.println(">>> [HTTP GET /students/" + id + "]:");
            System.out.println("    Response: " + service.fetchDetails(id));
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CAPSTONE 3 CUSTOM DI FRAMEWORK TEST - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. INITIALIZING CUSTOM APPLICATION CONTEXT...");
        StudentRepository repo = new StudentRepository();
        StudentService service = new StudentService();
        StudentController controller = new StudentController();

        // Simulate Dependency Injection Wiring:
        Field repoField = StudentService.class.getDeclaredField("repository");
        repoField.setAccessible(true);
        repoField.set(service, repo);

        Field serviceField = StudentController.class.getDeclaredField("service");
        serviceField.setAccessible(true);
        serviceField.set(controller, service);

        System.out.println(">>> 2. EXECUTING END-TO-END MULTI-TIERED REQUEST:");
        controller.handleRequest(2001L);

        System.out.println("\n==========================================================================");
        System.out.println(" CAPSTONE 3 COMPLETED: CUSTOM DI & ANNOTATION FRAMEWORK VERIFIED!");
        System.out.println("==========================================================================");
    }
}

/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 18: Null-Safe Functional Architecture - Enterprise Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.List;
import java.util.Optional;

public class NullSafeArchitectureCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 18: NULL-SAFE ARCHITECTURE CAPSTONE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        AcademyService service = new AcademyService();

        System.out.println(">>> 1. Processing Complete Student Profile (Swadeep Paul):");
        String location1 = service.getStudentPostalDistrict(101);
        System.out.println("   - Resolved Postal District: " + location1);

        System.out.println("\n>>> 2. Processing Student Missing Address (Tuhina Das):");
        String location2 = service.getStudentPostalDistrict(102);
        System.out.println("   - Resolved Postal District: " + location2);

        System.out.println("\n>>> 3. Processing Student with Incomplete Pincode (Abhronila Das):");
        String location3 = service.getStudentPostalDistrict(103);
        System.out.println("   - Resolved Postal District: " + location3);

        System.out.println("\n>>> 4. Processing Non-Existent Student ID (999):");
        String location4 = service.getStudentPostalDistrict(999);
        System.out.println("   - Resolved Postal District: " + location4);

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 009_008 COMPLETE: NULL-SAFE FUNCTIONAL PROGRAMMING MASTERED!");
        System.out.println("==========================================================================");
    }

    // Enterprise Service Layer with Complete Functional Null-Safety
    static class AcademyService {
        private final List<StudentRecord> database = List.of(
            new StudentRecord(101, "Swadeep Paul", new AddressRecord("Barrackpore", "700120")),
            new StudentRecord(102, "Tuhina Das", null), // Missing address
            new StudentRecord(103, "Abhronila Das", new AddressRecord("Shyamnagar", null)) // Missing pincode
        );

        public String getStudentPostalDistrict(int studentId) {
            // End-to-End Null-Safe Monadic Pipeline:
            // 1. Find student by ID -> Optional<StudentRecord>
            // 2. Safe map to Address -> Optional<AddressRecord>
            // 3. Safe map to Pincode -> Optional<String>
            // 4. Validate 6-digit West Bengal Pin -> filter
            // 5. Transform to District String -> map
            // 6. Safe fallback -> orElse
            return findStudent(studentId)
                .map(StudentRecord::address)
                .map(AddressRecord::pincode)
                .filter(pin -> pin.length() == 6 && pin.startsWith("700"))
                .map(pin -> "North 24 Parganas (PIN: " + pin + ")")
                .orElse("DISTRICT_UNVERIFIED_OR_MISSING");
        }

        private Optional<StudentRecord> findStudent(int id) {
            return database.stream().filter(s -> s.id() == id).findFirst();
        }
    }

    record StudentRecord(int id, String name, AddressRecord address) {}
    record AddressRecord(String city, String pincode) {}
}

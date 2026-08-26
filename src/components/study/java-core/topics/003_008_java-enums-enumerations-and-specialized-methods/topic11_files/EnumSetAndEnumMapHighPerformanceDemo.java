/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 11: High-Performance Enum Collections: java.util.EnumSet (Bit-Vector) & EnumMap
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

import java.util.EnumMap;
import java.util.EnumSet;

public class EnumSetAndEnumMapHighPerformanceDemo {

    public enum AccessPermission {
        READ, WRITE, EXECUTE, DELETE, AUDIT
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: EnumSet & EnumMap HIGH PERFORMANCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. EnumSet (Backed by a single 64-bit Long bit-vector! Extremely fast bitwise operations):
        EnumSet<AccessPermission> adminPermissions = EnumSet.allOf(AccessPermission.class);
        EnumSet<AccessPermission> studentPermissions = EnumSet.of(AccessPermission.READ, AccessPermission.EXECUTE);
        EnumSet<AccessPermission> writeOnlyRange = EnumSet.range(AccessPermission.WRITE, AccessPermission.DELETE);

        System.out.println(">>> 1. java.util.EnumSet (Bit-Vector Backed Set):");
        System.out.println("  Admin Permissions   : " + adminPermissions);
        System.out.println("  Student Permissions : " + studentPermissions);
        System.out.println("  Write Range         : " + writeOnlyRange);
        System.out.println("  Student has WRITE?  : " + studentPermissions.contains(AccessPermission.WRITE));

        // 2. EnumMap (Backed internally by a compact array indexed by ordinal! Faster than HashMap):
        EnumMap<AcademicBranch, Integer> branchEnrollments = new EnumMap<>(AcademicBranch.class);
        branchEnrollments.put(AcademicBranch.BARRACKPORE, 150);
        branchEnrollments.put(AcademicBranch.NAIHATI, 85);
        branchEnrollments.put(AcademicBranch.SHYAMNAGAR, 60);

        System.out.println("\n>>> 2. java.util.EnumMap (Compact Array-Backed Map):");
        branchEnrollments.forEach((branch, count) ->
                System.out.printf("  Center: %-12s -> Active Trainees: %d%n", branch, count)
        );

        System.out.println("\n>>> PERFORMANCE SUMMARY:");
        System.out.println("  - EnumSet operations execute at raw bitwise machine speed (O(1) bit shifts).");
        System.out.println("  - EnumMap eliminates hash collisions and rehashing (direct array indexing).");

        System.out.println("\n==========================================================================");
    }
}
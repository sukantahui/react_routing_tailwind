/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 15: The Mutable Key Hazard: How Mutating Keys Produces Unreachable "Lost Keys"
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

class MutableEmployeeKey {
    private String department; // MUTABLE KEY FIELD!

    public MutableEmployeeKey(String department) { this.department = department; }
    public void setDepartment(String department) { this.department = department; }

    @Override
    public int hashCode() { return Objects.hash(department); }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        MutableEmployeeKey other = (MutableEmployeeKey) obj;
        return Objects.equals(this.department, other.department);
    }

    @Override
    public String toString() { return "Dept[" + department + "]"; }
}

public class HashMapMutableKeyLostProblemDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: THE LOST KEY PROBLEM IN HashMap - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Map<MutableEmployeeKey, String> staffAllocation = new HashMap<>();
        MutableEmployeeKey key = new MutableEmployeeKey("Accounts-Barrackpore");

        staffAllocation.put(key, "Swadeep Paul (Lead Accountant)");

        System.out.println(">>> 1. Lookup with Original Key:");
        System.out.println("  get(key) : " + staffAllocation.get(key) + " (Successfully retrieved!)");

        // DANGEROUS MUTATION: Modifying the department field AFTER insertion:
        key.setDepartment("Taxation-Naihati");

        System.out.println("\n>>> 2. Lookup AFTER Mutating Key Field:");
        System.out.println("  get(key)          : " + staffAllocation.get(key) + " (RETURNS NULL! KEY IS LOST!)");
        System.out.println("  containsKey(key)  : " + staffAllocation.containsKey(key) + " (Returns false!)");
        System.out.println("  Map Size          : " + staffAllocation.size() + " (Still contains 1 entry in memory!)");

        System.out.println("\n>>> WHY DID THE ENTRY BECOME UNREACHABLE?");
        System.out.println("  1. Original Hash Code computed for 'Accounts-Barrackpore' -> placed entry in Bucket 3.");
        System.out.println("  2. Mutated Hash Code computed for 'Taxation-Naihati' -> 'get()' looks in Bucket 11!");
        System.out.println("  3. Bucket 11 is empty, so 'get()' returns null.");
        System.out.println("  4. The entry in Bucket 3 cannot be removed or retrieved (Silent Heap Memory Leak!).");

        System.out.println("\n==========================================================================");
    }
}
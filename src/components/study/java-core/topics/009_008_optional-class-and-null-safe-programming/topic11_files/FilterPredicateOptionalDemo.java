/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 11: filter(Predicate) on Optional - Conditional Validation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class FilterPredicateOptionalDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: FILTER(PREDICATE) ON OPTIONAL - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Optional<UserAccount> adminUser = Optional.of(new UserAccount("Swadeep", "ADMIN", true));
        Optional<UserAccount> guestUser = Optional.of(new UserAccount("Abhronila", "GUEST", true));
        Optional<UserAccount> disabledUser = Optional.of(new UserAccount("Debangshu", "ADMIN", false));

        System.out.println(">>> TESTING ADMIN ACCESS VALIDATION VIA OPTIONAL.FILTER():");

        // Validating admin role and active status via chained filters:
        checkAdminAccess("Admin User", adminUser);
        checkAdminAccess("Guest User", guestUser);
        checkAdminAccess("Disabled Admin", disabledUser);

        System.out.println("\n==========================================================================");
    }

    static void checkAdminAccess(String label, Optional<UserAccount> userOpt) {
        Optional<UserAccount> authorizedAdmin = userOpt
            .filter(UserAccount::active)                       // Rule 1: Must be active
            .filter(u -> "ADMIN".equalsIgnoreCase(u.role())); // Rule 2: Must have ADMIN role

        System.out.println("  - " + label + " Access Status: " + 
            authorizedAdmin.map(u -> "GRANTED (" + u.username() + ")").orElse("DENIED / RESTRICTED"));
    }

    record UserAccount(String username, String role, boolean active) {}
}

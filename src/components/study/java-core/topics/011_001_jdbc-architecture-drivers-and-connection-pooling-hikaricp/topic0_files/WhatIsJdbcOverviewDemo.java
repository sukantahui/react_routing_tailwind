/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 0: What is JDBC - Java Database Connectivity Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Driver;
import java.sql.DriverManager;
import java.util.Enumeration;

public class WhatIsJdbcOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS JDBC (JAVA DATABASE CONNECTIVITY) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. DEFINITION & PHILOSOPHY OF JDBC:");
        System.out.println("  - JDBC (Java Database Connectivity) is the core Java standard API (java.sql & javax.sql)");
        System.out.println("  - It provides a vendor-neutral interface for executing SQL queries, managing transactions,");
        System.out.println("    and processing relational tabular result sets.\n");

        System.out.println(">>> 2. REGISTERED JDBC DRIVERS IN CURRENT RUNTIME ENVIRONMENT:");
        Enumeration<Driver> drivers = DriverManager.getDrivers();
        int count = 0;
        while (drivers.hasMoreElements()) {
            Driver driver = drivers.nextElement();
            System.out.println("  - Driver: " + driver.getClass().getName() + " (Version: " + driver.getMajorVersion() + "." + driver.getMinorVersion() + ")");
            count++;
        }
        if (count == 0) {
            System.out.println("  - (No external database driver JARs currently loaded on system classpath)");
        }

        System.out.println("\n>>> 3. THE JDBC CONTRACT:");
        System.out.println("  - Write standard Java code against JDBC interfaces (Connection, Statement, ResultSet).");
        System.out.println("  - Swap database backends (MySQL <-> PostgreSQL) by merely changing the driver JAR & JDBC URL!");

        System.out.println("\n==========================================================================");
    }
}

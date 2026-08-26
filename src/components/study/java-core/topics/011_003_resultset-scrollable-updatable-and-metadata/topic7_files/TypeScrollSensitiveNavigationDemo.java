/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 7: TYPE_SCROLL_SENSITIVE - Live Database Synchronization
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class TypeScrollSensitiveNavigationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: TYPE_SCROLL_SENSITIVE SYNCHRONIZATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> TYPE_SCROLL_INSENSITIVE VS TYPE_SCROLL_SENSITIVE:");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  FEATURE                     TYPE_SCROLL_INSENSITIVE       TYPE_SCROLL_SENSITIVE");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  Bidirectional Scrolling     Yes (next, previous, jump)    Yes (next, previous, jump)");
        System.out.println("  Client-Side Data Snapshot   Static snapshot at query time Live dynamic cursor");
        System.out.println("  Sees External Row Updates   NO (Cached values)            YES (Fetches live DB updates)");
        System.out.println("  Sees External Deletions     NO                            YES (Row marked deleted)");
        System.out.println("  Database Server Overhead    Low                           High (Requires server keyset/locks)");
        System.out.println("  Driver Support              Widely Supported              Driver-dependent (Often emulated)");
        System.out.println("  -----------------------------------------------------------------------------------------\n");

        System.out.println(">>> CHECKING DRIVER SUPPORT FOR SENSITIVE CURSORS:");
        System.out.println("  DatabaseMetaData meta = conn.getMetaData();");
        System.out.println("  boolean supported = meta.supportsResultSetType(ResultSet.TYPE_SCROLL_SENSITIVE);");

        System.out.println("\n==========================================================================");
    }
}

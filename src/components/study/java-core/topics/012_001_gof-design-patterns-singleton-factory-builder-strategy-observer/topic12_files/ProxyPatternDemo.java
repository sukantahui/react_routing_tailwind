/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 12: The Proxy Pattern - Virtual, Protection & Dynamic AOP
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class ProxyPatternDemo {

    // 1. Subject Interface:
    public interface DatabaseServer {
        void executeQuery(String userRole, String sql);
    }

    // 2. Real Subject (Heavy / Sensitive):
    public static class RealDatabaseServer implements DatabaseServer {
        public RealDatabaseServer() {
            System.out.println("   [REAL DB]: Initialized heavy database engine and connection pool.");
        }

        @Override
        public void executeQuery(String role, String sql) {
            System.out.println("   [REAL DB EXEC]: Running '" + sql + "' for role: " + role);
        }
    }

    // 3. Protection & Virtual Proxy:
    public static class DatabaseServerProxy implements DatabaseServer {
        private RealDatabaseServer realServer; // Lazy Virtual Proxy reference!

        @Override
        public void executeQuery(String userRole, String sql) {
            // Protection Proxy check:
            if (sql.toUpperCase().startsWith("DROP") && !"ADMIN".equalsIgnoreCase(userRole)) {
                System.err.println("   [SECURITY PROXY]: ACCESS DENIED! Only ADMINs can execute DROP queries! 🛡️");
                return;
            }

            // Virtual Proxy lazy loading:
            if (realServer == null) {
                System.out.println("   [VIRTUAL PROXY]: First query received -> Instantiating RealDatabaseServer on demand...");
                realServer = new RealDatabaseServer();
            }

            realServer.executeQuery(userRole, sql);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: PROXY DESIGN PATTERN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        DatabaseServer proxy = new DatabaseServerProxy();

        System.out.println("1. Student attempting unauthorized DROP:");
        proxy.executeQuery("STUDENT", "DROP TABLE exams");

        System.out.println("
2. Teacher executing SELECT (triggers lazy initialization):");
        proxy.executeQuery("TEACHER", "SELECT * FROM students");

        System.out.println("\n==========================================================================");
    }
}

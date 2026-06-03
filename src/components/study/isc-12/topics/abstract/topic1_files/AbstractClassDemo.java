// AbstractClassDemo.java
// Demonstrates the basic syntax of abstract classes and methods

// Abstract class with both concrete and abstract methods
abstract class Database {
    // Concrete method - shared by all databases
    public void connect() {
        System.out.println("Establishing database connection...");
    }
    
    // Concrete method
    public void disconnect() {
        System.out.println("Closing database connection...");
    }
    
    // Abstract method - each database executes queries differently
    public abstract void executeQuery(String sql);
    
    // Another abstract method
    public abstract int getRowCount();
}

// Concrete subclass - MySQL implementation
class MySQLDatabase extends Database {
    @Override
    public void executeQuery(String sql) {
        System.out.println("MySQL executing: " + sql);
        // MySQL-specific query parsing and execution
    }
    
    @Override
    public int getRowCount() {
        System.out.println("MySQL: Counting rows using SHOW TABLE STATUS");
        return 42; // simulated
    }
}

// Concrete subclass - PostgreSQL implementation
class PostgresDatabase extends Database {
    @Override
    public void executeQuery(String sql) {
        System.out.println("PostgreSQL executing: " + sql);
        // PostgreSQL-specific execution
    }
    
    @Override
    public int getRowCount() {
        System.out.println("PostgreSQL: Counting rows using pg_stat_user_tables");
        return 99; // simulated
    }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        // Database db = new Database(); // ERROR: cannot instantiate abstract class
        
        Database db1 = new MySQLDatabase();
        db1.connect();
        db1.executeQuery("SELECT * FROM users");
        System.out.println("Row count: " + db1.getRowCount());
        db1.disconnect();
        
        System.out.println();
        
        Database db2 = new PostgresDatabase();
        db2.connect();
        db2.executeQuery("SELECT * FROM orders");
        System.out.println("Row count: " + db2.getRowCount());
        db2.disconnect();
    }
}
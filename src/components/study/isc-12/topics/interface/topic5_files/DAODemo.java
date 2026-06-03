// DAODemo.java
public class DAODemo {
    public static void main(String[] args) {
        // Program to interface, not implementation
        UserDAO userDAO = new UserDAOMySQL();

        userDAO.addUser("Abhronila", "abhronila@school.com");
        userDAO.addUser("Debangshu", "deba@school.com");

        System.out.println("All users:");
        for (User u : userDAO.getAllUsers()) {
            System.out.println(u);
        }

        // If we later switch to PostgreSQL, only this line changes:
        // UserDAO userDAO = new UserDAOPostgreSQL();
    }
}
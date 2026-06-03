import javax.servlet.*;
import javax.servlet.annotation.*;
import java.sql.Connection;
import java.sql.DriverManager;

@WebListener
public class AppStartupListener implements ServletContextListener {
    private Connection dbConnection;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Application starting...");
        // Initialize database connection
        try {
            Class.forName("com.mysql.jdbc.Driver");
            dbConnection = DriverManager.getConnection("jdbc:mysql://localhost/school", "user", "pass");
            sce.getServletContext().setAttribute("dbConnection", dbConnection);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Set app-wide attributes
        sce.getServletContext().setAttribute("appStartTime", System.currentTimeMillis());
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Application shutting down...");
        // Clean up resources
        try { if (dbConnection != null) dbConnection.close(); } catch (Exception ignored) {}
    }
}
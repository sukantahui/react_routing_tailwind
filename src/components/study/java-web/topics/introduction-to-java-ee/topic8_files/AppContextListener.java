import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * A ServletContextListener that is notified when the web application
 * is initialized or destroyed. Useful for setting up shared resources
 * (e.g., database connection pools) at startup and cleaning them up at shutdown.
 */
@WebListener
public class AppContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("AppContextListener: Web application started.");
        // Example: initialize a database connection pool
        sce.getServletContext().setAttribute("startTime", System.currentTimeMillis());
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("AppContextListener: Web application stopped.");
        // Example: close database connection pool
    }
}
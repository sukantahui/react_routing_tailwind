import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebListener
public class AllInOneListener implements ServletContextListener, HttpSessionListener, ServletRequestListener {
    // ServletContextListener methods
    @Override public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Context init (AllInOne)");
    }
    @Override public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Context destroyed");
    }

    // HttpSessionListener methods
    @Override public void sessionCreated(HttpSessionEvent se) {
        System.out.println("Session created: " + se.getSession().getId());
    }
    @Override public void sessionDestroyed(HttpSessionEvent se) {
        System.out.println("Session destroyed: " + se.getSession().getId());
    }

    // ServletRequestListener methods
    @Override public void requestInitialized(ServletRequestEvent sre) {
        System.out.println("Request initialized");
    }
    @Override public void requestDestroyed(ServletRequestEvent sre) {
        System.out.println("Request destroyed");
    }
}
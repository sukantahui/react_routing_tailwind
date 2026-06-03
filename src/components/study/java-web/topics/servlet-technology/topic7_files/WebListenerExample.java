import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebListener
public class AppListener implements ServletContextListener, HttpSessionListener {
    private int activeSessions = 0;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Application started");
        sce.getServletContext().setAttribute("appVersion", "2.0");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Application shutting down");
    }

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        activeSessions++;
        se.getSession().getServletContext().setAttribute("activeSessions", activeSessions);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        activeSessions--;
        se.getSession().getServletContext().setAttribute("activeSessions", activeSessions);
    }
}
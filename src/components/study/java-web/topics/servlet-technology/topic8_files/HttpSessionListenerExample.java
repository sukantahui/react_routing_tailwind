import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebListener
public class ActiveSessionCounter implements HttpSessionListener {
    private static int activeSessions = 0;

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        activeSessions++;
        se.getSession().getServletContext().setAttribute("activeSessions", activeSessions);
        System.out.println("Session created. Total active: " + activeSessions);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        activeSessions--;
        se.getSession().getServletContext().setAttribute("activeSessions", activeSessions);
        System.out.println("Session destroyed. Total active: " + activeSessions);
    }
}
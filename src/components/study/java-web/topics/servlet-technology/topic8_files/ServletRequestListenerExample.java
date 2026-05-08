import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebListener
public class RequestLoggingListener implements ServletRequestListener {
    private long startTime;

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        startTime = System.nanoTime();
        HttpServletRequest req = (HttpServletRequest) sre.getServletRequest();
        System.out.println("Request started: " + req.getRequestURI());
    }

    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        long duration = System.nanoTime() - startTime;
        HttpServletRequest req = (HttpServletRequest) sre.getServletRequest();
        System.out.println("Request finished: " + req.getRequestURI() + " in " + (duration / 1_000_000) + " ms");
    }
}
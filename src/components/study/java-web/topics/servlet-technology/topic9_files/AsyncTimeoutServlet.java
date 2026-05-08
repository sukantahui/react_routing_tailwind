import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebServlet(urlPatterns = "/timeout", asyncSupported = true)
public class AsyncTimeoutServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        AsyncContext asyncCtx = req.startAsync();
        // Set very short timeout to demonstrate timeout handling
        asyncCtx.setTimeout(2000); // 2 seconds

        // Add a listener to handle timeout gracefully
        asyncCtx.addListener(new AsyncListener() {
            @Override
            public void onTimeout(AsyncEvent event) throws IOException {
                System.out.println("Timeout triggered!");
                event.getAsyncContext().getResponse().setContentType("text/html");
                event.getAsyncContext().getResponse().getWriter().println("<h2>Request timed out</h2>");
                event.getAsyncContext().complete();
            }
            @Override public void onStartAsync(AsyncEvent event) {}
            @Override public void onComplete(AsyncEvent event) {}
            @Override public void onError(AsyncEvent event) {}
        });

        // Simulate a long task that will exceed timeout
        asyncCtx.start(() -> {
            try {
                Thread.sleep(5000); // longer than timeout
            } catch (InterruptedException e) {}
        });
    }
}
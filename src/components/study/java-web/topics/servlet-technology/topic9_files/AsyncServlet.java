import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.util.concurrent.*;

@WebServlet(urlPatterns = "/async", asyncSupported = true)
public class AsyncServlet extends HttpServlet {
    private ExecutorService executor = Executors.newCachedThreadPool();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Start asynchronous context
        AsyncContext asyncCtx = req.startAsync();
        // Set timeout (optional)
        asyncCtx.setTimeout(10000); // 10 seconds

        // Submit long-running task to executor
        executor.submit(() -> {
            try {
                // Simulate long processing
                Thread.sleep(3000);
                String result = "Async task completed!";
                // Get response writer
                PrintWriter out = asyncCtx.getResponse().getWriter();
                out.println("<h2>" + result + "</h2>");
                // Complete the async processing
                asyncCtx.complete();
            } catch (Exception e) {
                e.printStackTrace();
                asyncCtx.complete();
            }
        });
    }

    @Override
    public void destroy() {
        executor.shutdown();
    }
}
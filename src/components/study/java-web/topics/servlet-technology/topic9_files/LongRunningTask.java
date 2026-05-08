import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.util.concurrent.*;

@WebServlet(urlPatterns = "/longtask", asyncSupported = true)
public class LongRunningTask extends HttpServlet {
    private static final int THREAD_POOL_SIZE = 10;
    private ExecutorService executor = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        AsyncContext asyncCtx = req.startAsync();
        asyncCtx.setTimeout(30000); // 30 seconds

        executor.submit(() -> {
            try {
                // Simulate heavy task: database export, file processing, etc.
                for (int i = 0; i < 10; i++) {
                    System.out.println("Processing step " + i);
                    Thread.sleep(1000);
                }
                PrintWriter out = asyncCtx.getResponse().getWriter();
                out.println("Heavy task finished successfully!");
                asyncCtx.complete();
            } catch (Exception e) {
                e.printStackTrace();
                asyncCtx.complete();
            }
        });
    }

    @Override
    public void destroy() {
        executor.shutdownNow();
    }
}
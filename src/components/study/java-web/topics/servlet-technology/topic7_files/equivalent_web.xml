import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(urlPatterns = "/longtask", asyncSupported = true)
public class AsyncServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        AsyncContext ctx = req.startAsync();
        ctx.start(() -> {
            try {
                // Simulate long processing
                Thread.sleep(5000);
                resp.getWriter().println("Task completed");
                ctx.complete();
            } catch (Exception e) { e.printStackTrace(); }
        });
    }
}
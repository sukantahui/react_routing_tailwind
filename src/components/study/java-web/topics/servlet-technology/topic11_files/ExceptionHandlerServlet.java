import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ExceptionHandlerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Retrieve error information from request attributes
        Integer statusCode = (Integer) req.getAttribute("javax.servlet.error.status_code");
        String message = (String) req.getAttribute("javax.servlet.error.message");
        Throwable exception = (Throwable) req.getAttribute("javax.servlet.error.exception");

        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.println("{");
        out.println("  \"status\": " + statusCode + ",");
        out.println("  \"error\": \"" + (message != null ? message : "Internal Server Error") + "\",");
        out.println("  \"path\": \"" + req.getRequestURI() + "\"");
        out.println("}");
    }
}
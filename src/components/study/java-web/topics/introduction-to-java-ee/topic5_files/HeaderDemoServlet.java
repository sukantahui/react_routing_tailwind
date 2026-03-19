import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Demonstrates reading request headers and setting response headers.
 */
@WebServlet("/header-demo")
public class HeaderDemoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // --- Read request headers ---
        StringBuilder requestHeaders = new StringBuilder();
        Enumeration<String> headerNames = req.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String name = headerNames.nextElement();
            String value = req.getHeader(name);
            requestHeaders.append(name).append(": ").append(value).append("\n");
        }

        // --- Set response headers ---
        resp.setContentType("text/plain");
        resp.setHeader("X-Powered-By", "Java Servlet");
        resp.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        resp.setHeader("X-Custom-Header", "Hello from HeaderDemoServlet");

        // Optionally, set a cookie
        // Cookie cookie = new Cookie("demo", "value");
        // resp.addCookie(cookie);

        // --- Write response body ---
        PrintWriter out = resp.getWriter();
        out.println("Request Headers Received:");
        out.println("=========================");
        out.println(requestHeaders.toString());

        out.println("\nResponse Headers Set:");
        out.println("======================");
        out.println("Content-Type: " + resp.getContentType());
        out.println("X-Powered-By: Java Servlet");
        out.println("Cache-Control: no-cache, no-store, must-revalidate");
        out.println("X-Custom-Header: Hello from HeaderDemoServlet");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // For POST, we might read the body content type and length
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();
        out.println("POST received. Content-Type: " + req.getContentType());
        out.println("Content-Length: " + req.getContentLength());
        out.println("Character Encoding: " + req.getCharacterEncoding());
    }
}
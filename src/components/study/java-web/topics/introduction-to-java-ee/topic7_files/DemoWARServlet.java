import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * A simple servlet demonstrating that annotations can replace web.xml mapping.
 */
@WebServlet("/demo")
public class DemoWARServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<html><head><title>WAR Demo</title></head><body>");
        out.println("<h1>WAR File Demo</h1>");
        out.println("<p>This servlet is packaged inside a WAR.</p>");
        out.println("</body></html>");
    }
}
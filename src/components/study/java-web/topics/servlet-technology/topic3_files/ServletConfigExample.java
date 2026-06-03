import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class MyServlet extends HttpServlet {
    private String adminEmail;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        // read servlet-specific init parameter
        adminEmail = config.getInitParameter("adminEmail");
        System.out.println("Config param: " + adminEmail);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<h1>Admin email from ServletConfig: " + adminEmail + "</h1>");
    }
}
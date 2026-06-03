import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class GlobalParamsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        ServletContext ctx = getServletContext();
        String schoolName = ctx.getInitParameter("schoolName");
        String maintenanceMode = ctx.getInitParameter("maintenanceMode");

        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<h2>School: " + schoolName + "</h2>");
        out.println("<p>Maintenance Mode: " + maintenanceMode + "</p>");
    }
}
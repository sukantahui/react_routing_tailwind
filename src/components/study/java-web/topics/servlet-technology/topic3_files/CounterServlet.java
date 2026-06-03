import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HitCounterServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        ServletContext ctx = getServletContext();
        Integer count = (Integer) ctx.getAttribute("hitCounter");
        if (count == null) {
            count = 1;
        } else {
            count++;
        }
        ctx.setAttribute("hitCounter", count);

        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<html><body>");
        out.println("<h2>This page has been visited " + count + " times (globally).</h2>");
        out.println("</body></html>");
    }
}
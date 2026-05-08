import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DemoServlet extends HttpServlet {
    private String localFolder;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        localFolder = config.getInitParameter("uploadFolder");   // per-servlet
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        ServletContext ctx = getServletContext();
        String appName = ctx.getInitParameter("appName");        // global
        Integer counter = (Integer) ctx.getAttribute("visitCount");
        if (counter == null) counter = 0;
        counter++;
        ctx.setAttribute("visitCount", counter);

        resp.getWriter().println("App: " + appName + "<br/>Local upload folder: " + localFolder +
                                  "<br/>Total visits: " + counter);
    }
}
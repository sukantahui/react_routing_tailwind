import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(
    urlPatterns = "/config",
    initParams = {
        @WebInitParam(name = "timeout", value = "300"),
        @WebInitParam(name = "theme", value = "dark")
    }
)
public class ConfigurableServlet extends HttpServlet {
    private int timeout;
    private String theme;

    @Override
    public void init() throws ServletException {
        timeout = Integer.parseInt(getServletConfig().getInitParameter("timeout"));
        theme = getServletConfig().getInitParameter("theme");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        resp.getWriter().println("Timeout: " + timeout + ", Theme: " + theme);
    }
}
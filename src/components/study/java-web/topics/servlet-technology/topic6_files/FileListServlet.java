import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

@WebServlet("/fileList")
public class FileListServlet extends HttpServlet {
    private static final String UPLOAD_DIR = "/var/web/uploads";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        File folder = new File(UPLOAD_DIR);
        File[] files = folder.listFiles();
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<html><body><ul>");
        if (files != null) {
            for (File f : files) {
                out.println("<li><a href='download?file=" + f.getName() + "'>" + f.getName() + "</a></li>");
            }
        }
        out.println("</ul></body></html>");
    }
}
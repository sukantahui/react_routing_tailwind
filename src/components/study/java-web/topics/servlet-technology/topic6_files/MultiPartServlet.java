import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.Collection;

@WebServlet("/multiUpload")
@MultipartConfig(maxFileSize = 10 * 1024 * 1024)
public class MultiPartServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        Collection<Part> parts = req.getParts();
        for (Part part : parts) {
            if (part.getSubmittedFileName() != null && part.getSize() > 0) {
                String fileName = part.getSubmittedFileName();
                part.write("/uploads/" + fileName);
            }
        }
        resp.getWriter().println("Uploaded " + parts.size() + " files.");
    }
}
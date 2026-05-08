import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/upload")
@MultipartConfig(
    location = "/var/tmp/uploads",
    maxFileSize = 5 * 1024 * 1024,    // 5 MB
    maxRequestSize = 10 * 1024 * 1024 // 10 MB
)
public class FileUploadServlet extends HttpServlet {
    private static final String UPLOAD_DIR = "/var/web/uploads";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Ensure upload directory exists
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) uploadDir.mkdirs();

        Part filePart = req.getPart("myFile");
        String originalFileName = getSubmittedFileName(filePart);
        String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;
        String savePath = UPLOAD_DIR + File.separator + uniqueFileName;

        filePart.write(savePath);   // Saves to the location specified in @MultipartConfig? No: Part.write uses the location attribute.
        // Actually Part.write() uses the @MultipartConfig location value as base directory.
        // Better: use filePart.write(savePath) with absolute path? Correct usage: filePart.write(savePath) writes to that exact path.
        // So we override the default location.
        
        // Get description field (ordinary form field)
        String desc = req.getParameter("desc");
        
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<h2>Uploaded: " + originalFileName + " as " + uniqueFileName + "</h2>");
        out.println("<p>Description: " + desc + "</p>");
    }
    
    private String getSubmittedFileName(Part part) {
        for (String cd : part.getHeader("Content-Disposition").split(";")) {
            if (cd.trim().startsWith("filename")) {
                return cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
            }
        }
        return null;
    }
}
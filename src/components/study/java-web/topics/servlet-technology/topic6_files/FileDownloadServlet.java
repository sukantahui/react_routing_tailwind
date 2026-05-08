import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.nio.file.*;

@WebServlet("/download")
public class FileDownloadServlet extends HttpServlet {
    private static final String UPLOAD_DIR = "/var/web/uploads";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String fileName = req.getParameter("file");
        if (fileName == null || fileName.isEmpty() || fileName.contains("..")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        File file = new File(UPLOAD_DIR, fileName);
        if (!file.exists() || !file.isFile()) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        resp.setContentType(Files.probeContentType(file.toPath()));
        resp.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        resp.setContentLengthLong(file.length());

        try (InputStream in = new FileInputStream(file);
             OutputStream out = resp.getOutputStream()) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        }
    }
}
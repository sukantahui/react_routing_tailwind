import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Demonstrates setting different HTTP status codes.
 */
@WebServlet("/status-demo")
public class StatusDemoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String codeParam = req.getParameter("code");

        if (codeParam == null) {
            // 200 OK - default
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.setContentType("text/plain");
            resp.getWriter().println("Status: 200 OK");
            return;
        }

        try {
            int code = Integer.parseInt(codeParam);
            switch (code) {
                case 200:
                    resp.setStatus(HttpServletResponse.SC_OK);
                    resp.getWriter().println("200 OK – All good.");
                    break;
                case 201:
                    resp.setStatus(HttpServletResponse.SC_CREATED);
                    resp.setHeader("Location", "/new-resource/123");
                    resp.getWriter().println("201 Created – New resource at /new-resource/123");
                    break;
                case 204:
                    resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
                    // No body sent
                    break;
                case 301:
                    resp.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
                    resp.setHeader("Location", "/new-location");
                    resp.getWriter().println("301 Moved Permanently – Redirecting...");
                    break;
                case 400:
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().println("400 Bad Request – Check your parameters.");
                    break;
                case 401:
                    resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    resp.setHeader("WWW-Authenticate", "Basic realm=\"User Visible Realm\"");
                    resp.getWriter().println("401 Unauthorized – Please log in.");
                    break;
                case 403:
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().println("403 Forbidden – You don't have permission.");
                    break;
                case 404:
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().println("404 Not Found – Resource doesn't exist.");
                    break;
                case 500:
                    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    resp.getWriter().println("500 Internal Server Error – Something went wrong.");
                    break;
                default:
                    resp.setStatus(HttpServletResponse.SC_OK);
                    resp.getWriter().println("Default 200 – Unrecognized code, but OK.");
            }
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().println("400 Bad Request – Invalid code parameter.");
        }
    }
}
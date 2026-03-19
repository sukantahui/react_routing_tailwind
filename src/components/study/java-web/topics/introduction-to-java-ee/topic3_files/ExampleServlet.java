import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * ExampleServlet – Represents the Web Tier.
 * It receives HTTP requests, calls the business tier,
 * and forwards to a JSP for rendering.
 */
@WebServlet("/example")
public class ExampleServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Read parameters (if any)
        String userId = request.getParameter("userId");

        // 2. Call business tier (simplified – in real app, inject a service)
        UserService userService = new UserService();
        User user = userService.findUserById(userId);

        // 3. Store data for the view
        request.setAttribute("user", user);

        // 4. Forward to JSP
        request.getRequestDispatcher("/WEB-INF/views/userProfile.jsp")
               .forward(request, response);
    }
}
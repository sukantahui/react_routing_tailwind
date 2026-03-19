import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * LoginServlet – Example of a Servlet acting as the Controller.
 * It receives login credentials, validates them using a DAO (JDBC),
 * and forwards to the appropriate JSP.
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Read parameters from the request
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // 2. Call the business layer (here we use a DAO directly for simplicity)
        UserDAO userDAO = new UserDAO();
        UserBean user = userDAO.validateUser(username, password);

        // 3. Depending on result, forward to appropriate JSP
        if (user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            response.sendRedirect("welcome.jsp");  // redirect to avoid form resubmission
        } else {
            request.setAttribute("error", "Invalid username or password");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}
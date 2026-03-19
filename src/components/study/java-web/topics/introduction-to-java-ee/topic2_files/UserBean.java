import java.io.Serializable;

/**
 * UserBean – A simple JavaBean (Model) that holds user data.
 * Used by both the Servlet and the JSP (via EL).
 */
public class UserBean implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private String username;
    private String name;
    private String email;

    // No-argument constructor (required for JavaBeans)
    public UserBean() {}

    // Getters and setters for each property
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @Override
    public String toString() {
        return "UserBean{id=" + id + ", username='" + username + "', name='" + name + "', email='" + email + "'}";
    }
}
package com.school.struts;

public class LoginAction {
    private String username;
    private String password;
    private String message;

    public String execute() {
        if ("admin".equals(username) && "secret".equals(password)) {
            message = "Welcome " + username;
            return "success";
        } else {
            message = "Invalid credentials";
            return "error";
        }
    }

    // getters and setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
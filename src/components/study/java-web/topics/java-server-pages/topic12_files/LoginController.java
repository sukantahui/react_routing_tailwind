package com.example.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginController implements Command {
    @Override
    public String execute(HttpServletRequest req, HttpServletResponse resp) {
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        // Simulate authentication (should call a service)
        if ("admin".equals(username) && "secret".equals(password)) {
            HttpSession session = req.getSession();
            session.setAttribute("user", username);
            return "dashboard"; // view name -> dashboard.jsp
        } else {
            req.setAttribute("error", "Invalid credentials");
            return "login"; // back to login page
        }
    }
}
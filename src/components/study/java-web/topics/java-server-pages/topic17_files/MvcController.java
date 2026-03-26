package com.example.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MvcController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("name");
        // Validate and sanitize input
        name = (name == null) ? "Guest" : name.replaceAll("[^a-zA-Z0-9 ]", "");
        req.setAttribute("safeName", name);
        req.getRequestDispatcher("/WEB-INF/views/mvcView.jsp").forward(req, resp);
    }
}
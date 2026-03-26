package com.example.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class FrontControllerServlet extends HttpServlet {
    private Map<String, Command> commandMap = new HashMap<>();

    @Override
    public void init() throws ServletException {
        // Register commands
        commandMap.put("login", new LoginController());
        commandMap.put("listStudents", new ListStudentsController());
        // ... other commands
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");
        if (action == null) action = "default";

        Command command = commandMap.get(action);
        if (command == null) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        String view = command.execute(req, resp);
        if (view != null) {
            req.getRequestDispatcher("/WEB-INF/views/" + view + ".jsp").forward(req, resp);
        }
    }
}
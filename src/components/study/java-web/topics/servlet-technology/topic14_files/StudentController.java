package com.school.controller;

import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import com.school.model.Student;

@WebServlet("/students")
public class StudentController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Model: fetch data (simulate database)
        List<Student> students = new ArrayList<>();
        students.add(new Student("Swadeep", 101, "A"));
        students.add(new Student("Tuhina", 102, "B+"));
        students.add(new Student("Abhronila", 103, "A-"));

        // Store model in request attribute
        req.setAttribute("studentList", students);

        // Forward to view (JSP under WEB-INF)
        RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/views/studentView.jsp");
        dispatcher.forward(req, resp);
    }
}
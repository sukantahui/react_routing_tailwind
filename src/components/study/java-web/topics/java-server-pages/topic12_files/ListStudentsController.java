package com.example.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

public class ListStudentsController implements Command {
    @Override
    public String execute(HttpServletRequest req, HttpServletResponse resp) {
        // Typically, fetch data from a service
        List<String> students = new ArrayList<>();
        students.add("Swadeep");
        students.add("Tuhina");
        students.add("Abhronila");
        students.add("Debangshu");

        req.setAttribute("students", students);
        return "studentList";
    }
}
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Combined Example</title>
</head>
<body>
    <%! 
        // Declaration: a utility method
        private String formatName(String name) {
            return name.toUpperCase();
        }
    %>

    <%
        // Scriptlet: processing logic
        String[] students = {"Abhronila", "Debangshu", "Swadeep", "Tuhina"};
    %>

    <h1>Student List</h1>
    <ul>
        <%
            for (String s : students) {
        %>
            <li><%= formatName(s) %></li>
        <%
            }
        %>
    </ul>

    <p>Total students: <%= students.length %></p>
</body>
</html>
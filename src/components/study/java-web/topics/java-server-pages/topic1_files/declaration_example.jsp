<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Declaration Example</title>
</head>
<body>
    <%! 
        // Declaration: method defined at class level
        private String getGreeting(String name) {
            return "Hello, " + name + "!";
        }
    %>
    <%
        // Scriptlet using the declared method
        String visitor = "Tuhina";
    %>
    <h1><%= getGreeting(visitor) %></h1>
    <p>This greeting method is defined in a declaration.</p>
</body>
</html>
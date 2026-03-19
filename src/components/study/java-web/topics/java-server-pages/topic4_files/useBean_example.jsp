<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>useBean Example</title>
</head>
<body>
    <h2>Creating a JavaBean</h2>
    
    <jsp:useBean id="student" class="com.example.beans.Student" scope="page" />
    
    <p>Bean created successfully. Default name: <jsp:getProperty name="student" property="name" /></p>
    <p>Default age: <jsp:getProperty name="student" property="age" /></p>
</body>
</html>
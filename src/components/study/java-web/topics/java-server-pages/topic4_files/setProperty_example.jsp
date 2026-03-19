<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>setProperty Example</title>
</head>
<body>
    <h2>Populating a Bean from Request</h2>
    
    <jsp:useBean id="student" class="com.example.beans.Student" scope="request" />
    
    <!-- Automatically match all request parameters to bean properties -->
    <jsp:setProperty name="student" property="*" />
    
    <p>Name: <jsp:getProperty name="student" property="name" /></p>
    <p>Age: <jsp:getProperty name="student" property="age" /></p>
    <p>Course: <jsp:getProperty name="student" property="course" /></p>
    
    <hr>
    <p>Try accessing this page with: <code>?name=Swadeep&age=20&course=BCA</code></p>
</body>
</html>
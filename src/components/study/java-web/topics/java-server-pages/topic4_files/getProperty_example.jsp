<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>getProperty Example</title>
</head>
<body>
    <h2>Displaying Bean Properties</h2>
    
    <jsp:useBean id="student" class="com.example.beans.Student" scope="page" />
    
    <!-- Manually set some properties -->
    <jsp:setProperty name="student" property="name" value="Tuhina" />
    <jsp:setProperty name="student" property="age" value="22" />
    <jsp:setProperty name="student" property="course" value="MCA" />
    
    <h3>Student Details:</h3>
    <ul>
        <li>Name: <jsp:getProperty name="student" property="name" /></li>
        <li>Age: <jsp:getProperty name="student" property="age" /></li>
        <li>Course: <jsp:getProperty name="student" property="course" /></li>
    </ul>
</body>
</html>
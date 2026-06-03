<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>JavaBean Actions Example</title>
</head>
<body>
    <!-- Declare and instantiate (or locate) a StudentBean -->
    <jsp:useBean id="student" class="com.school.model.StudentBean" scope="request" />
    
    <!-- Automatically set bean properties from request parameters (property="*") -->
    <jsp:setProperty name="student" property="*" />
    
    <h2>Registration Confirmation</h2>
    <p>Name: <jsp:getProperty name="student" property="fullName" /></p>
    <p>Roll No: <jsp:getProperty name="student" property="rollNumber" /></p>
    <p>Course: <jsp:getProperty name="student" property="course" /></p>
    
    <!-- Alternatively, display using EL (cleaner) -->
    <p>From EL: ${student.fullName}, ${student.rollNumber}</p>
</body>
</html>
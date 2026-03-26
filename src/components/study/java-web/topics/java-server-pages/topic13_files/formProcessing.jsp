<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:useBean id="student" class="com.school.model.StudentBean" scope="request" />
<jsp:setProperty name="student" property="*" />
<html>
<body>
    <h2>Student Details</h2>
    <p>Name: <jsp:getProperty name="student" property="name" /></p>
    <p>Age: <jsp:getProperty name="student" property="age" /></p>
    <p>Class: <jsp:getProperty name="student" property="className" /></p>
    <a href="studentForm.html">Back to Form</a>
</body>
</html>
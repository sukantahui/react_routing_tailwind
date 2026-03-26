<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:useBean id="student" class="com.school.model.StudentBean" scope="request" />
<html>
<body>
    Student Name: <jsp:getProperty name="student" property="name" /><br/>
    Age: <jsp:getProperty name="student" property="age" /><br/>
    Class: <jsp:getProperty name="student" property="className" />
</body>
</html>
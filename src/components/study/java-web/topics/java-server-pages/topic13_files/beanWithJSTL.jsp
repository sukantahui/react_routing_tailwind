<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="student" class="com.school.model.StudentBean" scope="request" />
<jsp:setProperty name="student" property="*" />
<html>
<body>
    <h2>Student Details (EL Style)</h2>
    <p>Name: ${student.name}</p>
    <p>Age: ${student.age}</p>
    <p>Class: ${student.className}</p>
</body>
</html>
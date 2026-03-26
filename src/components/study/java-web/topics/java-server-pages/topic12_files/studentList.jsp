<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student List</title>
</head>
<body>
    <h2>Student List</h2>
    <ul>
        <c:forEach var="student" items="${students}">
            <li>${student}</li>
        </c:forEach>
    </ul>
    <a href="${pageContext.request.contextPath}/controller?action=logout">Logout</a>
</body>
</html>
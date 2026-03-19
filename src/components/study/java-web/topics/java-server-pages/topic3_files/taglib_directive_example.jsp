<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Taglib Directive Example</title>
</head>
<body>
    <h2>Using JSTL (even though we haven't covered it yet)</h2>
    <c:set var="student" value="Debangshu" />
    <p>Student name: <c:out value="${student}" /></p>
    
    <c:if test="${not empty student}">
        <p>The student variable is set.</p>
    </c:if>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    // Simulate complex nested data
    java.util.Map<String, Object> student1 = new java.util.HashMap<>();
    student1.put("name", "Swadeep");
    student1.put("grades", java.util.Map.of("Math", 95, "Science", 88));

    java.util.Map<String, Object> student2 = new java.util.HashMap<>();
    student2.put("name", "Tuhina");
    student2.put("grades", java.util.Map.of("Math", 92, "Science", 91));

    pageContext.setAttribute("students", java.util.Arrays.asList(student1, student2));
%>
<html>
<body>
    <h3>Nested Collections</h3>
    Student 1 name: ${students[0].name}<br/>
    Student 2 Math grade: ${students[1].grades['Math']}<br/>
    All students:
    <ul>
        <c:forEach items="${students}" var="s">
            <li>${s.name} - Math: ${s.grades.Math}, Science: ${s.grades.Science}</li>
        </c:forEach>
    </ul>
</body>
</html>
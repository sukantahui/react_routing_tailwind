<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
    // Simulate data (in real app, this would come from controller)
    pageContext.setAttribute("students", new String[]{"Swadeep", "Tuhina", "Abhronila"});
    pageContext.setAttribute("grades", java.util.Map.of("Math", 95, "Science", 88));
    pageContext.setAttribute("studentList", java.util.Arrays.asList("Debangshu", "Rohan"));
%>
<html>
<body>
    <h3>Array Access</h3>
    First student: ${students[0]}<br/>
    Second student: ${students[1]}<br/>
    Array length: ${fn:length(students)}<br/>

    <h3>Map Access</h3>
    Math grade: ${grades['Math']}<br/>
    Science grade: ${grades.Science}<br/>

    <h3>List Access</h3>
    First in list: ${studentList[0]}<br/>
    List size: ${fn:length(studentList)}<br/>
</body>
</html>
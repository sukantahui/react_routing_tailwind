<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>EL with JavaBean</title>
</head>
<body>
    <jsp:useBean id="student" class="com.example.beans.Student" scope="page" />
    <jsp:setProperty name="student" property="name" value="Debangshu" />
    <jsp:setProperty name="student" property="age" value="21" />
    <jsp:setProperty name="student" property="course" value="B.Tech" />

    <h2>Student Details using EL</h2>
    <p>Name: ${student.name}</p>
    <p>Age: ${student.age}</p>
    <p>Course: ${student.course}</p>
    <p>Bracket notation: ${student["name"]}</p>
</body>
</html>
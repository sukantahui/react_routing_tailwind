<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head><title>Student List</title></head>
<body>
    <h2>Student Records</h2>
    <table border="1">
        <tr><th>Name</th><th>Roll No</th><th>Grade</th></tr>
        <c:forEach var="student" items="${studentList}">
            <tr>
                <td>${student.name}</td>
                <td>${student.rollNo}</td>
                <td>${student.grade}</td>
            </tr>
        </c:forEach>
    </table>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Forward Example</title>
</head>
<body>
    <%
        // Simulate a validation check
        String studentId = request.getParameter("id");
        if (studentId == null || studentId.isEmpty()) {
    %>
        <!-- Forward to error page with a parameter -->
        <jsp:forward page="errorPage.jsp">
            <jsp:param name="errorMsg" value="Missing student ID" />
        </jsp:forward>
    <%
        } else {
    %>
        <jsp:forward page="studentProfile.jsp">
            <jsp:param name="id" value="<%= studentId %>" />
        </jsp:forward>
    <%
        }
    %>
</body>
</html>
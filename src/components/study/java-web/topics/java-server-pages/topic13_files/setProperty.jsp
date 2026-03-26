<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:useBean id="student" class="com.school.model.StudentBean" scope="request" />
<jsp:setProperty name="student" property="*" />
<html>
<body>
    <p>Bean has been populated from request parameters.</p>
</body>
</html>
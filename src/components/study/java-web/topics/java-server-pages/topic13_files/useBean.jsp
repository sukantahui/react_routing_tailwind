<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:useBean id="student" class="com.school.model.StudentBean" scope="request" />
<jsp:setProperty name="student" property="name" value="Swadeep" />
<jsp:setProperty name="student" property="age" value="15" />
<jsp:setProperty name="student" property="className" value="10th" />
<html>
<body>
    Student Name: <jsp:getProperty name="student" property="name" /><br/>
    Age: <jsp:getProperty name="student" property="age" /><br/>
    Class: <jsp:getProperty name="student" property="className" />
</body>
</html>
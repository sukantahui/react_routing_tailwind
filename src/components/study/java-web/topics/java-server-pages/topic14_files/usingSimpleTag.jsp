<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="my" uri="/WEB-INF/tlds/mytags.tld" %>
<html>
<body>
    <my:hello />
    <br/>
    <my:repeat times="3">
        <p>This line repeats 3 times.</p>
    </my:repeat>
</body>
</html>
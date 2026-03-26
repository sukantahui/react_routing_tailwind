<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="my" tagdir="/WEB-INF/tags" %>
<!DOCTYPE html>
<html>
<head>
    <title>Tag File Demo</title>
</head>
<body>
    <my:hello name="Swadeep" />
    <my:greeting style="fancy">
        This is the body content passed to the tag.
    </my:greeting>
</body>
</html>
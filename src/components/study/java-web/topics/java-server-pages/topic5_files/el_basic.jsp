<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>EL Basic</title>
</head>
<body>
    <h2>Basic EL Expressions</h2>
    <p>5 + 3 = ${5 + 3}</p>
    <p>10 * 2 = ${10 * 2}</p>
    <p>Hello, ${"World"}!</p>
    <p>Concatenation: ${"Hello, "} ${"Tuhina"}</p>
    <p>Numbers from request? age + 1 = ${param.age + 1}</p>
</body>
</html>
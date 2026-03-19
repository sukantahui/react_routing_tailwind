<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>EL Operators</title>
</head>
<body>
    <h2>EL Operators Demo</h2>
    <p>Is 5 > 3? ${5 gt 3}</p>
    <p>Is 10 == 10? ${10 eq 10}</p>
    <p>Logical AND: ${true and false}</p>
    <p>Logical OR: ${true or false}</p>
    <p>Empty check on null: ${empty null}</p>
    <p>Empty check on empty string: ${empty ""}</p>
    <p>Ternary: ${5 > 3 ? "Yes" : "No"}</p>
</body>
</html>
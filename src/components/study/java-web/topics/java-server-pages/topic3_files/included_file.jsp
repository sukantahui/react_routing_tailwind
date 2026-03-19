<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- This file is included statically -->
<div style="background-color: #e0f2fe; padding: 10px; margin: 10px 0;">
    <h3>Common Header / Footer</h3>
    <p>This content comes from an included file. Any variables defined here are visible in the main page.</p>
    <%
        String sharedMessage = "Hello from included file!";
    %>
</div>
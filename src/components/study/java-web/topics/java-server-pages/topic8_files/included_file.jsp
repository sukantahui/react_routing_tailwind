<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<footer style="border-top: 1px solid #ccc; margin-top: 20px; padding-top: 10px;">
    <p>© 2025 Sukanta Hui – All rights reserved.</p>
    <%-- For dynamic include, we can access the parameter --%>
    <% if (request.getParameter("color") != null) { %>
        <p style="color: <%= request.getParameter("color") %>;">Dynamic color applied!</p>
    <% } %>
</footer>
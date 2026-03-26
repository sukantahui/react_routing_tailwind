<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>AJAX Demo</title>
    <script>
        function loadData() {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    document.getElementById("result").innerHTML = xhr.responseText;
                }
            };
            var name = document.getElementById("name").value;
            xhr.open("GET", "DataServlet?name=" + encodeURIComponent(name), true);
            xhr.send();
        }
    </script>
</head>
<body>
    <h2>AJAX with XMLHttpRequest</h2>
    Enter name: <input type="text" id="name" />
    <button onclick="loadData()">Say Hello</button>
    <div id="result"></div>
</body>
</html>
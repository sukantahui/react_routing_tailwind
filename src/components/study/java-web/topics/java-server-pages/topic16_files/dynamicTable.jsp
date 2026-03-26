<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic Table from JSON</title>
    <script>
        async function loadStudents() {
            try {
                const response = await fetch('StudentServlet');
                const students = await response.json();
                let table = '<table border="1"><tr><th>Name</th><th>Grade</th></tr>';
                students.forEach(s => {
                    table += `<tr><td>${s.name}</td><td>${s.grade}</td></tr>`;
                });
                table += '</table>';
                document.getElementById('tableContainer').innerHTML = table;
            } catch (error) {
                console.error('Error:', error);
            }
        }
    </script>
</head>
<body>
    <h2>Student List (AJAX)</h2>
    <button onclick="loadStudents()">Load Students</button>
    <div id="tableContainer"></div>
</body>
</html>
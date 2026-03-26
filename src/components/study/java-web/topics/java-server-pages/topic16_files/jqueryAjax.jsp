<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>jQuery AJAX Demo</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $("#loadBtn").click(function() {
                $.ajax({
                    url: "DataServlet",
                    data: { name: $("#name").val() },
                    success: function(response) {
                        $("#result").html(response);
                    },
                    error: function() {
                        $("#result").html("Error occurred");
                    }
                });
            });
        });
    </script>
</head>
<body>
    <h2>jQuery AJAX</h2>
    Name: <input type="text" id="name" />
    <button id="loadBtn">Greet</button>
    <div id="result"></div>
</body>
</html>
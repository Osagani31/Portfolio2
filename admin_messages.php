<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Messages - Admin Panel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #ff416c;
            padding-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #ff416c;
            color: white;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        .message-cell {
            max-width: 300px;
            word-wrap: break-word;
        }
        .date-cell {
            white-space: nowrap;
        }
        .no-messages {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        .refresh-btn {
            background: #ff416c;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 20px;
        }
        .refresh-btn:hover {
            background: #e6396b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contact Form Submissions</h1>
        <button class="refresh-btn" onclick="location.reload()">Refresh</button>
        
        <?php
        // Database configuration
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "portfolio_db";

        try {
            // Create connection
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Fetch all messages ordered by most recent first
            $stmt = $conn->prepare("SELECT id, name, email, message, submitted_at FROM contacts ORDER BY submitted_at DESC");
            $stmt->execute();
            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            if (count($messages) > 0) {
                echo "<table>";
                echo "<thead>";
                echo "<tr>";
                echo "<th>ID</th>";
                echo "<th>Name</th>";
                echo "<th>Email</th>";
                echo "<th>Message</th>";
                echo "<th>Submitted</th>";
                echo "</tr>";
                echo "</thead>";
                echo "<tbody>";
                
                foreach ($messages as $message) {
                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($message['id']) . "</td>";
                    echo "<td>" . htmlspecialchars($message['name']) . "</td>";
                    echo "<td>" . htmlspecialchars($message['email']) . "</td>";
                    echo "<td class='message-cell'>" . nl2br(htmlspecialchars($message['message'])) . "</td>";
                    echo "<td class='date-cell'>" . date('Y-m-d H:i:s', strtotime($message['submitted_at'])) . "</td>";
                    echo "</tr>";
                }
                
                echo "</tbody>";
                echo "</table>";
                
                echo "<p><strong>Total Messages: " . count($messages) . "</strong></p>";
            } else {
                echo "<div class='no-messages'>";
                echo "<h3>No messages yet</h3>";
                echo "<p>Contact form submissions will appear here.</p>";
                echo "</div>";
            }
            
        } catch(PDOException $e) {
            echo "<div style='color: red; padding: 20px; background: #ffebee; border-radius: 5px;'>";
            echo "<h3>Database Error</h3>";
            echo "<p>Error: " . $e->getMessage() . "</p>";
            echo "<p><strong>Make sure XAMPP is running and the database is properly configured.</strong></p>";
            echo "</div>";
        }
        
        // Close connection
        $conn = null;
        ?>
    </div>
</body>
</html>

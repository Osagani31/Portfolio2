# Contact Form Database Setup Instructions

## Prerequisites
- XAMPP installed and running
- Apache and MySQL services started in XAMPP Control Panel

## Setup Steps

### 1. Database Setup
1. Open phpMyAdmin in your browser: `http://localhost/phpmyadmin`
2. Click on "SQL" tab
3. Copy and paste the contents of `database_setup.sql` file
4. Click "Go" to execute the SQL commands
5. Verify that the `portfolio_db` database and `contacts` table are created

### 2. File Structure
Make sure these files are in your project directory:
```
portfolio2/
├── index.html (updated with form action)
├── script.js (updated with AJAX submission)
├── submit_contact.php (handles form submission)
├── admin_messages.php (view submitted messages)
├── database_setup.sql (database creation script)
└── setup_instructions.md (this file)
```

### 3. Test the Setup
1. Start XAMPP (Apache and MySQL)
2. Open your portfolio: `http://localhost/portfolio2/index.html`
3. Fill out the contact form and submit
4. Check if the message appears in: `http://localhost/portfolio2/admin_messages.php`

### 4. Database Configuration
The default XAMPP settings used:
- Host: localhost
- Username: root
- Password: (empty)
- Database: portfolio_db

If your XAMPP has different settings, update them in:
- `submit_contact.php` (lines 3-6)
- `admin_messages.php` (lines 42-45)

### 5. Features Included
- Form validation (client-side and server-side)
- XSS protection (input sanitization)
- AJAX form submission (no page reload)
- Success/error message display
- Admin panel to view all submissions
- Responsive design

### 6. Security Notes
- This is a basic implementation for local development
- For production use, consider adding:
  - CSRF protection
  - Rate limiting
  - Better input validation
  - Database connection error handling
  - User authentication for admin panel

### 7. Troubleshooting
- If you get "Database error": Make sure MySQL is running in XAMPP
- If you get "404 Not Found": Check file paths and make sure Apache is running
- If form doesn't submit: Check browser console for JavaScript errors
- If no data appears: Check phpMyAdmin to see if records are being inserted

### 8. Viewing Your Data
- Admin panel: `http://localhost/portfolio2/admin_messages.php`
- phpMyAdmin: `http://localhost/phpmyadmin` → portfolio_db → contacts table

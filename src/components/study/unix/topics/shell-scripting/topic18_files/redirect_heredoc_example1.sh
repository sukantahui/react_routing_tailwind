#!/bin/bash
# Inline input for configuration generation

echo "=== Configuration Generation ==="

# 1. Basic here-document
echo "Creating config file with here-document..."

cat > /tmp/app_config.conf << EOF
# Application Configuration
# Generated on $(date)

server {
    listen 8080;
    server_name localhost;
    
    location / {
        root /var/www/html;
        index index.html;
    }
    
    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
}

# Database settings
database {
    host = localhost
    port = 3306
    name = app_db
    user = app_user
}
EOF

echo "Config file created at /tmp/app_config.conf"
echo -e "\nConfig contents:"
cat /tmp/app_config.conf

# 2. Here-document with variable expansion
echo -e "\n\nCreating deployment script with variables..."
ENVIRONMENT="production"
DATABASE_HOST="db.production.naihati.internal"

cat > /tmp/deploy.sh << EOF
#!/bin/bash
# Deployment script for $ENVIRONMENT
# Database: $DATABASE_HOST

echo "Deploying to $ENVIRONMENT environment"
echo "Connecting to database at $DATABASE_HOST"

# Deployment steps
cd /opt/app
git pull origin main
npm install
npm run build:$ENVIRONMENT

echo "Deployment completed at \$(date)"
EOF

chmod +x /tmp/deploy.sh
echo "Deployment script created: /tmp/deploy.sh"
echo -e "\nScript contents:"
cat /tmp/deploy.sh

# 3. Here-document without variable expansion
echo -e "\n\nCreating template without variable expansion..."
cat > /tmp/template.txt << 'EOF'
# Template File
# Variables will not be expanded

Environment: ${ENVIRONMENT}
Database: ${DB_HOST}
Port: ${APP_PORT}

# These remain as literals
EOF

echo "Template created at /tmp/template.txt"
echo -e "\nTemplate contents (note variables not expanded):"
cat /tmp/template.txt

# 4. Here-string (<<<) for single line input
echo -e "\n\nUsing here-string for single line input..."
echo "Converting text to uppercase with here-string:"
tr 'a-z' 'A-Z' <<< "hello from naihati deployment system"

echo -e "\nCounting words:"
wc -w <<< "This is a test sentence for the deployment system"

# 5. Feeding here-document to command
echo -e "\n\nFeeding here-document directly to sort command:"
sort << END
banana
apple
cherry
date
elderberry
END

# Cleanup
rm -f /tmp/app_config.conf /tmp/deploy.sh /tmp/template.txt
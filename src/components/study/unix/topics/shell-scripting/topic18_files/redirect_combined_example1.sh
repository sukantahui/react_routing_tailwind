#!/bin/bash
# Complete output capture for Naihati deployment

echo "=== Naihati Deployment System ==="
DEPLOY_LOG="/var/log/naihati_deploy_$(date +%Y%m%d_%H%M%S).log"

# Method 1: Using &> (Bash specific)
echo "Method 1: Using &> to capture all output"
{
    echo "Starting deployment..."
    echo "Current directory: $(pwd)"
    
    # Simulate deployment steps
    echo "Step 1: Checking prerequisites"
    which docker && echo "Docker found" || echo "Docker not found"
    
    echo "Step 2: Building image"
    echo "docker build -t naihati-app ."
    
    echo "Step 3: Deploying containers"
    echo "docker-compose up -d"
    
    # This error will be captured too
    ls /nonexistent 2>/dev/null || echo "Error handled gracefully"
    
    echo "Deployment completed at $(date)"
} &> "$DEPLOY_LOG"

echo "Deployment log saved to: $DEPLOY_LOG"
echo -e "\nLog contents:"
cat "$DEPLOY_LOG"

# Method 2: Using > file 2>&1 (POSIX compatible)
echo -e "\n\nMethod 2: Using > file 2>&1 (POSIX)"
POSIX_LOG="/tmp/posix_deploy.log"

echo "Starting POSIX-compatible deployment" > "$POSIX_LOG"
echo "Running checks..." >> "$POSIX_LOG"
uname -a >> "$POSIX_LOG" 2>&1
ls /nonexistent >> "$POSIX_LOG" 2>&1
echo "Checks completed" >> "$POSIX_LOG" 2>&1

echo -e "\nPOSIX log contents:"
cat "$POSIX_LOG"

# Method 3: Using tee to see and save output
echo -e "\n\nMethod 3: Using tee to see and save"
echo "Deploying with tee (see output and save to log)..."

{
    echo "=== Tee Deployment ==="
    echo "Step 1: Update packages"
    echo "apt-get update"
    
    echo "Step 2: Install dependencies"
    echo "apt-get install -y python3 nodejs"
    
    echo "Step 3: Start services"
    echo "systemctl start nginx"
    
    echo "Deployment with tee completed"
} 2>&1 | tee "/tmp/tee_deploy.log"

echo -e "\nTee log also saved to /tmp/tee_deploy.log"

# Cleanup
rm -f "$POSIX_LOG" "/tmp/tee_deploy.log"
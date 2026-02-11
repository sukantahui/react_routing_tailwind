#!/bin/bash
# Service monitoring with detailed error reporting in Shyamnagar

echo "=== Shyamnagar Service Monitoring ==="
LOG_FILE="/var/log/service_monitor.log"
SERVICES=("nginx" "mysql" "redis" "postgresql")

# Function to check service status
check_service() {
    local service="$1"
    
    systemctl is-active --quiet "$service"
    local status=$?
    
    case $status in
        0)
            echo "[$(date)] ✓ $service: ACTIVE" >> "$LOG_FILE"
            echo "  ✓ $service: Running"
            return 0
            ;;
        3)
            echo "[$(date)] ✗ $service: INACTIVE" >> "$LOG_FILE"
            echo "  ✗ $service: Not running"
            return 1
            ;;
        4)
            echo "[$(date)] ? $service: UNKNOWN" >> "$LOG_FILE"
            echo "  ? $service: Service not found"
            return 2
            ;;
        *)
            echo "[$(date)] ! $service: ERROR (code: $status)" >> "$LOG_FILE"
            echo "  ! $service: Error checking status"
            return 3
            ;;
    esac
}

# Main monitoring loop
overall_status=0
failed_services=()

echo "Checking services..."
for service in "${SERVICES[@]}"; do
    check_service "$service"
    service_exit=$?
    
    if [ $service_exit -ne 0 ]; then
        overall_status=1
        failed_services+=("$service:$service_exit")
    fi
done

# Report results
echo -e "\n=== Monitoring Summary ==="
if [ $overall_status -eq 0 ]; then
    echo "✓ All services are running normally"
    exit 0
else
    echo "✗ Some services have issues:"
    for failed in "${failed_services[@]}"; do
        IFS=':' read -r service code <<< "$failed"
        echo "  - $service (exit code: $code)"
    done
    
    # Send alert (simulated)
    echo "Sending alert to Shyamnagar operations team..."
    
    # Return custom exit code based on severity
    if [ ${#failed_services[@]} -eq 1 ]; then
        exit 10  # Minor issue
    elif [ ${#failed_services[@]} -le 3 ]; then
        exit 20  # Moderate issue
    else
        exit 30  # Critical issue
    fi
fi
#!/bin/bash
# Production service manager
# For Barrackpore College web services

SERVICES=("web_server" "api_service" "cache_service" "database_proxy")
LOG_DIR="/var/log/services"
PID_DIR="/var/run/services"

# Create directories if they don't exist
mkdir -p "$LOG_DIR" "$PID_DIR"

start_service() {
    local service=$1
    local script="./${service}.sh"
    
    if [ ! -f "$script" ]; then
        echo "❌ Script not found: $script"
        return 1
    fi
    
    if [ -f "${PID_DIR}/${service}.pid" ]; then
        local pid=$(cat "${PID_DIR}/${service}.pid")
        if kill -0 "$pid" 2>/dev/null; then
            echo "⚠️ $service is already running (PID: $pid)"
            return 0
        fi
    fi
    
    echo "🚀 Starting $service..."
    nohup "$script" > "${LOG_DIR}/${service}.log" 2>&1 &
    local pid=$!
    
    echo $pid > "${PID_DIR}/${service}.pid"
    echo "✅ $service started with PID: $pid"
    return 0
}

stop_service() {
    local service=$1
    
    if [ ! -f "${PID_DIR}/${service}.pid" ]; then
        echo "⚠️ $service is not running (no PID file)"
        return 0
    fi
    
    local pid=$(cat "${PID_DIR}/${service}.pid")
    
    echo "🛑 Stopping $service (PID: $pid)..."
    
    # Try graceful shutdown first
    if kill -0 "$pid" 2>/dev/null; then
        kill -TERM "$pid"
        
        # Wait for graceful shutdown
        local timeout=30
        while kill -0 "$pid" 2>/dev/null && [ $timeout -gt 0 ]; do
            sleep 1
            ((timeout--))
        done
        
        # Force kill if still running
        if kill -0 "$pid" 2>/dev/null; then
            echo "⚠️ Force killing $service..."
            kill -KILL "$pid"
            sleep 2
        fi
    fi
    
    rm -f "${PID_DIR}/${service}.pid"
    echo "✅ $service stopped"
}

check_service() {
    local service=$1
    
    if [ ! -f "${PID_DIR}/${service}.pid" ]; then
        echo "❌ $service: NOT RUNNING (no PID file)"
        return 1
    fi
    
    local pid=$(cat "${PID_DIR}/${service}.pid")
    
    if kill -0 "$pid" 2>/dev/null; then
        echo "✅ $service: RUNNING (PID: $pid)"
        # Check memory usage
        local mem_usage=$(ps -p "$pid" -o %mem= 2>/dev/null || echo "N/A")
        echo "   Memory usage: ${mem_usage}%"
        return 0
    else
        echo "❌ $service: STOPPED (stale PID file)"
        rm -f "${PID_DIR}/${service}.pid"
        return 1
    fi
}

case "$1" in
    start)
        echo "Starting all services..."
        for service in "${SERVICES[@]}"; do
            start_service "$service" &
        done
        wait
        echo "All services started"
        ;;
    stop)
        echo "Stopping all services..."
        for service in "${SERVICES[@]}"; do
            stop_service "$service"
        done
        echo "All services stopped"
        ;;
    restart)
        echo "Restarting all services..."
        for service in "${SERVICES[@]}"; do
            stop_service "$service"
            start_service "$service" &
        done
        wait
        echo "All services restarted"
        ;;
    status)
        echo "Service Status:"
        for service in "${SERVICES[@]}"; do
            check_service "$service"
        done
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac
#!/bin/bash
# Basic process monitoring script
# For Barrackpore College server monitoring

echo "=== System Process Monitor ==="
echo "Generated: $(date)"
echo "=============================="

# 1. Show top 10 CPU-consuming processes
echo -e "\n🔍 Top 10 CPU Consumers:"
ps aux --sort=-%cpu | head -11

# 2. Show top 10 memory-consuming processes  
echo -e "\n💾 Top 10 Memory Consumers:"
ps aux --sort=-%mem | head -11

# 3. Check specific service status
echo -e "\n🔧 Service Status:"
services=("nginx" "mysql" "redis" "postgres")
for service in "${services[@]}"; do
    if pgrep -x "$service" > /dev/null; then
        echo "✅ $service: RUNNING (PID: $(pgrep -x $service))"
    else
        echo "❌ $service: STOPPED"
    fi
done

# 4. Zombie process check
zombies=$(ps aux | awk '$8=="Z" {print $2}')
if [ -n "$zombies" ]; then
    echo -e "\n🧟 Zombie Processes Found:"
    echo "$zombies"
else
    echo -e "\n✅ No zombie processes"
fi

# 5. System load average
echo -e "\n📊 System Load:"
uptime | awk -F'load average:' '{print $2}'
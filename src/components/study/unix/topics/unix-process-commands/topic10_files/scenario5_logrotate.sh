#!/bin/bash
# scenario5_logrotate.sh - Reload config with SIGHUP

echo "=== Graceful Configuration Reload Using SIGHUP ==="
# Simulate a daemon (simple web server or service)
cat << 'EOF' > /tmp/simulated_daemon.sh
#!/bin/bash
CONFIG_FILE="/tmp/demo.conf"
echo "port=8080" > $CONFIG_FILE

reload_config() {
    echo "$(date): Reloading configuration..." >> /tmp/daemon.log
    source $CONFIG_FILE
    echo "New port = $port" >> /tmp/daemon.log
}

trap reload_config HUP

echo "Daemon started. PID: $$"
while true; do
    echo "Listening on port $port" >> /tmp/daemon.log
    sleep 5
done
EOF
chmod +x /tmp/simulated_daemon.sh
/tmp/simulated_daemon.sh &
DAEMON_PID=$!
echo "Simulated daemon PID: $DAEMON_PID"
echo "Log file: /tmp/daemon.log"

echo -e "\nInitial log entries:"
tail -3 /tmp/daemon.log

echo -e "\nNow change config file and send SIGHUP"
echo "port=9090" > /tmp/demo.conf
kill -HUP $DAEMON_PID
sleep 2
echo -e "\nLog after SIGHUP:"
tail -5 /tmp/daemon.log

echo -e "\nClean up: kill daemon"
kill $DAEMON_PID
rm -f /tmp/simulated_daemon.sh /tmp/demo.conf /tmp/daemon.log
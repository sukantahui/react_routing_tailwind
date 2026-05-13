#!/bin/bash
# start_vi.sh – Demonstrate creating a new script and opening with vi
echo "=== Creating a new script ==="
SCRIPT_NAME="hello_$(date +%s).sh"

# Write a simple shebang and echo line
cat > "$SCRIPT_NAME" << 'EOF'
#!/bin/bash
echo "Hello from $(basename $0)"
EOF

echo "Created $SCRIPT_NAME"
echo "Opening with vi (press i to edit, ESC then :wq to save and quit)"
echo "---------------------------------------------"
sleep 2
vi "$SCRIPT_NAME"
#!/bin/bash
# simple_syscall_demo.sh - Demonstrate manual syscall invocation using 'strace' on a tiny C program

cat << 'EOF' > /tmp/syscall_test.c
#include <unistd.h>
int main() {
    write(1, "Hello via syscall\n", 18);
    return 0;
}
EOF

gcc /tmp/syscall_test.c -o /tmp/syscall_test 2>/dev/null
echo "=== Tracing the compiled program ==="
strace /tmp/syscall_test 2>&1 | grep write

rm -f /tmp/syscall_test.c /tmp/syscall_test
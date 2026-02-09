#!/bin/bash
# Script to detect and test shell type
# Can be run in different modes to see behavior

echo "=== Shell Type Detection Script ==="
echo ""

# Method 1: Check PS1 (simplest)
echo "1. Checking PS1 variable:"
if [ -n "$PS1" ]; then
    echo "   PS1 is set: INTERACTIVE shell"
else
    echo "   PS1 is empty: NON-INTERACTIVE shell"
fi

echo ""

# Method 2: Check shell options
echo "2. Using shopt command:"
if shopt -q login_shell; then
    echo "   login_shell option is set: LOGIN shell"
else
    echo "   login_shell option is not set: NON-LOGIN shell"
fi

echo ""

# Method 3: Check $- special parameter
echo "3. Checking \$- special parameter:"
echo "   Current flags: $-"
if [[ $- == *i* ]]; then
    echo "   Contains 'i': INTERACTIVE"
else
    echo "   Does not contain 'i': NON-INTERACTIVE"
fi

echo ""

# Method 4: Check shell name
echo "4. Checking shell name (\$0):"
echo "   Shell name: $0"
if [[ $0 == -* ]]; then
    echo "   Starts with '-': LOGIN shell"
else
    echo "   Does not start with '-': NON-LOGIN shell"
fi

echo ""

# Method 5: Test if connected to terminal
echo "5. Testing terminal connection:"
if [ -t 0 ]; then
    echo "   stdin is connected to terminal"
else
    echo "   stdin is NOT connected to terminal"
fi

echo ""
echo "=== Summary ==="
if [[ $- == *i* ]] && shopt -q login_shell; then
    echo "Type: Interactive Login Shell"
    echo "Example: SSH login, console login"
elif [[ $- == *i* ]] && ! shopt -q login_shell; then
    echo "Type: Interactive Non-Login Shell"
    echo "Example: New terminal tab, GUI terminal"
elif ! [[ $- == *i* ]] && shopt -q login_shell; then
    echo "Type: Non-Interactive Login Shell"
    echo "Example: ssh host 'command'"
else
    echo "Type: Non-Interactive Non-Login Shell"
    echo "Example: Cron job, script execution"
fi

echo ""
echo "Tip: Run this script in different ways to see different results:"
echo "  bash topic1_files/startup_test.sh          # Non-interactive non-login"
echo "  bash -i topic1_files/startup_test.sh       # Interactive non-login"
echo "  bash --login -c 'bash topic1_files/startup_test.sh'  # Non-interactive login"
echo "  bash --login -i -c 'bash topic1_files/startup_test.sh' # Interactive login"
#!/bin/bash
# Global Variable Examples

echo "=== Global Variables (Shell Variables) ==="
echo ""

# 1. Creating global variables
echo "1. Creating global variables:"
name="Swadeep"
age=22
project_dir="/home/swadeep/projects"
echo "  name='$name'"
echo "  age=$age"
echo "  project_dir='$project_dir'"
echo ""

# 2. Accessing global variables
echo "2. Accessing variables:"
echo "  Hello $name, you are $age years old."
echo "  Project directory: $project_dir"
echo ""

# 3. Modifying global variables
echo "3. Modifying variables:"
age=23
name="Swadeep Das"
echo "  Updated: $name is now $age years old."
echo ""

# 4. Using variables in commands
echo "4. Using variables in commands:"
file_count=$(ls -1 "$project_dir" 2>/dev/null | wc -l)
echo "  Files in $project_dir: $file_count"
echo ""

# 5. Variable expansion
echo "5. Variable expansion techniques:"
base_name="document"
extension="txt"
filename="${base_name}_report.${extension}"
echo "  Filename: $filename"
echo ""

# 6. Default values
echo "6. Using default values:"
unset maybe_set
echo "  Value: ${maybe_set:-default_value}"
echo "  Variable is still: ${maybe_set:-unset}"
echo ""
maybe_set="actual_value"
echo "  When set: ${maybe_set:-default_value}"
echo ""

# 7. Arrays as global variables
echo "7. Global array variables:"
students=("Tuhina" "Abhronila" "Debangshu" "Swadeep")
echo "  Students: ${students[@]}"
echo "  First student: ${students[0]}"
echo "  Total students: ${#students[@]}"
echo ""

# 8. Special global variables
echo "8. Special global variables:"
echo "  Script name: $0"
echo "  Number of arguments: $#"
echo "  All arguments: $@"
echo "  Process ID: $$"
echo "  Exit status of last command: $?"
echo ""

# 9. Showing all global variables
echo "9. Showing all shell variables (partial list):"
echo "  Running: set | head -20"
set | head -20
echo ""

echo "=== Key Points About Global Variables ==="
echo "• Created with: VAR=value"
echo "• Accessible throughout current shell"
echo "• Not inherited by child processes"
echo "• View with 'set' command"
echo "• Use curly braces for clarity: \${VAR}"
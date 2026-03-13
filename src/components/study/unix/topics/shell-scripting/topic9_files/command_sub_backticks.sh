# topic9_files/command_sub_backticks.sh
#!/bin/bash
# Backticks syntax (legacy - not recommended for new scripts)

# Using backticks for command substitution
current_date=`date +%Y-%m-%d`
echo "Backticks date: $current_date"

# Problems with backticks - escaping becomes confusing
# This works but is hard to read:
output=`echo "The date is \`date\`"`
echo "$output"

# Nested backticks are particularly ugly
# Don't do this:
inner=`date +%Y`
outer=`echo "Year: \`echo $inner\`"`
echo "Nested backticks: $outer"

# Compare with modern $( ) syntax - much cleaner!
modern_inner=$(date +%Y)
modern_outer=$(echo "Year: $(echo $modern_inner)")
echo "Modern syntax: $modern_outer"

# Backticks inside double quotes
echo "Current dir: `pwd`"

# Recommendation: Always use $(command) instead
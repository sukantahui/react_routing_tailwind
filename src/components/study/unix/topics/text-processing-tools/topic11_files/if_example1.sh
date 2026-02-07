# WRONG: Only print statement is conditional
if (condition)
    print "True"
    process_data()  # ALWAYS executes!

# CORRECT: Use braces
if (condition) {
    print "True"
    process_data()
}
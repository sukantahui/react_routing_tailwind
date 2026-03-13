# Multi-way branching
switch (expression) {
    case value1:
        # Code for value1
        break;
    case value2:
    case value3:
        # Code for value2 or value3
        break;
    default:
        # Default code
}

# Example: Department codes
switch ($5) {
    case "CS":
        dept = "Computer Science";
        break;
    case "MA":
        dept = "Mathematics";
        break;
    case "PH":
        dept = "Physics";
        break;
    default:
        dept = "General";
}
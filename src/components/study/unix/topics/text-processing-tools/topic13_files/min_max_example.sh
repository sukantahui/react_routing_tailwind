#!/bin/bash
# Min/Max calculation - Temperature data
# Data: City, Temperature

echo "Temperature Extremes - Ichapur Weather Station"
echo "=============================================="

awk '
BEGIN {
    # Initialize with unrealistic values
    min_temp = 1000   # Very high initial value
    max_temp = -1000  # Very low initial value
    min_city = ""
    max_city = ""
    
    printf("%-15s %12s\n", "City", "Temperature")
    printf("%-15s %12s\n", "----", "-----------")
}
{
    temp = $2
    printf("%-15s %10.1f°C\n", $1, temp)
    
    # Update minimum
    if (temp < min_temp) {
        min_temp = temp
        min_city = $1
    }
    
    # Update maximum
    if (temp > max_temp) {
        max_temp = temp
        max_city = $1
    }
}
END {
    printf("\n%-15s %12s\n", "------------", "-----------")
    printf("%-15s %10.1f°C (%s)\n", "Minimum:", min_temp, min_city)
    printf("%-15s %10.1f°C (%s)\n", "Maximum:", max_temp, max_city)
    printf("%-15s %10.1f°C\n", "Range:", max_temp - min_temp)
}
' << 'EOF'
Kolkata 32.5
Delhi 41.2
Mumbai 35.8
Chennai 38.4
Shillong 24.6
Jaipur 39.8
EOF
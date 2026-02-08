#!/bin/bash
# Temperature conversion table (Celsius to Fahrenheit)

echo "Temperature Conversion Table"
echo "Celsius  Fahrenheit"
echo "-------  ----------"

awk '
BEGIN {
    # Print from -40°C to 100°C in steps of 10
    for (c = -40; c <= 100; c += 10) {
        f = (c * 9/5) + 32
        # Right align numbers, 2 decimal places for Fahrenheit
        printf("%7.1f°C %10.1f°F\n", c, f)
    }
}
'
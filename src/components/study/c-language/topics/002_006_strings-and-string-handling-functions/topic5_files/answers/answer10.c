#include <stdio.h>
#include <string.h>

/**
 * Project 10: Roman Numerals to Decimal Integer Converter
 * Converts a Roman numeral string (e.g. "MCMXCIV") to its decimal integer (1994).
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int romanValue(char c) {
    switch (c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default:  return 0;
    }
}

int romanToInt(const char *s) {
    int total = 0;
    int len = strlen(s);

    for (int i = 0; i < len; i++) {
        int v1 = romanValue(s[i]);
        if (i + 1 < len) {
            int v2 = romanValue(s[i + 1]);
            if (v1 >= v2) {
                total += v1;
            } else {
                total += (v2 - v1);
                i++; // Skip next character
            }
        } else {
            total += v1;
        }
    }
    return total;
}

int main(void) {
    const char *r1 = "XIV";
    const char *r2 = "MCMXCIV";
    const char *r3 = "MMXXVI";

    printf("Roman %-10s = %d\n", r1, romanToInt(r1));
    printf("Roman %-10s = %d\n", r2, romanToInt(r2));
    printf("Roman %-10s = %d (Year 2026)\n", r3, romanToInt(r3));

    return 0;
}

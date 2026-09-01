/**
 * ============================================================================
 * Project 18: Roman Numeral to Decimal & Decimal to Roman Bidirectional Converter
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

/* Convert Decimal Integer to Roman Numeral String */
void decimalToRoman(int num) {
    printf("Decimal %4d -> Roman: ", num);
    if (num <= 0 || num > 3999) {
        printf("Out of standard range (1 - 3999)\n");
        return;
    }

    int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    const char* symbols[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    int count = sizeof(values) / sizeof(values[0]);

    for (int i = 0; i < count; i++) {
        while (num >= values[i]) {
            printf("%s", symbols[i]);
            num -= values[i];
        }
    }
    printf("\n");
}

/* Helper to map single Roman character to integer */
int romanCharValue(char ch) {
    switch (ch) {
        case 'I': case 'i': return 1;
        case 'V': case 'v': return 5;
        case 'X': case 'x': return 10;
        case 'L': case 'l': return 50;
        case 'C': case 'c': return 100;
        case 'D': case 'd': return 500;
        case 'M': case 'm': return 1000;
        default: return 0;
    }
}

/* Convert Roman Numeral String to Decimal Integer */
int romanToDecimal(const char* roman) {
    int total = 0;
    int i = 0;

    while (roman[i] != '\0') {
        int s1 = romanCharValue(roman[i]);
        if (roman[i + 1] != '\0') {
            int s2 = romanCharValue(roman[i + 1]);
            if (s1 >= s2) {
                total += s1;
                i++;
            } else {
                total += (s2 - s1);
                i += 2;
            }
        } else {
            total += s1;
            i++;
        }
    }
    return total;
}

int main(void) {
    printf("===================================================================\n");
    printf("     BIDIRECTIONAL ROMAN NUMERAL CONVERTER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    /* 1. Decimal to Roman */
    printf("--- [1] Decimal to Roman Conversions ---\n");
    decimalToRoman(1947);
    decimalToRoman(2024);
    decimalToRoman(399);
    decimalToRoman(48);

    /* 2. Roman to Decimal */
    printf("\n--- [2] Roman to Decimal Conversions ---\n");
    const char* testRomans[] = {"MCMXLVII", "MMXXIV", "CCCXCIX", "XLVIII"};
    for (int i = 0; i < 4; i++) {
        printf("Roman %-10s -> Decimal: %d\n", testRomans[i], romanToDecimal(testRomans[i]));
    }

    printf("===================================================================\n");
    return 0;
}

/**
 * ============================================================================
 * Project 2: Multi-Unit Temperature Converter (Celsius, Fahrenheit, Kelvin, Rankine)
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void convertTemperature(float celsius) {
    float fahrenheit = (celsius * 9.0f / 5.0f) + 32.0f;
    float kelvin = celsius + 273.15f;
    float rankine = (celsius + 273.15f) * 9.0f / 5.0f;

    printf("Input Base: %6.2f °C\n", celsius);
    printf("  • Fahrenheit : %8.2f °F  [Formula: (C * 9/5) + 32]\n", fahrenheit);
    printf("  • Kelvin     : %8.2f K   [Formula: C + 273.15]\n", kelvin);
    printf("  • Rankine    : %8.2f °R  [Formula: (C + 273.15) * 9/5]\n\n", rankine);
}

int main(void) {
    printf("===================================================================\n");
    printf("     SCIENTIFIC TEMPERATURE CONVERTER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    printf("--- [Sample Case 1: Freezing Point of Water] ---\n");
    convertTemperature(0.0f);

    printf("--- [Sample Case 2: Human Body Temperature] ---\n");
    convertTemperature(37.0f);

    printf("--- [Sample Case 3: Boiling Point of Water] ---\n");
    convertTemperature(100.0f);

    printf("===================================================================\n");
    return 0;
}

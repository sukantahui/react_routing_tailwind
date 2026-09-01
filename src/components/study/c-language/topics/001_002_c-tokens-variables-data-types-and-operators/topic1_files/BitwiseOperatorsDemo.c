#include <stdio.h>
#include <stdint.h>

/**
 * BitwiseOperatorsDemo.c
 * Bitwise Flag Register & Masking Utility
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#define FLAG_POWER   (1 << 0) // 0x01
#define FLAG_ALARM   (1 << 1) // 0x02
#define FLAG_SENSOR  (1 << 2) // 0x04

int main(void) {
    uint8_t systemStatus = 0;

    printf("=== System Status Register Inspection ===\n\n");

    // Enable Power & Sensor flags
    systemStatus |= FLAG_POWER;
    systemStatus |= FLAG_SENSOR;

    printf("Initial Status Byte: 0x%02X\n", systemStatus);
    printf("Power Active?  : %s\n", (systemStatus & FLAG_POWER) ? "YES" : "NO");
    printf("Alarm Active?  : %s\n", (systemStatus & FLAG_ALARM) ? "YES" : "NO");
    printf("Sensor Active? : %s\n", (systemStatus & FLAG_SENSOR) ? "YES" : "NO");

    // Toggle Alarm Flag
    systemStatus ^= FLAG_ALARM;
    printf("\nAfter Toggling Alarm Flag: 0x%02X\n", systemStatus);
    printf("Alarm Active?  : %s\n", (systemStatus & FLAG_ALARM) ? "YES" : "NO");

    return 0;
}

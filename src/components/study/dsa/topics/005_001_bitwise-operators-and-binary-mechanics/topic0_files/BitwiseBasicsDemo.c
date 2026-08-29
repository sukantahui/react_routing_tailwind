/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Bitwise Operators, Binary Mechanics & Endianness Inspection
 * File: BitwiseBasicsDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

// Utility to print binary representation of 8-bit, 16-bit, and 32-bit integers
void printBinary8(uint8_t n) {
    for (int i = 7; i >= 0; i--) {
        printf("%d", (n >> i) & 1);
        if (i == 4) printf(" ");
    }
}

void printBinary32(uint32_t n) {
    for (int i = 31; i >= 0; i--) {
        printf("%d", (n >> i) & 1);
        if (i % 8 == 0 && i != 0) printf(" ");
    }
}

// 1. Inspect System Endianness in Physical RAM
void checkEndianness(void) {
    uint32_t testVal = 0x12345678;
    uint8_t* bytePtr = (uint8_t*)&testVal;

    printf("1. Physical Memory Endianness Inspection:\n");
    printf("   32-bit Integer: 0x12345678 (Decimal: %u)\n", testVal);
    printf("   Memory Address      Value (Hex)   Meaning\n");
    printf("   -------------------------------------------------\n");
    for (int i = 0; i < 4; i++) {
        printf("   %p   0x%02X          Byte %d\n", (void*)(bytePtr + i), bytePtr[i], i);
    }

    if (bytePtr[0] == 0x78) {
        printf("   -> Architecture Result: LITTLE-ENDIAN (Least significant byte stored at lowest address)\n\n");
    } else if (bytePtr[0] == 0x12) {
        printf("   -> Architecture Result: BIG-ENDIAN (Most significant byte stored at lowest address)\n\n");
    } else {
        printf("   -> Architecture Result: Mixed/Unknown Endian\n\n");
    }
}

// 2. Fundamental Bitwise Operators in C
void demonstrateBitwiseOperators(uint8_t a, uint8_t b) {
    printf("2. Fundamental Bitwise Operations (8-bit demonstration):\n");
    printf("   a      = %3u | Binary: ", a); printBinary8(a); printf("\n");
    printf("   b      = %3u | Binary: ", b); printBinary8(b); printf("\n");
    printf("   --------------------------------------\n");

    uint8_t andRes = a & b;
    printf("   a & b  = %3u | Binary: ", andRes); printBinary8(andRes); printf(" (Bitwise AND)\n");

    uint8_t orRes = a | b;
    printf("   a | b  = %3u | Binary: ", orRes); printBinary8(orRes); printf(" (Bitwise OR)\n");

    uint8_t xorRes = a ^ b;
    printf("   a ^ b  = %3u | Binary: ", xorRes); printBinary8(xorRes); printf(" (Bitwise XOR)\n");

    uint8_t notA = ~a;
    printf("   ~a     = %3u | Binary: ", notA); printBinary8(notA); printf(" (Bitwise NOT / Inversion)\n");

    uint8_t leftShift = a << 2;
    printf("   a << 2 = %3u | Binary: ", leftShift); printBinary8(leftShift); printf(" (Left Shift: Multiplies by 2^2 = 4)\n");

    uint8_t rightShift = a >> 1;
    printf("   a >> 1 = %3u | Binary: ", rightShift); printBinary8(rightShift); printf(" (Right Shift: Divides by 2^1 = 2)\n\n");
}

// 3. C Bitfields for Memory Optimization
struct PackedSensorData {
    unsigned int sensorId   : 4; // 4 bits (0-15)
    unsigned int statusFlag : 2; // 2 bits (0-3: 00=OK, 01=Warn, 10=Crit, 11=Offline)
    unsigned int batteryLvl : 6; // 6 bits (0-63 % charge)
    unsigned int alertMode  : 1; // 1 bit  (0=Disabled, 1=Active)
    // Total bits = 13 bits (Packed into a single 16-bit or 32-bit word instead of 16 bytes!)
};

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - BITWISE MECHANICS & SYSTEMS MEMORY        \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    checkEndianness();

    uint8_t valA = 0b00111100; // 60 in decimal
    uint8_t valB = 0b00001101; // 13 in decimal
    demonstrateBitwiseOperators(valA, valB);

    // Bitfields demonstration
    struct PackedSensorData sensor;
    sensor.sensorId = 9;
    sensor.statusFlag = 1;
    sensor.batteryLvl = 55;
    sensor.alertMode = 1;

    printf("3. C Bitfield Struct (Low-Level Systems Packaging):\n");
    printf("   Sensor ID:    %u\n", sensor.sensorId);
    printf("   Status Flag:  %u\n", sensor.statusFlag);
    printf("   Battery Level:%u %%\n", sensor.batteryLvl);
    printf("   Alert Mode:   %u\n", sensor.alertMode);
    printf("   -> Struct Size in RAM: %zu bytes (Packed vs 16 bytes unpacked!)\n", sizeof(struct PackedSensorData));

    return 0;
}

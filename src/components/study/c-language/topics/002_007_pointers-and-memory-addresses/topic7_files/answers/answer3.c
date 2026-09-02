#include <stdio.h>
#include <stdint.h>

/**
 * Project 3: Generic Byte-by-Byte Memory Hex Dump & Endianness Inspector
 * Inspects low-level memory byte sequences and detects CPU architecture endianness.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void hexDump(const void *ptr, size_t size, const char *label) {
    const uint8_t *bytePtr = (const uint8_t*)ptr;
    printf("%-20s (%2zu B @ %p): ", label, size, ptr);
    for (size_t i = 0; i < size; i++) {
        printf("%02X ", bytePtr[i]);
    }
    printf("\n");
}

int checkEndianness(void) {
    uint16_t word = 0x0001;
    uint8_t *byte = (uint8_t*)&word;
    return (*byte == 0x01); // 1 for Little-Endian, 0 for Big-Endian
}

int main(void) {
    int32_t sampleInt = 0x12345678;
    float sampleFloat = 3.14159f;
    char sampleStr[] = "Coder";

    printf("====================================================\n");
    printf(" Memory Byte Dump & CPU Architecture Inspector\n");
    printf(" Educator: Sukanta Hui (Coder & AccoTax)\n");
    printf("====================================================\n\n");

    printf("CPU Architecture Endianness: %s\n\n", 
           checkEndianness() ? "LITTLE-ENDIAN (x86_64 / ARM standard)" : "BIG-ENDIAN");

    printf("Memory Dumps:\n");
    hexDump(&sampleInt, sizeof(sampleInt), "int32_t (0x12345678)");
    hexDump(&sampleFloat, sizeof(sampleFloat), "float (3.14159)");
    hexDump(sampleStr, sizeof(sampleStr), "String (\"Coder\\0\")");

    return 0;
}

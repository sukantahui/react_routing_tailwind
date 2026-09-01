#include <stdio.h>
#include <stdint.h>

/**
 * UnionsAndBitfieldsDemo.c
 * Bit-fields for hardware flags & Unions for memory overlay
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

typedef struct {
    uint8_t powerState : 1; // 1 bit
    uint8_t errorCode  : 3; // 3 bits (0-7)
    uint8_t reserved   : 4; // 4 bits
} DeviceStatusBitfield;

typedef union {
    uint32_t rawValue;
    uint8_t bytes[4];
} NetworkPacketHeader;

int main(void) {
    DeviceStatusBitfield status = {1, 5, 0};
    NetworkPacketHeader pkt;
    pkt.rawValue = 0x12345678;

    printf("=== Bit-fields & Unions Demo ===\n\n");
    printf("Size of DeviceStatusBitfield: %zu byte\n", sizeof(status));
    printf("Power State : %d\n", status.powerState);
    printf("Error Code  : %d\n\n", status.errorCode);

    printf("Union Overlay Breakdown (0x12345678):\n");
    printf("Byte 0: 0x%02X\n", pkt.bytes[0]);
    printf("Byte 1: 0x%02X\n", pkt.bytes[1]);
    printf("Byte 2: 0x%02X\n", pkt.bytes[2]);
    printf("Byte 3: 0x%02X\n", pkt.bytes[3]);

    return 0;
}

#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

#define FLAG_POWER_ON     (1 << 0)
#define FLAG_SENSOR_READY (1 << 1)
#define FLAG_TX_ACTIVE    (1 << 2)
#define FLAG_RX_BUFFER    (1 << 3)
#define FLAG_ERROR_ALERT  (1 << 4)
#define FLAG_OVERHEAT     (1 << 5)

void printBinary8(uint8_t val) {
    printf("0b");
    for (int i = 7; i >= 0; i--) {
        printf("%d", (val >> i) & 1);
    }
}

void printRegisterStatus(uint8_t reg) {
    printf("Register Value: 0x%02X (", reg);
    printBinary8(reg);
    printf(")\n");
    printf("  • Power ON     : %s\n", (reg & FLAG_POWER_ON) ? "YES" : "NO");
    printf("  • Sensor Ready : %s\n", (reg & FLAG_SENSOR_READY) ? "YES" : "NO");
    printf("  • TX Active    : %s\n", (reg & FLAG_TX_ACTIVE) ? "YES" : "NO");
    printf("  • RX Buffer    : %s\n", (reg & FLAG_RX_BUFFER) ? "YES" : "NO");
    printf("  • Error Alert  : %s\n", (reg & FLAG_ERROR_ALERT) ? "YES" : "NO");
    printf("  • Overheat     : %s\n", (reg & FLAG_OVERHEAT) ? "YES" : "NO");
}

void setFlag(uint8_t *reg, uint8_t mask) {
    *reg |= mask;
}

void clearFlag(uint8_t *reg, uint8_t mask) {
    *reg &= ~mask;
}

void toggleFlag(uint8_t *reg, uint8_t mask) {
    *reg ^= mask;
}

int main(void) {
    uint8_t statusRegister = 0x00;

    printf("=========================================================\n");
    printf("  EMBEDDED HARDWARE STATUS REGISTER & FLAGS INSPECTOR    \n");
    printf("=========================================================\n\n");

    printf("1. INITIAL REGISTER STATE:\n");
    printRegisterStatus(statusRegister);

    printf("\n2. SETTING POWER_ON AND SENSOR_READY FLAGS:\n");
    setFlag(&statusRegister, FLAG_POWER_ON | FLAG_SENSOR_READY);
    printRegisterStatus(statusRegister);

    printf("\n3. ACTIVATING TRANSMITTER (TX_ACTIVE):\n");
    setFlag(&statusRegister, FLAG_TX_ACTIVE);
    printRegisterStatus(statusRegister);

    printf("\n4. TRIGGERING ERROR ALERT & CLEARING TX:\n");
    setFlag(&statusRegister, FLAG_ERROR_ALERT);
    clearFlag(&statusRegister, FLAG_TX_ACTIVE);
    printRegisterStatus(statusRegister);

    printf("\n5. TOGGLING RX_BUFFER AND OVERHEAT FLAGS:\n");
    toggleFlag(&statusRegister, FLAG_RX_BUFFER | FLAG_OVERHEAT);
    printRegisterStatus(statusRegister);

    return 0;
}

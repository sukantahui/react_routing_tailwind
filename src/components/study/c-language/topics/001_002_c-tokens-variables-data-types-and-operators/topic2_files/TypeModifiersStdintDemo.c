/**
 * ============================================================================
 * Program: TypeModifiersStdintDemo.c
 * Module: 001_002 - C Tokens, Data Types & Operator Mechanics
 * Topic 2: Type Modifiers (short, long, signed, unsigned) & <stdint.h>
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99 (<stdint.h>, <inttypes.h>)
 * ============================================================================
 */

#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

int main(void) {
    /* 1. Classic Type Modifiers */
    signed int signedTemp = -15;
    unsigned int unsignedPacketCount = 65000U;
    short int smallSensorId = 3200;
    unsigned short int unsignedPort = 8080U;
    long int highTimestamp = 1715000000L;
    unsigned long long int memoryBytes = 18446744073709551615ULL; /* ULLONG_MAX */

    /* 2. Modern Exact-Width Integer Types from <stdint.h> */
    int8_t   statusByte   = -120;
    uint8_t  hardwareFlag = 0xFE;           /* 254 in decimal */
    int16_t  dacOutput    = -32000;
    uint16_t ethernetPort = 443;
    int32_t  transactionId = -2100000000;
    uint32_t ipv4Address  = 3232235521U;    /* 192.168.0.1 */
    int64_t  bigCounter   = -9000000000000000000LL;
    uint64_t globalUuid   = 18000000000000000000ULL;

    /* 3. Unsigned Wrap-around Demonstration */
    uint8_t wrapCounter = 255;
    printf("===================================================================\n");
    printf("     TYPE MODIFIERS & <stdint.h> - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    printf("--- [1] Classic C Type Modifiers ---\n");
    printf("Signed Temperature     (%%d)   : %d °C\n", signedTemp);
    printf("Unsigned Packet Count  (%%u)   : %u\n", unsignedPacketCount);
    printf("Signed Short Sensor    (%%hd)  : %hd\n", smallSensorId);
    printf("Unsigned Short Port    (%%hu)  : %hu\n", unsignedPort);
    printf("Signed Long Timestamp  (%%ld)  : %ld\n", highTimestamp);
    printf("Unsigned Long Long Max (%%llu) : %llu\n", memoryBytes);

    printf("\n--- [2] Modern <stdint.h> Exact-Width Types & <inttypes.h> ---\n");
    printf("int8_t   statusByte    (PRId8)  : %" PRId8 "\n", statusByte);
    printf("uint8_t  hardwareFlag  (PRIu8)  : %" PRIu8 " (Hex: 0x%" PRIX8 ")\n", hardwareFlag, hardwareFlag);
    printf("int16_t  dacOutput     (PRId16) : %" PRId16 "\n", dacOutput);
    printf("uint16_t ethernetPort  (PRIu16) : %" PRIu16 "\n", ethernetPort);
    printf("int32_t  transactionId (PRId32) : %" PRId32 "\n", transactionId);
    printf("uint32_t ipv4Address   (PRIu32) : %" PRIu32 "\n", ipv4Address);
    printf("int64_t  bigCounter    (PRId64) : %" PRId64 "\n", bigCounter);
    printf("uint64_t globalUuid    (PRIu64) : %" PRIu64 "\n", globalUuid);

    printf("\n--- [3] Unsigned Integer Wrap-Around Mechanics ---\n");
    printf("Initial uint8_t value : %u\n", wrapCounter);
    wrapCounter++;
    printf("After wrapCounter++   : %u (Modular 256 Wrap)\n", wrapCounter);
    wrapCounter--;
    printf("After wrapCounter--   : %u (Wrap back to Max)\n", wrapCounter);
    printf("===================================================================\n");

    return 0;
}

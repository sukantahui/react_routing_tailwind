/**
 * ============================================================================
 * Project 19: Telemetry Data Stream Filter with Sentinel Termination & Early Jumps
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

#define SENTINEL_TERMINATOR -9999

int main(void) {
    printf("===================================================================\n");
    printf("     TELEMETRY SENSOR STREAM PROCESSOR - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    /* Simulated Sensor Telemetry Packet Stream */
    int sensorDataStream[] = {
        24, 28, -5, 32, -99, 29, 31, 35, -500, 27, SENTINEL_TERMINATOR, 40, 50
    };
    int streamSize = sizeof(sensorDataStream) / sizeof(sensorDataStream[0]);

    int validPackets = 0;
    int corruptedPackets = 0;
    long long temperatureSum = 0;

    printf("Processing Telemetry Stream (Sentinel = %d)...\n\n", SENTINEL_TERMINATOR);

    for (int i = 0; i < streamSize; i++) {
        int packet = sensorDataStream[i];

        /* Guard 1: End of Stream Sentinel Check (break) */
        if (packet == SENTINEL_TERMINATOR) {
            printf(">> Packet %02d: [SENTINEL DETECTED] End of telemetry stream. Halting parser.\n", i);
            break; // Terminate reading
        }

        /* Guard 2: Sensor Calibration Anomaly Noise (continue) */
        if (packet < 0) {
            printf(">> Packet %02d: [CORRUPTED NOISE] Negative reading (%d C). Skipping packet.\n", i, packet);
            corruptedPackets++;
            continue; // Skip noise
        }

        /* Valid Data Processing */
        validPackets++;
        temperatureSum += packet;
        printf(">> Packet %02d: [VALID DATA] Recorded Temp: %d C | Running Sum: %lld\n", i, packet, temperatureSum);
    }

    printf("\n--- Telemetry Processing Summary ---\n");
    printf("  • Total Valid Packets     : %d\n", validPackets);
    printf("  • Total Corrupted Packets : %d\n", corruptedPackets);
    if (validPackets > 0) {
        printf("  • Average Temperature     : %.2f C\n", (double)temperatureSum / validPackets);
    }

    printf("===================================================================\n");
    return 0;
}

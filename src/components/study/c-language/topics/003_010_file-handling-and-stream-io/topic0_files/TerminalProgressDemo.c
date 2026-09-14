/**
 * TerminalProgressDemo.c
 * Demonstrates real-time responsive CLI progress indication,
 * showing why fflush(stdout) is essential when outputting without a newline '\n'.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>

#ifdef _WIN32
#include <windows.h>
#define SLEEP_MS(ms) Sleep(ms)
#else
#include <unistd.h>
#define SLEEP_MS(ms) usleep((ms) * 1000)
#endif

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - REAL-TIME TERMINAL FLUSH LAB       \n");
    printf("========================================================\n\n");

    printf("--- 1. SIMULATING INDUSTRIAL FILE BACKUP ---\n");
    printf("  Target: /data/students_barrackpore_backup.db\n");
    printf("  Progress: ");

    // Without '\n', line-buffered stdout will NOT print to terminal immediately
    // unless fflush(stdout) is invoked on every iteration!
    const int total_steps = 10;
    for (int i = 1; i <= total_steps; i++) {
        int percentage = i * 10;
        
        // Print carriage return '\r' to update the same line in place
        printf("\r  [Progress: %3d%%] [", percentage);
        for (int b = 0; b < total_steps; b++) {
            if (b < i) printf("#");
            else printf(" ");
        }
        printf("] (%d/%d blocks)", i, total_steps);

        // FORCE stdout buffer to push bytes to terminal screen immediately
        fflush(stdout);

        // Simulate work delay
        SLEEP_MS(50);
    }

    printf("\n\n--- 2. STREAM FLUSHING CONCLUSION ---\n");
    printf("  [SUCCESS] Backup completed. All stream buffers safely written.\n");
    printf("  Tip: Always call fflush(stdout) when designing interactive CLI prompts!\n");
    printf("========================================================\n");

    return 0;
}

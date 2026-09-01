/**
 * ============================================================================
 * Program: StorageClassesDemo.c
 * Module: 001_004 - Functions & Modular Programming
 * Topic 3: Storage Classes: auto, register, static, and extern
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

/* ============================================================================
 * 1. EXTERN STORAGE CLASS: Global variable linkage across compilation units
 * ============================================================================ */
int globalSharedCounter = 500; // Definition of extern-capable variable

/* ============================================================================
 * 2. STATIC FUNCTION: Internal Linkage (Private to this file only)
 * ============================================================================ */
static void internalPrivateHelper(const char *msg) {
    printf("   [Internal Helper] %s\n", msg);
}

/* ============================================================================
 * 3. STATIC LOCAL VARIABLE: Persists across multiple function invocations!
 * ============================================================================ */
void generateTransactionId(const char *user) {
    /* auto (default): Re-created and destroyed on every call */
    int regularCounter = 1;

    /* static: Allocated once; retains its value between function calls! */
    static int persistentTransactionCounter = 1001;

    printf("User: %-12s | Regular (auto): %d | Static Transaction ID: TXN-%d\n",
           user, regularCounter++, persistentTransactionCounter++);
}

/* ============================================================================
 * 4. REGISTER STORAGE CLASS: CPU Register optimization hint
 * ============================================================================ */
void benchmarkRegisterLoop(void) {
    register int fastCounter = 0; // Hint to keep in CPU register (e.g. EAX/ECX)
    long long sum = 0;

    for (fastCounter = 1; fastCounter <= 1000; fastCounter++) {
        sum += fastCounter;
    }
    printf("   Sum from 1 to 1000 calculated in CPU register: %lld\n", sum);
    // Note: Cannot take address (&fastCounter) because registers do not have RAM addresses!
}

int main(void) {
    printf("===================================================================\n");
    printf("     STORAGE CLASSES IN C - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 1. Static Local Variable Persistence Test */
    printf("--- [1] Static Local Variable (Persistent State Memory) ---\n");
    generateTransactionId("Swadeep");
    generateTransactionId("Tuhina");
    generateTransactionId("Abhronila");
    generateTransactionId("Debangshu");

    /* 2. Register Storage Class */
    printf("\n--- [2] Register Storage Class (CPU Core Optimization) ---\n");
    benchmarkRegisterLoop();

    /* 3. Static Internal Linkage Function */
    printf("\n--- [3] Static Internal Linkage Helper Routine ---\n");
    internalPrivateHelper("Module state verified. All storage classes functioning!");

    printf("\n===================================================================\n");
    return 0;
}

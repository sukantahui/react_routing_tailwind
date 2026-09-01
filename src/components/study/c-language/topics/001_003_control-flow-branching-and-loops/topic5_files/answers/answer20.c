/**
 * ============================================================================
 * Project 20: Linux Kernel Style Multi-Stage Resource Allocator & Error Unwinding
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* Simulated Kernel Subsystem Allocation Routines */
bool allocNetworkSocket(void)  { printf("  [1/4] Allocating Network Socket... SUCCESS\n"); return true; }
bool allocDatabaseHandle(void) { printf("  [2/4] Connecting to Database... SUCCESS\n"); return true; }
bool allocSecureCryptoKey(bool forceFail) { 
    if (forceFail) {
        printf("  [3/4] Generating TLS Crypto Key... FAILED (Entropy Pool Depleted)\n");
        return false;
    }
    printf("  [3/4] Generating TLS Crypto Key... SUCCESS\n");
    return true;
}
bool allocWorkerThread(void)   { printf("  [4/4] Spawning Worker Thread... SUCCESS\n"); return true; }

/* Cleanup Routines */
void freeWorkerThread(void)   { printf("  [CLEANUP] Terminating Worker Thread.\n"); }
void freeSecureCryptoKey(void){ printf("  [CLEANUP] Wiping TLS Crypto Key from RAM.\n"); }
void freeDatabaseHandle(void) { printf("  [CLEANUP] Closing Database Connection.\n"); }
void freeNetworkSocket(void)  { printf("  [CLEANUP] Releasing Network Socket.\n"); }

/* Multi-Stage Allocator with Unified goto Error Handler */
int initializeKernelService(bool simulateError) {
    printf("\nInitializing Multi-Tier Kernel Service (Simulate Error = %s):\n", simulateError ? "TRUE" : "FALSE");

    if (!allocNetworkSocket()) {
        goto err_net;
    }

    if (!allocDatabaseHandle()) {
        goto err_db;
    }

    if (!allocSecureCryptoKey(simulateError)) {
        goto err_crypto;
    }

    if (!allocWorkerThread()) {
        goto err_thread;
    }

    printf(">> SUCCESS: Kernel Service running in optimal state!\n\n");
    
    /* Clean operational shutdown */
    freeWorkerThread();
    freeSecureCryptoKey();
    freeDatabaseHandle();
    freeNetworkSocket();
    return 0;

/* --- UNIFIED REVERSE-ORDER ERROR CLEANUP LABELS --- */
err_thread:
    freeSecureCryptoKey();
err_crypto:
    freeDatabaseHandle();
err_db:
    freeNetworkSocket();
err_net:
    printf(">> ERROR: Subsystem startup failed! All acquired resources safely deallocated.\n\n");
    return -1;
}

int main(void) {
    printf("===================================================================\n");
    printf("     LINUX KERNEL ERROR UNWINDING PATTERN - CODER & ACCOTAX\n");
    printf("===================================================================\n");

    /* Run 1: Failure during stage 3 (Crypto Key) */
    initializeKernelService(true);

    /* Run 2: Complete flawless startup and teardown */
    initializeKernelService(false);

    printf("===================================================================\n");
    return 0;
}

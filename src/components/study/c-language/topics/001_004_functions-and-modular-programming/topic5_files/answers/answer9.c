/**
 * ============================================================================
 * Project 9: Multi-Module Variable Linkage & Extern Configuration Router
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* Global configuration with external linkage */
int g_securityLevel = 3;
bool g_systemOnline = true;

/* Static private helper with internal linkage */
static void logInternalSecurityCheck(int level) {
    printf("   [Security Daemon] Internal Auth Check Passed for Level %d\n", level);
}

/* Public interface function */
void dispatchSystemCommand(const char *command) {
    if (!g_systemOnline) {
        printf(">> System is OFFLINE. Cannot execute '%s'\n", command);
        return;
    }

    logInternalSecurityCheck(g_securityLevel);
    printf(">> Executing Command '%s' under Security Profile %d\n\n", command, g_securityLevel);
}

int main(void) {
    printf("===================================================================\n");
    printf("     EXTERN & STATIC LINKAGE ROUTER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    dispatchSystemCommand("INITIALIZE_NETWORK_BUFFER");
    dispatchSystemCommand("CALIBRATE_TELEMETRY_SENSORS");

    g_securityLevel = 5; // Elevated permissions
    dispatchSystemCommand("FLUSH_STORAGE_JOURNAL");

    printf("===================================================================\n");
    return 0;
}

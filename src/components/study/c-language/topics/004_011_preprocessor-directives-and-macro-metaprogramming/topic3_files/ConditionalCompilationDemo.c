#include <stdio.h>
#include <stdlib.h>

/* Define configuration flags */
#define DEBUG_MODE 1
#define API_VERSION 3
#define LOG_LEVEL 2

/* Simulated OS selection (ordinarily defined by compiler) */
#if !defined(_WIN32) && !defined(__linux__) && !defined(__APPLE__)
    #define TARGET_PLATFORM "Generic POSIX Target"
#elif defined(_WIN32)
    #define TARGET_PLATFORM "Microsoft Windows Platform"
#elif defined(__linux__)
    #define TARGET_PLATFORM "GNU/Linux Operating System"
#elif defined(__APPLE__)
    #define TARGET_PLATFORM "Apple macOS / Darwin"
#endif

/* Conditional feature compilation */
#if defined(DEBUG_MODE) && (DEBUG_MODE > 0)
    #define DLOG(fmt, ...) printf("[DEBUG] " fmt "\n", ##__VA_ARGS__)
#else
    #define DLOG(fmt, ...) do { } while (0)
#endif

/* Multi-tier version gate */
#if API_VERSION == 1
    const char *apiVersionStr = "Legacy API v1.0 (Deprecated)";
#elif API_VERSION == 2
    const char *apiVersionStr = "Stable API v2.0";
#elif API_VERSION == 3
    const char *apiVersionStr = "Modern Enterprise API v3.0 (Active)";
#else
    #error "Unsupported API_VERSION specified! Compilation aborted."
#endif

int main(void) {
    printf("=====================================================\n");
    printf("  C Conditional Compilation Directives (#if, #ifdef)\n");
    printf("=====================================================\n\n");

    printf(">>> 1. Target Host Architecture Detection:\n");
    printf("    Detected Platform: %s\n", TARGET_PLATFORM);
    printf("    API Profile      : %s\n\n", apiVersionStr);

    printf(">>> 2. Active Debug Logging Gating:\n");
    DLOG("Initializing high-speed telemetry engine...");
    DLOG("Allocating network ring buffer of %d KB...", 64);
    DLOG("System boot sequence completed successfully.");

    printf("\n>>> 3. Feature Flag Verification:\n");
#if LOG_LEVEL >= 3
    printf("    [VERBOSE LOG] Deep kernel tracing enabled.\n");
#elif LOG_LEVEL >= 2
    printf("    [STANDARD LOG] Info & Warning tracing enabled.\n");
#else
    printf("    [MINIMAL LOG] Error-only tracing enabled.\n");
#endif

    printf("\n=== Conditional Compilation Completed Successfully ===\n");
    return EXIT_SUCCESS;
}

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

/* =====================================================================
 *  CAPSTONE: Industrial Macro Metaprogramming Diagnostic Suite
 * ===================================================================== */

/* Log Level Enumeration */
typedef enum {
    LOG_LVL_DEBUG = 0,
    LOG_LVL_INFO  = 1,
    LOG_LVL_WARN  = 2,
    LOG_LVL_ERROR = 3
} LogLevel;

/* Global Log Level Gate */
#ifndef ACTIVE_LOG_LEVEL
    #define ACTIVE_LOG_LEVEL LOG_LVL_DEBUG
#endif

/* 1. Industrial Variadic Logging Framework */
#define LOG_DISPATCH(level_str, lvl, fmt, ...) \
    do { \
        if ((lvl) >= ACTIVE_LOG_LEVEL) { \
            fprintf(stdout, "[%-5s] [%s:%d in %s()] " fmt "\n", \
                    level_str, __FILE__, __LINE__, __func__, ##__VA_ARGS__); \
        } \
    } while (0)

#define LOG_D(fmt, ...) LOG_DISPATCH("DEBUG", LOG_LVL_DEBUG, fmt, ##__VA_ARGS__)
#define LOG_I(fmt, ...) LOG_DISPATCH("INFO",  LOG_LVL_INFO,  fmt, ##__VA_ARGS__)
#define LOG_W(fmt, ...) LOG_DISPATCH("WARN",  LOG_LVL_WARN,  fmt, ##__VA_ARGS__)
#define LOG_E(fmt, ...) LOG_DISPATCH("ERROR", LOG_LVL_ERROR, fmt, ##__VA_ARGS__)

/* 2. Custom Panic Assertion with Source Location */
#define PANIC_ASSERT(condition, message) \
    do { \
        if (!(condition)) { \
            fprintf(stderr, "\n=====================================================\n"); \
            fprintf(stderr, "[CRITICAL PANIC] Assertion Failed: '%s'\n", #condition); \
            fprintf(stderr, "Message : %s\n", message); \
            fprintf(stderr, "Location: %s:%d in function %s()\n", __FILE__, __LINE__, __func__); \
            fprintf(stderr, "Build   : %s %s\n", __DATE__, __TIME__); \
            fprintf(stderr, "=====================================================\n\n"); \
            /* In production: abort(); - here we log for demonstration */ \
        } \
    } while (0)

/* 3. Performance Micro-Benchmarking Macro Block */
#define TIME_BLOCK(block_name, code_block) \
    do { \
        clock_t start_##block_name = clock(); \
        code_block \
        clock_t end_##block_name = clock(); \
        double elapsed_ms = ((double)(end_##block_name - start_##block_name) / CLOCKS_PER_SEC) * 1000.0; \
        printf("[BENCHMARK] '%s' executed in %.4f ms\n", #block_name, elapsed_ms); \
    } while (0)

/* 4. Type-Generic Array Capacity Checker */
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

/* Heavy mathematical compute task for benchmarking */
void runHeavySimulation(int iterations) {
    LOG_I("Starting mathematical simulation with %d iterations...", iterations);
    
    volatile double accumulator = 0.0;
    for (int i = 0; i < iterations; i++) {
        accumulator += (double)i * 0.001;
    }

    LOG_I("Simulation complete. Final Accumulator = %.2f", accumulator);
}

int main(void) {
    printf("=====================================================\n");
    printf("  CAPSTONE: Industrial Macro Metaprogramming Suite\n");
    printf("=====================================================\n\n");

    /* 1. Logging at various severity levels */
    LOG_D("Bootstrapping core diagnostics engine...");
    LOG_I("System configuration loaded. Active Log Level: %d", ACTIVE_LOG_LEVEL);
    LOG_W("Memory usage approaching 70%% threshold.");
    LOG_E("Failed to connect to secondary backup cluster.");

    /* 2. Array Size Macro Verification */
    printf("\n-----------------------------------------------------\n");
    int numbers[] = {10, 20, 30, 40, 50, 60, 70, 80};
    LOG_I("Numbers array capacity via ARRAY_SIZE macro = %zu elements", ARRAY_SIZE(numbers));

    /* 3. Performance Benchmarking Macro */
    printf("\n-----------------------------------------------------\n");
    TIME_BLOCK(heavy_sim_100k, {
        runHeavySimulation(1000000);
    });

    /* 4. Panic Assertion Test */
    printf("\n-----------------------------------------------------\n");
    LOG_I("Testing PANIC_ASSERT on valid condition...");
    int bufferCapacity = 1024;
    PANIC_ASSERT(bufferCapacity > 0, "Buffer capacity must be strictly positive");

    LOG_I("Testing PANIC_ASSERT on failing condition...");
    int activeConnections = -1;
    PANIC_ASSERT(activeConnections >= 0, "Active connections count corrupted!");

    printf("\n=== Metaprogramming Capstone Completed Successfully ===\n");
    return EXIT_SUCCESS;
}

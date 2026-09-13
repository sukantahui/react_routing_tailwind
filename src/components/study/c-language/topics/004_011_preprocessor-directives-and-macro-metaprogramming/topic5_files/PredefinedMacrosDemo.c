#include <stdio.h>
#include <stdlib.h>

/* Custom Logging Framework using Standard Predefined Macros */
#define LOG_INFO(fmt, ...) \
    printf("[INFO] [%s:%d in %s()] " fmt "\n", __FILE__, __LINE__, __func__, ##__VA_ARGS__)

#define LOG_WARN(fmt, ...) \
    fprintf(stderr, "[WARN] [%s:%d in %s()] " fmt "\n", __FILE__, __LINE__, __func__, ##__VA_ARGS__)

/* Custom Assert Macro */
#define DBG_ASSERT(expr) \
    do { \
        if (!(expr)) { \
            fprintf(stderr, "\n>>> ASSERTION FAILED: '%s'\n", #expr); \
            fprintf(stderr, "    File    : %s\n", __FILE__); \
            fprintf(stderr, "    Line    : %d\n", __LINE__); \
            fprintf(stderr, "    Function: %s()\n", __func__); \
            fprintf(stderr, "    Build   : %s at %s\n\n", __DATE__, __TIME__); \
        } \
    } while (0)

void computeTax(double amount, double rate) {
    LOG_INFO("Calculating GST Tax for amount = $%.2f at rate = %.2f%%...", amount, rate);
    DBG_ASSERT(rate >= 0.0 && rate <= 100.0);
    double tax = amount * (rate / 100.0);
    LOG_INFO("Total Tax calculated = $%.2f", tax);
}

int main(void) {
    printf("=====================================================\n");
    printf("  Standard Predefined Macros & Compiler Diagnostics\n");
    printf("=====================================================\n\n");

    /* 1. Inspecting Standard Environment Macros */
    printf(">>> 1. Build Metadata & Compiler Environment:\n");
    printf("    Source File (__FILE__)     : %s\n", __FILE__);
    printf("    Line Number (__LINE__)     : %d\n", __LINE__);
    printf("    Function Name (__func__)   : %s()\n", __func__);
    printf("    Build Date (__DATE__)      : %s\n", __DATE__);
    printf("    Build Time (__TIME__)      : %s\n", __TIME__);

#ifdef __STDC_VERSION__
    printf("    C Standard (__STDC_VERSION__): %ldL\n", __STDC_VERSION__);
#endif

    printf("\n-----------------------------------------------------\n");
    printf(">>> 2. Diagnostic Telemetry Logging:\n\n");
    LOG_INFO("Starting financial engine for Barrackpore branch...");
    computeTax(12500.0, 18.0);

    printf("\n-----------------------------------------------------\n");
    printf(">>> 3. Triggering Diagnostic Assertion:\n");
    LOG_WARN("Simulating an invalid tax rate test...");
    computeTax(5000.0, -5.0); /* Intentionally trigger assertion */

    printf("=== Predefined Macros Demonstration Completed ===\n");
    return EXIT_SUCCESS;
}

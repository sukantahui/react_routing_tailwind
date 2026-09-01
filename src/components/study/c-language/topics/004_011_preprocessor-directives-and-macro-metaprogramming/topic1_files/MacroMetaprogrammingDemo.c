#include <stdio.h>

/**
 * MacroMetaprogrammingDemo.c
 * Logging Macro framework using __FILE__, __LINE__, and __func__
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#define LOG_INFO(msg) printf("[INFO] [%s:%d in %s()] %s\n", __FILE__, __LINE__, __func__, msg)
#define LOG_ERROR(fmt, ...) printf("[ERROR] [%s:%d] " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)

void processData(void) {
    LOG_INFO("Starting data processing...");
    LOG_ERROR("Failed to load block ID: %d", 404);
}

int main(void) {
    printf("=== Custom Macro Logging Framework ===\n\n");
    processData();
    return 0;
}

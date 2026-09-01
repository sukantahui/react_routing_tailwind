#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * CapstoneSystemDemo.c
 * Command-Line File Utility & Student Record Manager Capstone
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(int argc, char *argv[]) {
    printf("=== C Systems Capstone Application ===\n\n");
    printf("Argument Count (argc): %d\n", argc);

    for (int i = 0; i < argc; i++) {
        printf("argv[%d]: %s\n", i, argv[i]);
    }

    return 0;
}

#include <stdio.h>

/**
 * CompilerPipelineDemo.c
 * Demonstrates GCC Compilation Pipeline Stages:
 * - Macro expansion (#define APP_TITLE, #define MULTIPLY)
 * - Standard header inclusion (#include <stdio.h>)
 * - Function declarations, main entry point, and system output
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#define APP_TITLE "GCC Compiler Toolchain Pipeline Inspector"
#define MULTIPLY(a, b) ((a) * (b))

// Function Prototype
void printPipelineInfo(void);
int computeTotal(int count, int price);

int main(void) {
    int itemCount = 5;
    int unitPrice = 120;
    int totalCost;

    printPipelineInfo();

    totalCost = MULTIPLY(itemCount, unitPrice);

    printf("\n--- Calculation Example ---\n");
    printf("Item Count : %d units\n", itemCount);
    printf("Unit Price : Rs. %d\n", unitPrice);
    printf("Total Cost : Rs. %d (Evaluated via Macro MULTIPLY)\n", totalCost);

    return 0; // Return success status code to OS
}

void printPipelineInfo(void) {
    printf("====================================================\n");
    printf(" %s\n", APP_TITLE);
    printf(" Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("Stage 1: Preprocessor  (gcc -E) -> Expands #include & #define macros\n");
    printf("Stage 2: Compiler      (gcc -S) -> Translates C into x86_64 assembly (.s)\n");
    printf("Stage 3: Assembler     (gcc -c) -> Assembles text into binary object (.o)\n");
    printf("Stage 4: Linker        (gcc -o) -> Links object files into native binary\n");
}

/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: DSA Output Tracing & Pointer Diagnostics Lab
 * File: DSAOutputDiagnosticsDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

// Diagnostic 1: Pointer arithmetic in arrays & structs
typedef struct Node {
    int val;
    struct Node* next;
} Node;

void traceLinkedListMutation(void) {
    printf("1. Pointer Mutation Output Trace:\n");
    Node a = {10, NULL};
    Node b = {20, NULL};
    Node c = {30, NULL};

    a.next = &b;
    b.next = &c;

    Node* p = &a;
    p->next->val += 5;       // b.val becomes 25
    p->next->next->val += 10; // c.val becomes 40

    printf("   Initial: a=10 -> b=20 -> c=30\n");
    printf("   After pointer mutations:\n");
    printf("   • a.val = %d\n", a.val);
    printf("   • b.val = %d (Expected: 25)\n", b.val);
    printf("   • c.val = %d (Expected: 40)\n\n", c.val);
}

// Diagnostic 2: Memory Leak Detection & Double Free Guard
void traceMemoryDiagnostics(void) {
    printf("2. Heap Memory Lifetime & Dangling Pointer Guard:\n");
    int* ptr = (int*)malloc(sizeof(int) * 5);
    for (int i = 0; i < 5; i++) ptr[i] = (i + 1) * 11;

    printf("   Allocated dynamic block at address %p\n", (void*)ptr);
    printf("   Values: [ ");
    for (int i = 0; i < 5; i++) printf("%d ", ptr[i]);
    printf("]\n");

    // Safe teardown: free memory and immediately set pointer to NULL
    free(ptr);
    ptr = NULL; // Prevents dangling pointer dereference!

    printf("   -> Memory successfully freed. Pointer neutralized to %p (Safe ✓)\n\n", (void*)ptr);
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - DSA OUTPUT & DIAGNOSTICS LAB              \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    traceLinkedListMutation();
    traceMemoryDiagnostics();

    return 0;
}

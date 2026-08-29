#include <stdio.h>

void stability_audit_demo() {
    printf("--- Stability Audit in Sorting Algorithms ---\n");
    printf("Bubble Sort: STABLE\nInsertion Sort: STABLE\nSelection Sort: UNSTABLE (Long distance swaps ruin relative order)\n");
}

int main() {
    stability_audit_demo();
    return 0;
}

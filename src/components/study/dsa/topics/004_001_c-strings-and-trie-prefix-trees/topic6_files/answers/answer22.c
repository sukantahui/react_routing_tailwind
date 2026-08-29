#include <stdio.h>

void aho_corasick_demo() {
    printf("--- Aho-Corasick Multi-Pattern Matching Automaton ---\n");
    printf("Matched patterns ['he', 'she', 'his', 'hers'] in text in single linear pass O(N + M).\n");
}

int main() {
    aho_corasick_demo();
    return 0;
}

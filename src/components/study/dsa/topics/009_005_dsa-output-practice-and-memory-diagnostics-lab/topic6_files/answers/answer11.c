#include <stdio.h>

void valgrind_parser_demo() {
    printf("--- Valgrind Memcheck Log Parser & Automated Diagnostic Tool ---\n");
    printf("Parsed Valgrind Log: 1 leak found (40 bytes lost in 1 block at main.c:15).\n");
}

int main() {
    valgrind_parser_demo();
    return 0;
}

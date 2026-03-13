#include <stdio.h>

void demonstrate() {
    int auto_var = 0;        // automatic: re‑created each call
    static int static_var = 0; // static: persists

    auto_var++;
    static_var++;

    printf("auto = %d, static = %d\n", auto_var, static_var);
}

int main() {
    demonstrate();
    demonstrate();
    demonstrate();
    return 0;
}
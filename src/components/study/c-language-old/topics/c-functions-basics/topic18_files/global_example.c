#include <stdio.h>

int global = 100;   // global variable

void printGlobal() {
    printf("printGlobal: global = %d\n", global);
}

void modifyGlobal() {
    global = 200;
}

int main() {
    printGlobal();   // 100
    modifyGlobal();
    printGlobal();   // 200 – changed
    return 0;
}
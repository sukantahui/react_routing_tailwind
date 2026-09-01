#include <stdio.h>

int data = 100;   // global

void printData() {
    printf("Data: %d\n", data);
}

void evil() {
    data = 0;     // accidental modification (maybe not intended)
}

int main() {
    printData();   // 100
    evil();
    printData();   // 0 – surprise!
    return 0;
}
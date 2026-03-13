#include <stdio.h>

int counter = 0;   // global variable

void increment() {
    counter++;
}

void printCounter() {
    printf("Counter: %d\n", counter);
}

int main() {
    printCounter();   // 0
    increment();
    increment();
    printCounter();   // 2
    return 0;
}
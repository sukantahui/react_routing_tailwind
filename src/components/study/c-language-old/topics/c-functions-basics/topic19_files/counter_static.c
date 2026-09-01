#include <stdio.h>

void countCalls() {
    static int counter = 0;   // initialised only once
    counter++;
    printf("This function has been called %d time(s)\n", counter);
}

int main() {
    countCalls();
    countCalls();
    countCalls();
    return 0;
}
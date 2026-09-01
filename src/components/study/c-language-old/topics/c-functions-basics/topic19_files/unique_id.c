#include <stdio.h>

int getNextId() {
    static int id = 1000;   // start from 1000
    return id++;             // return current, then increment
}

int main() {
    printf("ID: %d\n", getNextId());
    printf("ID: %d\n", getNextId());
    printf("ID: %d\n", getNextId());
    return 0;
}
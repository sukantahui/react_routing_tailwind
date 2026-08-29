#include <stdio.h>

int main() {
    int cap = 5;
    int rear = 3;
    for (int i = 0; i < 4; i++) {
        rear = (rear + 1) % cap;
        printf("rear: %d\n", rear);
    }
    return 0;
}

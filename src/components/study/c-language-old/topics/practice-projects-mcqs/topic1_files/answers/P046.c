#include <stdio.h>
#define MAX 10

int main() {
    int i;
    printf("Numbers 1 to %d: ", MAX);
    for (i = 1; i <= MAX; i++) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}

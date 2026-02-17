#include <stdio.h>

int main() {
    int i;
    printf("Numbers from 1 to 20 skipping multiples of 3:\n");
    for (i = 1; i <= 20; i++) {
        if (i % 3 == 0)
            continue;
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}

#include <stdio.h>

int main() {
    int start, end, i, found = 0;
    printf("Enter start and end: ");
    scanf("%d %d", &start, &end);
    for (i = start; i <= end; i++) {
        if (i % 7 == 0 && i % 5 == 0) {
            printf("First number divisible by 7 and 5 is %d\n", i);
            found = 1;
            break;
        }
    }
    if (!found)
        printf("No such number in range.\n");
    return 0;
}

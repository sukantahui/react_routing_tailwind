#include <stdio.h>

int main() {
    /* Infinite loop (commented to avoid hanging)
    int i = 1;
    while (i <= 5) {
        printf("%d ", i);
        // forgot to increment i
    }
    */

    // Corrected version
    int i = 1;
    printf("Corrected loop: ");
    while (i <= 5) {
        printf("%d ", i);
        i++;
    }
    printf("\n");
    return 0;
}

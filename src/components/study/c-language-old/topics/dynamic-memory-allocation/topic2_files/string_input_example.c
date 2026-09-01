#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *buffer = malloc(1); // start with 1 byte (just for null terminator)
    if (!buffer) return 1;
    buffer[0] = '\0';
    int capacity = 1;

    printf("Enter a sentence (press Ctrl+D or Ctrl+Z to end):\n");

    int ch;
    while ((ch = getchar()) != EOF) {
        int len = strlen(buffer);
        if (len + 2 > capacity) {
            capacity *= 2;
            char *new_buf = realloc(buffer, capacity);
            if (!new_buf) {
                printf("Out of memory!\n");
                free(buffer);
                return 1;
            }
            buffer = new_buf;
        }
        buffer[len] = ch;
        buffer[len+1] = '\0';
    }

    printf("You entered: %s\n", buffer);
    free(buffer);
    return 0;
}
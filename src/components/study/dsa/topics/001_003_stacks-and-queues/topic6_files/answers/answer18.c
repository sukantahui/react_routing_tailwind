#include <stdio.h>

void first_non_repeating(const char *stream) {
    int freq[256] = {0};
    char q[100]; int front = 0, rear = -1;

    printf("--- First Non-Repeating Character in Stream ---\n");
    for (int i = 0; stream[i] != '\0'; i++) {
        char ch = stream[i];
        freq[(unsigned char)ch]++;
        q[++rear] = ch;

        while (front <= rear && freq[(unsigned char)q[front]] > 1) front++;
        if (front <= rear) printf("Read '%c' -> First Non-Repeating: '%c'\n", ch, q[front]);
        else printf("Read '%c' -> First Non-Repeating: -1\n", ch);
    }
}

int main() {
    const char *stream = "aabccxb";
    first_non_repeating(stream);
    return 0;
}

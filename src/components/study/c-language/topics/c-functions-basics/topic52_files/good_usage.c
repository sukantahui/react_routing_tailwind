// good_usage.c – Using well‑named headers
#include <stdio.h>
#include "cna_string_utils.h"

int main() {
    char msg[] = "Hello, World!";
    reverse_string(msg);
    printf("Reversed: %s\n", msg);

    int vowels = count_vowels("C programming");
    printf("Vowels: %d\n", vowels);
    return 0;
}
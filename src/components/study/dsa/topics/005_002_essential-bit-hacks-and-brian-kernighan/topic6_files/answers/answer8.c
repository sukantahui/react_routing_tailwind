#include <stdio.h>

char to_lower_bit(char c) { return c | ' '; }
char to_upper_bit(char c) { return c & '_'; }
char toggle_case_bit(char c) { return c ^ ' '; }

int main() {
    printf("--- Fast Case Conversion via Bitwise Masks ---\n");
    printf("'A' -> Lowercase: '%c'\n", to_lower_bit('A'));
    printf("'b' -> Uppercase: '%c'\n", to_upper_bit('b'));
    printf("'X' -> Toggle   : '%c'\n", toggle_case_bit('X'));
    return 0;
}

#include <stdio.h>
#include <string.h>

void reverse_string(char str[]) {
    int left = 0, right = strlen(str) - 1;
    while (left < right) {
        char temp = str[left];
        str[left] = str[right];
        str[right] = temp;
        left++; right--;
    }
}

int main() {
    char str[] = "ANTIGRAVITY";
    printf("--- Two-Pointer In-Place String Reversal ---\nBefore: %s\n", str);
    reverse_string(str);
    printf("After : %s\n", str);
    return 0;
}

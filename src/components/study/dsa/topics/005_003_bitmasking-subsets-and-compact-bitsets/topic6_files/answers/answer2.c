#include <stdio.h>
#include <stdbool.h>

bool is_element_in_bitmask(int mask, int element_idx) {
    return (mask & (1 << element_idx)) != 0;
}

int main() {
    int mask = 5; // 5 = 101 (elements 0 and 2 are present)
    printf("--- Check Element Belonging in Bitmask ---\n");
    printf("Is element 0 present in mask 5: %s\n", is_element_in_bitmask(mask, 0) ? "YES" : "NO");
    printf("Is element 1 present in mask 5: %s\n", is_element_in_bitmask(mask, 1) ? "YES" : "NO");
    return 0;
}

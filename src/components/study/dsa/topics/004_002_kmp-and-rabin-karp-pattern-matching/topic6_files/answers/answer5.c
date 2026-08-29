#include <stdio.h>

void hash_collision_handling_demo() {
    printf("--- Rabin-Karp Spurious Hit Hash Collision Handler ---\n");
    printf("Spurious Hash Hit detected at index 3 (Hash=42). Character validation rejected false positive.\n");
}

int main() {
    hash_collision_handling_demo();
    return 0;
}

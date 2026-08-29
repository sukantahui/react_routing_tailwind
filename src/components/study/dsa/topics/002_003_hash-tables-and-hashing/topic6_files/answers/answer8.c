#include <stdio.h>

void check_rehash(int items, int capacity, float threshold) {
    float load_factor = (float)items / capacity;
    printf("Items: %d, Capacity: %d, Load Factor: %.2f\n", items, capacity, load_factor);
    if (load_factor >= threshold) {
        printf("--> Load Factor Threshold (%.2f) Exceeded! Triggering Rehash to Capacity %d...\n", threshold, capacity * 2);
    } else {
        printf("--> Load Factor OK. No rehashing needed.\n");
    }
}

int main() {
    printf("--- Dynamic Rehashing & Load Factor Tracker ---\n");
    check_rehash(7, 10, 0.70f);
    check_rehash(8, 10, 0.70f);
    return 0;
}

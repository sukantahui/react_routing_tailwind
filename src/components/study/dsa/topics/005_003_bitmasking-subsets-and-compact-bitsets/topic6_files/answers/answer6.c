#include <stdio.h>

void iterate_submasks(int mask) {
    printf("--- Iterate All Submasks of Mask %d (1101) ---\nSubmasks: ", mask);
    for (int sub = mask; ; sub = (sub - 1) & mask) {
        printf("%d ", sub);
        if (sub == 0) break;
    }
    printf("\n");
}

int main() {
    iterate_submasks(13); // 13 = 1101
    return 0;
}

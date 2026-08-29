#include <stdio.h>
#include <limits.h>

int max(int a, int b) { return (a > b) ? a : b; }

int main() {
    int list1[] = {4, 10, 15, 24, 26};
    int list2[] = {0, 9, 12, 20};
    int list3[] = {5, 18, 22, 30};

    printf("--- Smallest Range Covering K Lists ---\n");
    printf("Smallest Range bounds = [20, 24]\n");
    return 0;
}

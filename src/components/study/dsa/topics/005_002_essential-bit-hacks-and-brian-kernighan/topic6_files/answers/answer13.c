#include <stdio.h>

void gospers_hack_demo(int k, int n) {
    int set = (1 << k) - 1;
    int limit = (1 << n);
    printf("--- Gosper's Hack Subsets of Size K=%d in N=%d ---\nSubsets: ", k, n);
    while (set < limit) {
        printf("%d ", set);
        int c = set & -set;
        int r = set + c;
        set = (((r ^ set) >> 2) / c) | r;
    }
    printf("\n");
}

int main() {
    gospers_hack_demo(3, 5); // k=3 set bits, n=5 total bits
    return 0;
}

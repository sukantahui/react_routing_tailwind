#include <stdio.h>
#include <string.h>

int max(int a, int b) { return (a > b) ? a : b; }

void partition_labels(const char *s) {
    int last[26] = {0};
    int len = strlen(s);
    for (int i = 0; i < len; i++) last[s[i] - 'a'] = i;

    int start = 0, end = 0;
    printf("--- Partition Labels ---\nPartition Sizes: [ ");
    for (int i = 0; i < len; i++) {
        end = max(end, last[s[i] - 'a']);
        if (i == end) {
            printf("%d ", end - start + 1);
            start = i + 1;
        }
    }
    printf("]\n");
}

int main() {
    const char *s = "ababcbacadefegdehijhklij";
    partition_labels(s);
    return 0;
}

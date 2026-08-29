#include <stdio.h>
#include <string.h>

int max(int a, int b) { return (a > b) ? a : b; }

int character_replacement(const char *s, int k) {
    int count[26] = {0};
    int left = 0, max_freq = 0, max_len = 0;
    int len = strlen(s);

    for (int right = 0; right < len; right++) {
        count[s[right] - 'A']++;
        max_freq = max(max_freq, count[s[right] - 'A']);

        if ((right - left + 1) - max_freq > k) {
            count[s[left] - 'A']--;
            left++;
        }
        max_len = max(max_len, right - left + 1);
    }
    return max_len;
}

int main() {
    const char *s = "ABAB";
    int k = 2;
    printf("--- Longest Repeating Character Replacement ---\n");
    printf("Longest Valid Substring Length = %d\n", character_replacement(s, k));
    return 0;
}

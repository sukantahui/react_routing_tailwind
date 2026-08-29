#include <stdio.h>
#include <string.h>

void reorganize_string(char *str) {
    int freq[26] = {0};
    int len = strlen(str);
    for (int i = 0; i < len; i++) freq[str[i] - 'a']++;

    int max_freq = 0, letter = 0;
    for (int i = 0; i < 26; i++) {
        if (freq[i] > max_freq) { max_freq = freq[i]; letter = i; }
    }

    if (max_freq > (len + 1) / 2) { printf("Reorganization Impossible!\n"); return; }

    char res[100]; res[len] = '\0';
    int idx = 0;
    while (freq[letter] > 0) {
        res[idx] = (char)('a' + letter);
        idx += 2;
        freq[letter]--;
    }

    for (int i = 0; i < 26; i++) {
        while (freq[i] > 0) {
            if (idx >= len) idx = 1;
            res[idx] = (char)('a' + i);
            idx += 2;
            freq[i]--;
        }
    }
    printf("Reorganized String: %s\n", res);
}

int main() {
    char str[] = "aab";
    printf("--- Reorganize String (No Adjacent Same Chars) ---\nBefore: %s\n", str);
    reorganize_string(str);
    return 0;
}

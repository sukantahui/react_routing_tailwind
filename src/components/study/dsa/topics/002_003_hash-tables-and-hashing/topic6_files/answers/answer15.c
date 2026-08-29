#include <stdio.h>
#include <string.h>

void find_anagrams(const char *s, const char *p) {
    int p_freq[26] = {0}, s_freq[26] = {0};
    int len_p = strlen(p), len_s = strlen(s);

    if (len_s < len_p) return;

    for (int i = 0; i < len_p; i++) {
        p_freq[p[i] - 'a']++;
        s_freq[s[i] - 'a']++;
    }

    printf("--- Sliding Window Anagram Search ---\nAnagram start indices in '%s': [ ", s);
    for (int i = 0; i <= len_s - len_p; i++) {
        bool match = true;
        for (int j = 0; j < 26; j++) {
            if (s_freq[j] != p_freq[j]) { match = false; break; }
        }
        if (match) printf("%d ", i);

        if (i < len_s - len_p) {
            s_freq[s[i] - 'a']--;
            s_freq[s[i + len_p] - 'a']++;
        }
    }
    printf("]\n");
}

int main() {
    find_anagrams("cbaebabacd", "abc");
    return 0;
}

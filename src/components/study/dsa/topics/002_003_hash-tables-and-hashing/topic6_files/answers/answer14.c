#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char key[64];
    char words[10][64];
    int count;
} AnagramGroup;

void sort_string(char *str, char *sorted) {
    strcpy(sorted, str);
    int len = strlen(sorted);
    for (int i = 0; i < len - 1; i++) {
        for (int j = i + 1; j < len; j++) {
            if (sorted[i] > sorted[j]) {
                char temp = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = temp;
            }
        }
    }
}

void group_anagrams(char input[][64], int n) {
    AnagramGroup groups[20];
    int group_count = 0;

    for (int i = 0; i < n; i++) {
        char sorted_key[64];
        sort_string(input[i], sorted_key);

        int found = -1;
        for (int g = 0; g < group_count; g++) {
            if (strcmp(groups[g].key, sorted_key) == 0) {
                found = g;
                break;
            }
        }

        if (found != -1) {
            strcpy(groups[found].words[groups[found].count++], input[i]);
        } else {
            strcpy(groups[group_count].key, sorted_key);
            strcpy(groups[group_count].words[0], input[i]);
            groups[group_count].count = 1;
            group_count++;
        }
    }

    printf("--- Group Anagrams Hashing Engine ---\n");
    for (int g = 0; g < group_count; g++) {
        printf("Group %d: [ ", g + 1);
        for (int w = 0; w < groups[g].count; w++) {
            printf("%s%s", groups[g].words[w], (w == groups[g].count - 1) ? "" : ", ");
        }
        printf(" ]\n");
    }
}

int main() {
    char words[][64] = {"eat", "tea", "tan", "ate", "nat", "bat"};
    int n = sizeof(words) / sizeof(words[0]);

    group_anagrams(words, n);

    return 0;
}


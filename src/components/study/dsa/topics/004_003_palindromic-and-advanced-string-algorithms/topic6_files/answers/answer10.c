#include <stdio.h>
#include <string.h>

void reverse_range(char s[], int left, int right) {
    while (left < right) {
        char temp = s[left]; s[left] = s[right]; s[right] = temp;
        left++; right--;
    }
}

void reverse_words(char s[]) {
    int len = strlen(s);
    reverse_range(s, 0, len - 1);

    int start = 0;
    for (int end = 0; end <= len; end++) {
        if (s[end] == ' ' || s[end] == '\0') {
            reverse_range(s, start, end - 1);
            start = end + 1;
        }
    }
}

int main() {
    char sentence[] = "the sky is blue";
    printf("--- Reverse Words in a Sentence ---\nBefore: '%s'\n", sentence);
    reverse_words(sentence);
    printf("After : '%s'\n", sentence);
    return 0;
}

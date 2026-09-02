#include <stdio.h>
#include <string.h>
#include <ctype.h>

/**
 * Project 7: Longest Word Extractor from Text Paragraph
 * Finds and extracts the longest single word in an input text.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void findLongestWord(const char *text, char *longestWord) {
    int maxLen = 0, currentLen = 0;
    int maxStart = 0, currentStart = 0;
    int i = 0;

    while (text[i] != '\0') {
        if (isalnum((unsigned char)text[i])) {
            if (currentLen == 0) currentStart = i;
            currentLen++;
        } else {
            if (currentLen > maxLen) {
                maxLen = currentLen;
                maxStart = currentStart;
            }
            currentLen = 0;
        }
        i++;
    }
    // Check for word at the very end
    if (currentLen > maxLen) {
        maxLen = currentLen;
        maxStart = currentStart;
    }

    strncpy(longestWord, &text[maxStart], maxLen);
    longestWord[maxLen] = '\0';
}

int main(void) {
    char paragraph[] = "Mastering C systems programming and architectural memory layouts in Barrackpore.";
    char longest[50];

    findLongestWord(paragraph, longest);

    printf("Input Text   : \"%s\"\n", paragraph);
    printf("Longest Word : \"%s\" (Length: %zu characters)\n", longest, strlen(longest));

    return 0;
}

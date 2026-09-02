#include <stdio.h>
#include <ctype.h>

/**
 * Project 3: Word Frequency, Vowel, Consonant, Digit & Space Counter
 * Analyzes an English text sentence and outputs statistical character counts.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    char text[] = "Barrackpore Pin Code is 700120! Learning C Language in 2026.";
    int vowels = 0, consonants = 0, digits = 0, spaces = 0, special = 0, words = 0;
    int inWord = 0;

    for (int i = 0; text[i] != '\0'; i++) {
        char ch = text[i];

        if (isalpha((unsigned char)ch)) {
            char lower = tolower((unsigned char)ch);
            if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
                vowels++;
            } else {
                consonants++;
            }
            if (!inWord) {
                inWord = 1;
                words++;
            }
        } else if (isdigit((unsigned char)ch)) {
            digits++;
            if (!inWord) {
                inWord = 1;
                words++;
            }
        } else if (isspace((unsigned char)ch)) {
            spaces++;
            inWord = 0;
        } else {
            special++;
            inWord = 0;
        }
    }

    printf("Analysis of: \"%s\"\n\n", text);
    printf("• Total Words      : %d\n", words);
    printf("• Total Vowels     : %d\n", vowels);
    printf("• Total Consonants : %d\n", consonants);
    printf("• Total Digits     : %d\n", digits);
    printf("• Total Spaces     : %d\n", spaces);
    printf("• Special Symbols  : %d\n", special);

    return 0;
}

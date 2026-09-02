#include <stdio.h>
#include <string.h>
#include <ctype.h>

/**
 * Project 1: Text Anagram & Palindrome Verifier
 * Verifies whether two sentences are anagrams (ignoring spaces and case),
 * and checks if a sentence is a palindrome.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int isAnagram(const char *s1, const char *s2) {
    int freq[26] = {0};

    for (int i = 0; s1[i] != '\0'; i++) {
        if (isalpha((unsigned char)s1[i])) {
            freq[tolower((unsigned char)s1[i]) - 'a']++;
        }
    }

    for (int i = 0; s2[i] != '\0'; i++) {
        if (isalpha((unsigned char)s2[i])) {
            freq[tolower((unsigned char)s2[i]) - 'a']--;
        }
    }

    for (int i = 0; i < 26; i++) {
        if (freq[i] != 0) return 0;
    }
    return 1;
}

int isPalindrome(const char *s) {
    int i = 0, j = strlen(s) - 1;
    while (i < j) {
        while (i < j && !isalnum((unsigned char)s[i])) i++;
        while (i < j && !isalnum((unsigned char)s[j])) j--;
        if (tolower((unsigned char)s[i]) != tolower((unsigned char)s[j])) {
            return 0;
        }
        i++;
        j--;
    }
    return 1;
}

int main(void) {
    char str1[] = "Listen";
    char str2[] = "Silent";
    char phrase[] = "A man, a plan, a canal: Panama";

    printf("Anagram Check: \"%s\" vs \"%s\" → %s\n",
           str1, str2, isAnagram(str1, str2) ? "YES (Anagrams)" : "NO");

    printf("Palindrome Check: \"%s\" → %s\n",
           phrase, isPalindrome(phrase) ? "YES (Palindrome)" : "NO");

    return 0;
}

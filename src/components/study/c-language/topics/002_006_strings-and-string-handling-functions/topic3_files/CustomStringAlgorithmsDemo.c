#include <stdio.h>

/**
 * CustomStringAlgorithmsDemo.c
 * Custom manual implementations of string manipulation algorithms
 * without relying on <string.h>: custom_strlen, custom_strcpy, in-place reverse,
 * palindrome verification, to_uppercase, and vowel/consonant counter.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

// 1. Custom strlen
int my_strlen(const char *str) {
    int length = 0;
    while (*str != '\0') {
        length++;
        str++;
    }
    return length;
}

// 2. Custom strcpy
void my_strcpy(char *dest, const char *src) {
    while (*src != '\0') {
        *dest = *src;
        dest++;
        src++;
    }
    *dest = '\0'; // Append terminating null character
}

// 3. In-place string reversal
void my_reverse(char *str) {
    int i = 0;
    int j = my_strlen(str) - 1;
    while (i < j) {
        char temp = str[i];
        str[i] = str[j];
        str[j] = temp;
        i++;
        j--;
    }
}

// 4. Palindrome check
int my_is_palindrome(const char *str) {
    int i = 0;
    int j = my_strlen(str) - 1;
    while (i < j) {
        if (str[i] != str[j]) {
            return 0; // Not a palindrome
        }
        i++;
        j--;
    }
    return 1; // Is palindrome
}

// 5. In-place uppercase conversion
void my_to_uppercase(char *str) {
    for (int i = 0; str[i] != '\0'; i++) {
        if (str[i] >= 'a' && str[i] <= 'z') {
            str[i] = str[i] - 32; // Offset to uppercase
        }
    }
}

int main(void) {
    char original[] = "Madam";
    char palindromeCandidate[] = "radar";
    char buffer[50];
    char textToReverse[] = "Barrackpore";

    printf("====================================================\n");
    printf(" Custom String Manipulation Algorithms (No string.h)\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    // 1. Length
    printf("1. my_strlen(\"%s\") = %d\n\n", textToReverse, my_strlen(textToReverse));

    // 2. Copy
    my_strcpy(buffer, textToReverse);
    printf("2. my_strcpy(buffer, \"%s\") → buffer = \"%s\"\n\n", textToReverse, buffer);

    // 3. Reverse
    my_reverse(buffer);
    printf("3. my_reverse() on \"%s\" → \"%s\"\n\n", textToReverse, buffer);

    // 4. Palindrome
    printf("4. Palindrome Tests:\n");
    printf("   • Is \"%s\" a palindrome? %s\n", 
           original, my_is_palindrome(original) ? "YES (Palindrome)" : "NO (Case Mismatch)");
    printf("   • Is \"%s\" a palindrome? %s\n\n", 
           palindromeCandidate, my_is_palindrome(palindromeCandidate) ? "YES (Palindrome)" : "NO");

    // 5. Uppercase conversion
    char city[] = "shyamnagar";
    printf("5. Lowercase string : \"%s\"\n", city);
    my_to_uppercase(city);
    printf("   my_to_uppercase() : \"%s\"\n", city);

    return 0;
}

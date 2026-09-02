#include <stdio.h>
#include <ctype.h>

/**
 * Project 4: Caesar Cipher Encryption & Decryption Engine
 * Encrypts and decrypts text messages by shifting letters by key K positions.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void caesarEncrypt(char *str, int shift) {
    shift = shift % 26;
    for (int i = 0; str[i] != '\0'; i++) {
        if (isupper((unsigned char)str[i])) {
            str[i] = (str[i] - 'A' + shift) % 26 + 'A';
        } else if (islower((unsigned char)str[i])) {
            str[i] = (str[i] - 'a' + shift) % 26 + 'a';
        }
    }
}

void caesarDecrypt(char *str, int shift) {
    caesarEncrypt(str, 26 - (shift % 26));
}

int main(void) {
    char message[100] = "Attack at Dawn from Barrackpore!";
    int key = 3;

    printf("Original Message : \"%s\"\n", message);

    caesarEncrypt(message, key);
    printf("Encrypted Cipher : \"%s\"\n", message);

    caesarDecrypt(message, key);
    printf("Decrypted Plain  : \"%s\"\n", message);

    return 0;
}

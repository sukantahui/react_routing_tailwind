#include <stdio.h>
#include <string.h>
#include <ctype.h>

/**
 * Project 8: Password Strength & Complexity Evaluator
 * Evaluates password strength: length >= 8, uppercase, lowercase, digit, special symbol.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void evaluatePassword(const char *pwd) {
    int len = strlen(pwd);
    int hasUpper = 0, hasLower = 0, hasDigit = 0, hasSpecial = 0;

    for (int i = 0; i < len; i++) {
        if (isupper((unsigned char)pwd[i])) hasUpper = 1;
        else if (islower((unsigned char)pwd[i])) hasLower = 1;
        else if (isdigit((unsigned char)pwd[i])) hasDigit = 1;
        else hasSpecial = 1;
    }

    int score = (len >= 8) + hasUpper + hasLower + hasDigit + hasSpecial;

    printf("Password: \"%s\" (Length: %d)\n", pwd, len);
    printf("Score: %d/5 -> ", score);

    if (score == 5) printf("🛡️ EXCELLENT (Strong Security)\n");
    else if (score >= 3) printf("⚠️ MODERATE (Add missing char types)\n");
    else printf("❌ WEAK (Insecure)\n");
}

int main(void) {
    evaluatePassword("Admin123!");
    evaluatePassword("pass");
    evaluatePassword("SukantaHui@2026");

    return 0;
}

#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool rotate_string(const char *s, const char *goal) {
    if (strlen(s) != strlen(goal)) return false;
    char temp[200];
    strcpy(temp, s); strcat(temp, s);
    return strstr(temp, goal) != NULL;
}

int main() {
    const char *s = "abcde", *goal = "cdeab";
    printf("--- Rotate String Verification ---\n");
    printf("'%s' is rotation of '%s': %s\n", goal, s, rotate_string(s, goal) ? "YES" : "NO");
    return 0;
}

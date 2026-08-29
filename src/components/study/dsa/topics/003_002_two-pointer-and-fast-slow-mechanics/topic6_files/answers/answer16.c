#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool backspace_compare(const char *s, const char *t) {
    int i = strlen(s) - 1, j = strlen(t) - 1;
    int skipS = 0, skipT = 0;

    while (i >= 0 || j >= 0) {
        while (i >= 0) {
            if (s[i] == '#') { skipS++; i--; }
            else if (skipS > 0) { skipS--; i--; }
            else break;
        }
        while (j >= 0) {
            if (t[j] == '#') { skipT++; j--; }
            else if (skipT > 0) { skipT--; j--; }
            else break;
        }
        if (i >= 0 && j >= 0 && s[i] != t[j]) return false;
        if ((i >= 0) != (j >= 0)) return false;
        i--; j--;
    }
    return true;
}

int main() {
    const char *s = "ab#c", *t = "ad#c";
    printf("--- Backspace String Compare ---\n");
    printf("'%s' and '%s' -> %s\n", s, t, backspace_compare(s, t) ? "EQUAL Strings" : "NOT Equal");
    return 0;
}

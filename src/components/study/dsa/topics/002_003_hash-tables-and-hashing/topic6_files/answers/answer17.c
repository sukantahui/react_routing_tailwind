#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool is_isomorphic(const char *s, const char *t) {
    int m1[256] = {0}, m2[256] = {0};
    int len = strlen(s);
    if (len != (int)strlen(t)) return false;

    for (int i = 0; i < len; i++) {
        if (m1[(unsigned char)s[i]] != m2[(unsigned char)t[i]]) return false;
        m1[(unsigned char)s[i]] = i + 1;
        m2[(unsigned char)t[i]] = i + 1;
    }
    return true;
}

int main() {
    const char *s = "egg", *t = "add";
    printf("--- Isomorphic Strings Validator ---\n");
    printf("'%s' and '%s' -> %s\n", s, t, is_isomorphic(s, t) ? "Isomorphic" : "Not Isomorphic");
    return 0;
}

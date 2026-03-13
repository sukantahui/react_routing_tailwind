// bad_naming.c – cryptic names that hide meaning
#include <stdio.h>

// What does this do? Vague name.
double calc(int a[], int s) {
    int t = 0;
    for (int i = 0; i < s; i++) {
        t += a[i];
    }
    return (double)t / s;
}

// Another vague name.
int chk(int x) {
    return x >= 40;
}

// Unclear: what is being printed?
void p(const char* n, int m) {
    printf("%s: %d - %s\n", n, m, chk(m) ? "PASS" : "FAIL");
}

int main() {
    int m[] = {45, 38, 72, 61};
    char* n[] = {"Ritaja", "Swadeep", "Tuhina", "Abhronila"};
    int sz = sizeof(m) / sizeof(m[0]);

    double a = calc(m, sz);
    printf("Average: %.2f\n", a);

    for (int i = 0; i < sz; i++) {
        p(n[i], m[i]);
    }
    return 0;
}
#include <stdio.h>
#include <string.h>

int min(int a, int b) { return (a < b) ? a : b; }

void construct_z_array(const char *s, int n, int Z[]) {
    int L = 0, R = 0;
    Z[0] = 0;
    for (int i = 1; i < n; i++) {
        if (i > R) {
            L = R = i;
            while (R < n && s[R - L] == s[R]) R++;
            Z[i] = R - L; R--;
        } else {
            int k = i - L;
            if (Z[k] < R - i + 1) Z[i] = Z[k];
            else {
                L = i;
                while (R < n && s[R - L] == s[R]) R++;
                Z[i] = R - L; R--;
            }
        }
    }
}

int main() {
    const char *s = "aabxaabxcaabxaabxay";
    int n = strlen(s), Z[20];
    construct_z_array(s, n, Z);
    printf("--- Z-Algorithm Z-Array Construction ---\nZ-Array values: [ ");
    for (int i = 0; i < n; i++) printf("%d ", Z[i]);
    printf("]\n");
    return 0;
}

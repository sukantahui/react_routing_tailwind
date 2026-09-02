#include <stdio.h>

/**
 * Project 10: Polynomial Addition using 1D Array Representation
 * Represents two algebraic polynomials A(x) and B(x) in 1D coefficient arrays
 * and computes their polynomial sum C(x).
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void printPolynomial(const int poly[], int degree) {
    int first = 1;
    for (int i = degree; i >= 0; i--) {
        if (poly[i] != 0) {
            if (!first && poly[i] > 0) printf(" + ");
            if (poly[i] < 0) printf(" - ");

            int coeff = poly[i] > 0 ? poly[i] : -poly[i];
            if (i == 0) {
                printf("%d", coeff);
            } else if (i == 1) {
                printf("%dx", coeff);
            } else {
                printf("%dx^%d", coeff, i);
            }
            first = 0;
        }
    }
    printf("\n");
}

int main(void) {
    // Polynomial A: 5x^3 + 4x^2 + 2x + 1  (Degree 3)
    int A[5] = {1, 2, 4, 5, 0}; 
    int degA = 3;

    // Polynomial B: 3x^4 - 2x^2 + 7       (Degree 4)
    int B[5] = {7, 0, -2, 0, 3};
    int degB = 4;

    int maxDeg = degA > degB ? degA : degB;
    int sum[5] = {0};

    for (int i = 0; i <= maxDeg; i++) {
        sum[i] = A[i] + B[i];
    }

    printf("====================================================\n");
    printf(" Polynomial Addition via Coefficient Arrays\n");
    printf("====================================================\n");
    printf("P1(x) = "); printPolynomial(A, degA);
    printf("P2(x) = "); printPolynomial(B, degB);
    printf("----------------------------------------------------\n");
    printf("Sum   = "); printPolynomial(sum, maxDeg);

    return 0;
}

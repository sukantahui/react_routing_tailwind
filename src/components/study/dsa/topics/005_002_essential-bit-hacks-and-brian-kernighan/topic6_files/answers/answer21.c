#include <stdio.h>

float fast_inv_sqrt(float number) {
    long i;
    float x2, y;
    const float threehalfs = 1.5F;

    x2 = number * 0.5F;
    y  = number;
    i  = * ( long * ) &y;                       // evil floating point bit level hacking
    i  = 0x5f3759df - ( i >> 1 );               // what the fuck?
    y  = * ( float * ) &i;
    y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
    return y;
}

int main() {
    float x = 16.0f;
    printf("--- Fast Inverse Square Root (0x5f3759df Quake III Bit Hack) ---\n");
    printf("1 / sqrt(%f) = %f\n", x, fast_inv_sqrt(x));
    return 0;
}

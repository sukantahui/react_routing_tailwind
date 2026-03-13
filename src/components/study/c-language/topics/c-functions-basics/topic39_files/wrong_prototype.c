// wrong_prototype.c – Prototype and definition mismatch
#include <stdio.h>

// Prototype says returns int
int getDiscount(int price);

int main() {
    int price = 1000;
    int discount = getDiscount(price);
    printf("Discount: %d\n", discount);
    return 0;
}

// Definition says returns float – mismatch!
float getDiscount(int price) {
    return price * 0.1;  // Returns float
}
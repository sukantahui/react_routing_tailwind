// hdlc_bitstuffing.c – HDLC bit stuffing example
#include <stdio.h>
#include <string.h>

void stuff_bits(const unsigned char *in, int len, unsigned char *out, int *out_len) {
    int count_ones = 0;
    int j = 0;
    for(int i = 0; i < len; i++) {
        unsigned char byte = in[i];
        for(int bit = 7; bit >= 0; bit--) {
            int b = (byte >> bit) & 1;
            out[j++] = b;
            if(b == 1) {
                count_ones++;
                if(count_ones == 5) {
                    out[j++] = 0; // stuff a 0
                    count_ones = 0;
                }
            } else {
                count_ones = 0;
            }
        }
    }
    *out_len = j;
}

int main() {
    unsigned char data[] = {0x7E}; // 01111110 – would become 011111010 after stuffing
    unsigned char stuffed[100];
    int stuffed_len;
    stuff_bits(data, sizeof(data), stuffed, &stuffed_len);
    printf("HDLC bit stuffing demo:\nOriginal byte: 0x%02X\n", data[0]);
    printf("Stuffed bits: ");
    for(int i = 0; i < stuffed_len; i++) printf("%d", stuffed[i]);
    printf("\n");
    return 0;
}
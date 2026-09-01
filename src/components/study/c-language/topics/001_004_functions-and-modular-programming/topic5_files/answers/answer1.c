/**
 * ============================================================================
 * Project 1: Modular Scientific Geometry & Engineering Mensuration Suite
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

#define PI 3.141592653589793

/* Prototypes */
double circleArea(double radius);
double circleCircumference(double radius);
double cylinderVolume(double radius, double height);
double sphereVolume(double radius);

int main(void) {
    double r = 5.0, h = 12.0;

    printf("===================================================================\n");
    printf("     MODULAR GEOMETRY ENGINEERING SUITE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    printf("Dimensions: Radius = %.2f units, Height = %.2f units\n\n", r, h);
    printf("1. Circle Area          : %10.4f sq units\n", circleArea(r));
    printf("2. Circle Circumference : %10.4f units\n", circleCircumference(r));
    printf("3. Cylinder Volume      : %10.4f cubic units\n", cylinderVolume(r, h));
    printf("4. Sphere Volume        : %10.4f cubic units\n", sphereVolume(r));

    printf("===================================================================\n");
    return 0;
}

double circleArea(double radius) {
    return PI * radius * radius;
}

double circleCircumference(double radius) {
    return 2.0 * PI * radius;
}

double cylinderVolume(double radius, double height) {
    return circleArea(radius) * height; // Modular function reuse!
}

double sphereVolume(double radius) {
    return (4.0 / 3.0) * PI * radius * radius * radius;
}

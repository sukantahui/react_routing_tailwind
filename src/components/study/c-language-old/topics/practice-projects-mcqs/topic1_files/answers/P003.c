#include <stdio.h>
#define PI_DEFINE 3.14159

int main() {
    const double PI_CONST = 3.14159;
    double radius, area_const, circ_const, area_define, circ_define;

    printf("Enter radius: ");
    scanf("%lf", &radius);

    area_const = PI_CONST * radius * radius;
    circ_const = 2 * PI_CONST * radius;

    area_define = PI_DEFINE * radius * radius;
    circ_define = 2 * PI_DEFINE * radius;

    printf("Area (using const): %f\n", area_const);
    printf("Circumference (using const): %f\n", circ_const);
    printf("Area (using #define): %f\n", area_define);
    printf("Circumference (using #define): %f\n", circ_define);
    return 0;
}

public class NumberComparator<T extends Number & Comparable<T>> {
    private T a, b;

    public NumberComparator(T a, T b) {
        this.a = a;
        this.b = b;
    }

    public T max() {
        return a.compareTo(b) > 0 ? a : b;
    }
}

# writelines_vs_write.py
# Side-by-side comparison of write() and writelines()

import os

def compare_methods():
    """Show the difference in code and output."""
    data = ["Apple", "Banana", "Cherry"]

    print("🔹 Using write() in a loop:")
    with open("write_loop.txt", 'w', encoding='utf-8') as f:
        for item in data:
            f.write(item + "\n")
    with open("write_loop.txt", 'r', encoding='utf-8') as f:
        print(f.read())
    os.remove("write_loop.txt")

    print("\n🔹 Using writelines() with list comprehension:")
    with open("writelines_comp.txt", 'w', encoding='utf-8') as f:
        f.writelines([item + "\n" for item in data])
    with open("writelines_comp.txt", 'r', encoding='utf-8') as f:
        print(f.read())
    os.remove("writelines_comp.txt")

    print("\n🔹 Using writelines() with pre-formatted lines:")
    lines = [f"{item}\n" for item in data]
    with open("writelines_pre.txt", 'w', encoding='utf-8') as f:
        f.writelines(lines)
    with open("writelines_pre.txt", 'r', encoding='utf-8') as f:
        print(f.read())
    os.remove("writelines_pre.txt")

    print("🔹 Using join() and write() for a single string:")
    with open("join_write.txt", 'w', encoding='utf-8') as f:
        f.write("\n".join(data) + "\n")
    with open("join_write.txt", 'r', encoding='utf-8') as f:
        print(f.read())
    os.remove("join_write.txt")

if __name__ == "__main__":
    compare_methods()
    print("🧹 Cleaned up.")
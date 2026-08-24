# pathlib_example.py
# Demonstrates the modern pathlib approach to file paths

from pathlib import Path

def pathlib_examples():
    """Show how to use pathlib for path operations."""
    # Create Path objects
    p = Path("project/data/settings.json")
    print(f"📁 Path: {p}")
    print(f"   Parent: {p.parent}")
    print(f"   Name: {p.name}")
    print(f"   Stem: {p.stem}")
    print(f"   Suffix: {p.suffix}")

    # Joining paths with /
    base = Path("project")
    sub = base / "data"
    full = sub / "settings.json"
    print(f"\n🔗 Using / operator: {full}")
    print(f"   Is absolute? {full.is_absolute()}")

    # Absolute path
    abs_path = full.resolve()  # similar to os.path.abspath
    print(f"   Absolute: {abs_path}")

    # Check existence
    print(f"\n📂 Does {full} exist? {full.exists()}")

    # Creating directories and files
    test_dir = Path("test_folder")
    test_dir.mkdir(exist_ok=True)
    test_file = test_dir / "hello.txt"
    test_file.write_text("Hello from pathlib!", encoding='utf-8')
    print(f"\n✍️ Wrote to {test_file}")
    content = test_file.read_text(encoding='utf-8')
    print(f"   Read: {content}")

    # Iterate over directory
    print("\n📄 Contents of current directory:")
    for item in Path(".").iterdir():
        if item.is_file():
            print(f"   📄 {item.name}")
        elif item.is_dir():
            print(f"   📁 {item.name}/")

    # Cleanup
    test_file.unlink()
    test_dir.rmdir()
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    pathlib_examples()
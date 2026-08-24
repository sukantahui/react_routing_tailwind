# script_location.py
# Demonstrates the difference between CWD and script location

import os

def show_locations():
    """Compare CWD with the script's directory."""
    # Get CWD
    cwd = os.getcwd()
    print(f"📍 Current Working Directory: {cwd}")

    # Get script location
    script_file = __file__
    script_dir = os.path.dirname(os.path.abspath(script_file))
    print(f"📄 Script file: {script_file}")
    print(f"📁 Script directory: {script_dir}")

    # Are they the same?
    if cwd == script_dir:
        print("✅ CWD is the same as script directory.")
    else:
        print("❌ CWD is different from script directory.")
        print(f"   Difference: CWD='{cwd}' vs Script='{script_dir}'")
        print("\n💡 Tip: If you want to reference files relative to the script,")
        print("   use os.path.join(script_dir, 'filename')")

    # Build a path relative to the script
    config_path = os.path.join(script_dir, "config.ini")
    print(f"\n🔗 Path relative to script: {config_path}")

if __name__ == "__main__":
    show_locations()
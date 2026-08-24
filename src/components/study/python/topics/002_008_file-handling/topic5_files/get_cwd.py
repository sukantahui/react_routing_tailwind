# get_cwd.py
# Demonstrates how to get the current working directory

import os
from pathlib import Path

def show_cwd():
    """Show the current working directory using different methods."""
    # Method 1: os.getcwd()
    cwd_os = os.getcwd()
    print(f"📂 os.getcwd(): {cwd_os}")

    # Method 2: pathlib.Path.cwd()
    cwd_pathlib = Path.cwd()
    print(f"📂 Path.cwd():  {cwd_pathlib}")

    # Both return the same absolute path
    print(f"✅ Are they the same? {cwd_os == str(cwd_pathlib)}")

    # Also show the type
    print(f"   os.getcwd() type: {type(cwd_os)}")
    print(f"   Path.cwd() type:  {type(cwd_pathlib)}")

if __name__ == "__main__":
    show_cwd()
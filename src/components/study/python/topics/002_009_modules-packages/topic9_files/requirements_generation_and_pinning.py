# topic9_files/requirements_generation_and_pinning.py
# Module: 002_009_modules-packages
# Topic: requirements.txt generation and dependency management
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 1: requirements.txt Anatomy, Version Specifiers & Environment Markers
Demonstrates:
  1. How 'pip freeze > requirements.txt' captures pinned dependencies
  2. The 5 standard version specifier operators (==, >=, <=, ~=, !=)
  3. Environment markers for platform-specific dependencies (e.g. sys_platform == 'win32')
  4. Installing dependencies cleanly via 'python -m pip install -r requirements.txt'
"""

def explain_requirements_syntax():
    print("=" * 65)
    print("1. ANATOMY & SYNTAX OF requirements.txt")
    print("=" * 65)
    print(r"""
Standard requirements.txt Structure:

# 1. Exact Version Pinning (Best for Production Deployments):
requests==2.31.0
fastapi==0.110.0

# 2. Minimum Compatible Version:
pandas>=2.1.0

# 3. Compatible Release / Semantic Versioning (~=):
# (Allows 1.4.1, 1.4.2 but blocks breaking 2.0.0)
pydantic~=2.6.0

# 4. Environment Markers (Platform-Specific):
# (Installs 'colorama' only when running on Windows)
colorama>=0.4.6; sys_platform == 'win32'
uvloop>=0.19.0; sys_platform != 'win32'

# 5. Direct Git Repository Reference:
# my-plugin @ git+https://github.com/accotax/plugin.git@v1.2.0
""")


def explain_generation_commands():
    print("=" * 65)
    print("2. ESSENTIAL DEPENDENCY MANAGEMENT COMMANDS")
    print("=" * 65)
    print(r"""
A. Export Active Virtual Environment Dependencies:
   $ python -m pip freeze > requirements.txt

B. Install All Dependencies on a New Server / Machine:
   $ python -m pip install -r requirements.txt

C. Verify All Installed Dependencies Match Without Missing Packages:
   $ python -m pip check
""")


if __name__ == "__main__":
    explain_requirements_syntax()
    explain_generation_commands()

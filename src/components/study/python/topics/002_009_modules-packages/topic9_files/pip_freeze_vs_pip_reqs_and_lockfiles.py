# topic9_files/pip_freeze_vs_pip_reqs_and_lockfiles.py
# Module: 002_009_modules-packages
# Topic: requirements.txt generation and dependency management
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 3: pip freeze vs pipreqs vs pip-tools Lockfiles & PEP 621
Demonstrates:
  1. The hidden drawbacks of naive 'pip freeze' (transitive noise, global contamination)
  2. 'pipreqs': Automated requirements generation by scanning project source imports
  3. 'pip-tools' (pip-compile): High-level requirements.in -> Deterministic lockfile
  4. Modern pyproject.toml standard (PEP 621)
"""

def explain_freeze_limitations():
    print("=" * 65)
    print("1. WHY NAIVE 'pip freeze' CAN BE DANGEROUS")
    print("=" * 65)
    print(r"""
Scenario: You only installed `fastapi` and `pandas`.
When you run `pip freeze`, you get 45 lines of output:
  annotated-types==0.6.0
  anyio==4.3.0
  fastapi==0.110.0
  idna==3.6
  numpy==1.26.4
  pandas==2.2.1
  pydantic==2.6.4
  pydantic-core==2.16.3
  python-dateutil==2.8.2
  pytz==2024.1
  sniffio==1.3.1
  starlette==0.36.3
  typing-extensions==4.10.0
  tzdata==2024.1
  ... and 30 more!

Problems with this:
  1. Loss of Intent: It is impossible to tell which packages are your DIRECT dependencies
     and which ones are just sub-dependencies (transitive dependencies).
  2. Upgrading Nightmare: Upgrading `fastapi` requires manually unpinning 20 sub-dependencies.
""")


def explain_modern_tooling():
    print("=" * 65)
    print("2. MODERN DEPENDENCY TOOLING (pip-tools & pipreqs)")
    print("=" * 65)
    print(r"""
Tool 1: `pip-tools` (The Professional Standard for Lockfiles):
  1. You write your direct requirements in `requirements.in`:
     fastapi>=0.110.0
     pandas>=2.0.0
  2. You run: `pip-compile requirements.in`
  3. pip-tools generates a pinned, annotated `requirements.txt` documenting
     WHY every sub-dependency was installed!

Tool 2: `pipreqs` (Source Scanner):
  - Scans only the `import` statements inside your project's .py files.
  - Generates a requirements.txt with ZERO extraneous packages from your environment!
  - Run: $ pipreqs ./
""")


if __name__ == "__main__":
    explain_freeze_limitations()
    explain_modern_tooling()

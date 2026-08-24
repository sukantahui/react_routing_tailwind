# topic9_files/layered_requirements_architecture.py
# Module: 002_009_modules-packages
# Topic: requirements.txt generation and dependency management
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 2: Layered Enterprise Requirements Architecture (base / dev / prod)
Demonstrates:
  1. Splitting dependencies into distinct modular tiers
  2. The '-r' recursive include directive
  3. Preventing development tools (pytest, black) from polluting production servers
"""

def explain_layered_requirements():
    print("=" * 65)
    print("1. LAYERED REQUIREMENTS ARCHITECTURE (THE '-r' DIRECTIVE)")
    print("=" * 65)
    print(r"""
Directory Structure:
  my_enterprise_app/
  |-- requirements/
  |   |-- base.txt       <- Core application dependencies
  |   |-- dev.txt        <- Local testing, linting & formatting tools
  |   \-- prod.txt       <- Production WSGI/ASGI servers & APM monitoring
  \-- requirements.txt   <- Points to requirements/prod.txt or base.txt

File 1: `requirements/base.txt`
  fastapi==0.110.0
  pydantic==2.6.4
  requests==2.31.0
  sqlalchemy==2.0.28

File 2: `requirements/dev.txt` (Local Developers & CI Testing)
  -r base.txt            # Includes everything from base.txt!
  pytest==8.0.2
  black==24.2.0
  flake8==7.0.0
  mypy==1.8.0

File 3: `requirements/prod.txt` (Production Docker Containers)
  -r base.txt            # Includes everything from base.txt!
  gunicorn==21.2.0
  uvicorn[standard]==0.27.1
  sentry-sdk==1.40.6
""")


def explain_installation_workflows():
    print("=" * 65)
    print("2. TARGETED INSTALLATION WORKFLOWS")
    print("=" * 65)
    print(r"""
Local Development Machine:
  $ python -m pip install -r requirements/dev.txt
  (Installs FastAPI, Pydantic, Requests + Pytest, Black, Mypy)

Production Server / Dockerfile:
  $ python -m pip install --no-cache-dir -r requirements/prod.txt
  (Installs ONLY FastAPI, Pydantic, Requests + Gunicorn & Uvicorn; Zero dev bloat!)
""")


if __name__ == "__main__":
    explain_layered_requirements()
    explain_installation_workflows()

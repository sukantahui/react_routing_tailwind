# topic13_files/abc_module_fundamentals_and_enforcement.py
# Module: 003_001_object-oriented-python
# Topic: Abstract Base Classes (abc module)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 13 - File 1: Abstract Base Classes (abc module) Fundamentals
Demonstrates:
  1. Defining Abstract Base Classes using `from abc import ABC, abstractmethod`
  2. The Instantiation Blocker: Attempting to instantiate an incomplete class raises TypeError
  3. Enforcing mandatory method contracts on derived concrete classes
"""

from abc import ABC, abstractmethod
from typing import Dict, Any

# =====================================================================
# 1. ABSTRACT BASE CLASS (The Contract Interface)
# =====================================================================
class BaseDatabaseConnector(ABC):
    """Abstract interface defining the mandatory database lifecycle."""

    def __init__(self, host: str, port: int, database_name: str):
        self.host = host
        self.port = port
        self.database_name = database_name
        self.is_connected = False

    @abstractmethod
    def connect(self) -> bool:
        """Mandatory abstract method: Must establish socket connection."""
        pass

    @abstractmethod
    def execute_query(self, sql_statement: str) -> Dict[str, Any]:
        """Mandatory abstract method: Must execute query and return result dictionary."""
        pass

    def disconnect(self):
        """Concrete common method shared across all derived connectors."""
        self.is_connected = False
        print(f"  [DISCONNECTED] Closed session with {self.database_name} on {self.host}:{self.port}")


# =====================================================================
# 2. CONCRETE IMPLEMENTATION 1 (PostgreSQL)
# =====================================================================
class PostgreSQLConnector(BaseDatabaseConnector):
    """Fully implements all abstract methods."""

    def connect(self) -> bool:
        print(f"  [POSTGRES] Handshaking with {self.database_name} at {self.host}:{self.port} via libpq...")
        self.is_connected = True
        return True

    def execute_query(self, sql_statement: str) -> Dict[str, Any]:
        if not self.is_connected:
            raise ConnectionError("Cannot query disconnected database!")
        print(f"  [POSTGRES EXEC] {sql_statement}")
        return {"engine": "PostgreSQL", "status": "200_OK", "rows": 42}


# =====================================================================
# 3. INCOMPLETE SUBCLASS (Omits execute_query!)
# =====================================================================
class IncompleteSQLiteConnector(BaseDatabaseConnector):
    """Broken Subclass: Implements connect(), but forgets execute_query()!"""

    def connect(self) -> bool:
        self.is_connected = True
        return True


def demonstrate_abc_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - ABSTRACT BASE CLASSES (ABC) ENFORCEMENT")
    print("=" * 70)

    # 1. Attempting to instantiate the Abstract Base Class directly:
    print("1. Attempting to instantiate `BaseDatabaseConnector` directly:")
    try:
        base = BaseDatabaseConnector("localhost", 5432, "institute_db")
    except TypeError as err:
        print(f"   [BLOCKED BY CPYTHON] TypeError: {err}\n")

    # 2. Attempting to instantiate an Incomplete Subclass:
    print("2. Attempting to instantiate `IncompleteSQLiteConnector` (Missing execute_query):")
    try:
        bad_subclass = IncompleteSQLiteConnector("localhost", 0, "local.sqlite")
    except TypeError as err:
        print(f"   [BLOCKED BY CPYTHON] TypeError: {err}\n")

    # 3. Successful Concrete Implementation:
    print("3. Instantiating fully implemented `PostgreSQLConnector`:")
    pg = PostgreSQLConnector("db.codernaccotax.co.in", 5432, "student_ledger_2026")
    pg.connect()
    res = pg.execute_query("SELECT COUNT(*) FROM student_admissions;")
    print(f"   Query Result: {res}")
    pg.disconnect()

    print("\n[PASSED] Abstract Base Class Enforcement Verified.")


if __name__ == "__main__":
    demonstrate_abc_fundamentals()

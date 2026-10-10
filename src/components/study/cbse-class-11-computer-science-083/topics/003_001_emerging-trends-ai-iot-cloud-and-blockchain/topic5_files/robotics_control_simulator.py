"""
Module 003: Emerging Trends in Computing
Topic 5: Robotics Control & Subsystems Simulation
Pure Python Simulation of Sense-Plan-Act Feedback Loop, Sensor Data Acquisition, and Actuator Control.
"""

from typing import Dict, List

class RobotSubsystemsEngine:
    def __init__(self):
        # Sensors state
        self.ultrasonic_distance_cm = 120.0
        self.infrared_line_sensor = "WHITE"
        self.temperature_c = 28.5
        self.camera_object_detected = None
        
        # Controller state
        self.controller_cpu = "ARM Cortex Microcontroller"
        self.battery_level_pct = 88.0
        
        # Actuators state
        self.motor_left_speed = 0  # -100 to +100
        self.motor_right_speed = 0 # -100 to +100
        self.gripper_state = "OPEN" # OPEN / CLOSED
        self.robotic_arm_angle = 45.0 # degrees

    def sense(self, distance_cm: float, line_surface: str, detected_obj: str = None) -> Dict[str, any]:
        """Sense phase: Read environment parameters from simulated sensors."""
        self.ultrasonic_distance_cm = distance_cm
        self.infrared_line_sensor = line_surface
        self.camera_object_detected = detected_obj
        return {
            "ultrasonic_distance_cm": self.ultrasonic_distance_cm,
            "infrared_line_sensor": self.infrared_line_sensor,
            "camera_object": self.camera_object_detected
        }

    def plan(self) -> str:
        """Plan phase: Process sensor readings and determine control decision."""
        if self.ultrasonic_distance_cm < 20.0:
            return "OBSTACLE_AVOIDANCE"
        elif self.camera_object_detected == "PAYLOAD_BOX":
            return "PICKUP_OBJECT"
        elif self.infrared_line_sensor == "BLACK_LINE":
            return "FOLLOW_LINE_STRAIGHT"
        elif self.infrared_line_sensor == "OFF_LINE_LEFT":
            return "ADJUST_STEER_RIGHT"
        elif self.infrared_line_sensor == "OFF_LINE_RIGHT":
            return "ADJUST_STEER_LEFT"
        else:
            return "PATROL_FORWARD"

    def act(self, plan_action: str) -> Dict[str, any]:
        """Act phase: Issue electrical PWM signals to motors and mechanical actuators."""
        if plan_action == "OBSTACLE_AVOIDANCE":
            self.motor_left_speed = -50
            self.motor_right_speed = 50
            action_desc = "EMERGENCY REVERSE & ROTATE: Obstacle within 20cm!"
        elif plan_action == "PICKUP_OBJECT":
            self.motor_left_speed = 0
            self.motor_right_speed = 0
            self.gripper_state = "CLOSED"
            self.robotic_arm_angle = 90.0
            action_desc = "HALT & GRIP: Gripper clamped onto payload box."
        elif plan_action == "FOLLOW_LINE_STRAIGHT":
            self.motor_left_speed = 80
            self.motor_right_speed = 80
            action_desc = "DRIVE: Both DC Motors running forward at 80% PWM."
        elif plan_action == "ADJUST_STEER_RIGHT":
            self.motor_left_speed = 70
            self.motor_right_speed = 30
            action_desc = "STEER: Right turn correction to re-center on track."
        elif plan_action == "ADJUST_STEER_LEFT":
            self.motor_left_speed = 30
            self.motor_right_speed = 70
            action_desc = "STEER: Left turn correction to re-center on track."
        else:
            self.motor_left_speed = 60
            self.motor_right_speed = 60
            action_desc = "PATROL: Cruising forward at standard speed."

        return {
            "action": plan_action,
            "description": action_desc,
            "motors": {"left_pwm": self.motor_left_speed, "right_pwm": self.motor_right_speed},
            "gripper": self.gripper_state,
            "arm_angle": self.robotic_arm_angle
        }

    def execute_cycle(self, distance: float, line: str, obj: str = None) -> Dict[str, any]:
        """Executes a complete Sense-Plan-Act control cycle."""
        sensors = self.sense(distance, line, obj)
        decision = self.plan()
        actuations = self.act(decision)
        return {
            "sensed_data": sensors,
            "controller_decision": decision,
            "actuator_output": actuations
        }

if __name__ == "__main__":
    robot = RobotSubsystemsEngine()
    print("=" * 65)
    print("Robotics Sense-Plan-Act Feedback Control Loop Simulation")
    print("=" * 65)

    scenarios = [
        {"desc": "Scenario 1: Cruising on clear floor", "dist": 150.0, "line": "WHITE", "obj": None},
        {"desc": "Scenario 2: Wall detected immediately ahead", "dist": 12.5, "line": "WHITE", "obj": None},
        {"desc": "Scenario 3: Factory warehouse line following", "dist": 90.0, "line": "BLACK_LINE", "obj": None},
        {"desc": "Scenario 4: Target warehouse payload reached", "dist": 15.0, "line": "WHITE", "obj": "PAYLOAD_BOX"}
    ]

    for sc in scenarios:
        print(f"\n{sc['desc']}")
        result = robot.execute_cycle(sc["dist"], sc["line"], sc["obj"])
        print(f"  Sense : Dist = {result['sensed_data']['ultrasonic_distance_cm']} cm, Line = {result['sensed_data']['infrared_line_sensor']}")
        print(f"  Plan  : Decision -> {result['controller_decision']}")
        print(f"  Act   : {result['actuator_output']['description']}")

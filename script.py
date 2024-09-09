from tofupilot import TofuPilotClient
from datetime import datetime, timedelta

client = TofuPilotClient()

client.create_run(
    procedure_id="FVT1",  # Functional Verification Test ID
    unit_under_test={
        "serial_number": "00102",  # Serial number of the hardware unit under test
    },
    run_passed=True,  # Overall run status
    steps=[
        {
            "name": "step_connect",  # First step
            "step_passed": True,  # Status of the step
            "duration": timedelta(seconds=3),  # Duration of the step
            "started_at": datetime.now(),  # Start time of the step
        },
        {
            "name": "step_initial_charge_check",  # Second step
            "step_passed": True,  # Status of the step
            "duration": timedelta(milliseconds=500),  # Duration of the step (<1s)
            "started_at": datetime.now()
            + timedelta(seconds=3),  # Start time of the second step
            "measurement_value": 80,  # Measured value
        },
        {
            "name": "step_initial_temp_check",  # Third step
            "step_passed": True,  # Status of the step
            "duration": timedelta(milliseconds=500),  # Duration of the step (<1s)
            "started_at": datetime.now()
            + timedelta(seconds=3, milliseconds=500),  # Start time of the third step
            "measurement_value": 72,  # Measured temperature value
            "measurement_unit": "°C",  # Unit of the measurement (temperature)
            "limit_low": 0,  # Lower limit of acceptable temperature
        },
        {
            "name": "step_temp_calibration",  # Fourth step
            "step_passed": True,  # Status of the step
            "duration": timedelta(milliseconds=500),  # Duration of the step (<1s)
            "started_at": datetime.now()
            + timedelta(seconds=4),  # Start time of the fourth step
            "measurement_value": 75,  # Measured temperature value after calibration
            "measurement_unit": "°C",  # Unit of the measurement (temperature)
            "limit_low": 70,  # Lower limit of acceptable temperature
            "limit_high": 80,  # Upper limit of acceptable temperature
        },
    ],
)

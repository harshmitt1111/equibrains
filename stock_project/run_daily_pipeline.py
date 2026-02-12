import os

steps = [
    "python download_multiple_stocks.py",
    "python clean_all_stocks.py",
    "python feature_engineering_all_stocks.py",
    "python label_all_stocks.py",
    "python recommend_with_user_risk.py"
]

for step in steps:
    print(f"\nRunning: {step}")
    os.system(step)

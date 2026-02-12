import pandas as pd
import os

raw_dir = "data/raw"
cleaned_dir = "data/cleaned"

os.makedirs(cleaned_dir, exist_ok=True)

for file in os.listdir(raw_dir):
    if not file.endswith(".csv"):
        continue

    print(f"Cleaning {file}...")

    df = pd.read_csv(f"{raw_dir}/{file}", header=[0,1], index_col=0)

    # Flatten multi-index columns
    df.columns = df.columns.get_level_values(0)

    # Convert index to datetime
    df.index = pd.to_datetime(df.index)

    # Sort by date
    df = df.sort_index()

    # Save cleaned file
    df.to_csv(f"{cleaned_dir}/{file}")

print("All stocks cleaned and saved.")

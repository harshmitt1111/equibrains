import pandas as pd

# Load raw data
df = pd.read_csv("data/raw/RELIANCE.NS.csv", header=[0,1], index_col=0)

# Flatten multi-index columns
df.columns = df.columns.get_level_values(0)

# Convert index to datetime
df.index = pd.to_datetime(df.index)

# Sort by date
df = df.sort_index()

# Check missing values
print("Missing values:\n", df.isna().sum())

# Save cleaned data
df.to_csv("data/cleaned/RELIANCE.NS.csv")
print("Cleaned file saved to data/cleaned/")

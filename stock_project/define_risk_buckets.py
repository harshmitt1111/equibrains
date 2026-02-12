import pandas as pd

# Load calibration data
df = pd.read_csv("data/features/risk_calibration.csv")

# Define percentile thresholds
low_vol = df["Volatility"].quantile(0.33)
high_vol = df["Volatility"].quantile(0.66)

def assign_risk(vol):
    if vol <= low_vol:
        return "Low"
    elif vol <= high_vol:
        return "Medium"
    else:
        return "High"

df["Risk_Bucket"] = df["Volatility"].apply(assign_risk)

# Save updated file
df.to_csv("data/features/risk_buckets.csv", index=False)

print("Risk buckets assigned:")
print(df)

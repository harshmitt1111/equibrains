import pandas as pd

# Load combined features
df = pd.read_csv(
    "data/features/all_stock_features.csv",
    index_col=0,
    parse_dates=True
)

# Future 12-month return
df["Future_Return_12m"] = (
    df.groupby("Ticker")["Close"].shift(-252) / df["Close"] - 1
)

# Drop rows without future data
df = df.dropna(subset=["Future_Return_12m"])

# Label top 30% performers (GLOBAL ranking)
threshold = df["Future_Return_12m"].quantile(0.70)
df["Target"] = (df["Future_Return_12m"] >= threshold).astype(int)

df.to_csv("data/features/all_stock_labeled.csv")

print("All stocks labeled together.")
print(df[["Ticker", "Future_Return_12m", "Target"]].head())

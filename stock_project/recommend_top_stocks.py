import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

# Load labeled data
df = pd.read_csv(
    "data/features/all_stock_labeled.csv",
    index_col=0,
    parse_dates=True
)

df = df.sort_index()

feature_cols = [
    "Volatility_30d", "Volatility_90d",
    "Momentum_6m", "Momentum_12m",
    "Trend"
]

X = df[feature_cols]
y = df["Target"]

split_date = "2022-01-01"

X_train = X.loc[:split_date]
y_train = y.loc[:split_date]

X_test = X.loc[split_date:]

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=6,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train_scaled, y_train)

# Predict probabilities
df_test = df.loc[split_date:].copy()
df_test["prob"] = model.predict_proba(X_test_scaled)[:, 1]

# Recommend top 3 stocks per date
top_picks = (
    df_test
    .groupby(df_test.index)
    .apply(lambda x: x.sort_values("prob", ascending=False).head(3))
)

print("TOP RECOMMENDATIONS:")
print(top_picks[["Ticker", "prob"]].head(10))

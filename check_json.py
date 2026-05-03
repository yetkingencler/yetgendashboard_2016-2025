import re
import json

with open("src/App.tsx", "r") as f:
    content = f.read()

start_str = "const yearlyData: IYearlyData[] = ["
end_str = "  const totalParticipants ="
start_idx = content.find(start_str) + len(start_str) - 1
# find the ]; before totalParticipants
end_idx = content.rfind("];", 0, content.find(end_str)) + 1

data_str = content[start_idx:end_idx]
try:
    data = json.loads(data_str)
    print("Valid JSON!")
except Exception as e:
    print("Error:", e)

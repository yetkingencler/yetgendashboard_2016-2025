import json
import re

with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

start_str = "const yearlyData: IYearlyData[] = "
start_idx = content.find(start_str) + len(start_str)
end_str = "];\n\nconst genderData"
end_idx = content.find(end_str) + 1

data_str = content[start_idx:end_idx]

# Check if valid JSON
try:
    yearly_data = json.loads(data_str)
except Exception as e:
    print("Error parsing JSON:", e)
    # let's try to remove trailing commas if any
    data_str_clean = re.sub(r',\s*([\]}])', r'\1', data_str)
    yearly_data = json.loads(data_str_clean)

# Find 2024
d2024 = next(d for d in yearly_data if d["year"] == "2024")

# Update basic totals
d2024["participants"] += 1862
d2024["graduates"] += 981
d2024["gender"]["female"] += 1367
d2024["gender"]["male"] += 484
d2024["gender"]["other"] += 7

# Add the new program
new_program = {
    "id": "doping-2024",
    "name": "Doping Hafıza Eğitimi",
    "participants": 1862,
    "graduates": 981,
    "gender": {
        "female": 1367,
        "male": 484,
        "other": 7
    },
    "hasAgeData": False,
    "ageData": [],
    "cities": [
        {"name": "Adana", "count": 23},
        {"name": "Adıyaman", "count": 17},
        {"name": "Afyonkarahisar", "count": 7},
        {"name": "Ağrı", "count": 4},
        {"name": "Aksaray", "count": 7},
        {"name": "Amasya", "count": 5},
        {"name": "Ankara", "count": 101},
        {"name": "Antalya", "count": 22},
        {"name": "Aydın", "count": 12},
        {"name": "Balıkesir", "count": 13},
        {"name": "Bartın", "count": 2},
        {"name": "Batman", "count": 7},
        {"name": "Bilecik", "count": 3},
        {"name": "Bingöl", "count": 3},
        {"name": "Bitlis", "count": 5},
        {"name": "Bolu", "count": 5},
        {"name": "Burdur", "count": 2},
        {"name": "Bursa", "count": 22},
        {"name": "Çanakkale", "count": 6},
        {"name": "Çankırı", "count": 1},
        {"name": "Çorum", "count": 2},
        {"name": "Denizli", "count": 8},
        {"name": "Diyarbakır", "count": 24},
        {"name": "Düzce", "count": 2},
        {"name": "Edirne", "count": 7},
        {"name": "Elazığ", "count": 7},
        {"name": "Erzincan", "count": 4},
        {"name": "Erzurum", "count": 11},
        {"name": "Eskişehir", "count": 8},
        {"name": "Gaziantep", "count": 28},
        {"name": "Giresun", "count": 1},
        {"name": "Gümüşhane", "count": 2},
        {"name": "Hakkâri", "count": 7},
        {"name": "Hatay", "count": 18},
        {"name": "Iğdır", "count": 2},
        {"name": "Isparta", "count": 2},
        {"name": "İstanbul", "count": 162},
        {"name": "İzmir", "count": 47},
        {"name": "Kahramanmaraş", "count": 11},
        {"name": "Karabük", "count": 1},
        {"name": "Karaman", "count": 2},
        {"name": "Kars", "count": 1},
        {"name": "Kastamonu", "count": 2},
        {"name": "Kayseri", "count": 22},
        {"name": "Kilis", "count": 5},
        {"name": "Kırıkkale", "count": 6},
        {"name": "Kırklareli", "count": 1},
        {"name": "Kocaeli", "count": 20},
        {"name": "Konya", "count": 38},
        {"name": "Kütahya", "count": 4},
        {"name": "Malatya", "count": 15},
        {"name": "Manisa", "count": 7},
        {"name": "Mardin", "count": 10},
        {"name": "Mersin", "count": 8},
        {"name": "Muğla", "count": 3},
        {"name": "Muş", "count": 2},
        {"name": "Nevşehir", "count": 1},
        {"name": "Niğde", "count": 2},
        {"name": "Ordu", "count": 2},
        {"name": "Osmaniye", "count": 12},
        {"name": "Rize", "count": 1},
        {"name": "Sakarya", "count": 11},
        {"name": "Samsun", "count": 7},
        {"name": "Şanlıurfa", "count": 13},
        {"name": "Siirt", "count": 4},
        {"name": "Sinop", "count": 1},
        {"name": "Sivas", "count": 6},
        {"name": "Şırnak", "count": 1},
        {"name": "Tekirdağ", "count": 9},
        {"name": "Tokat", "count": 3},
        {"name": "Trabzon", "count": 6},
        {"name": "Tunceli", "count": 2},
        {"name": "Uşak", "count": 3},
        {"name": "Van", "count": 13},
        {"name": "Yozgat", "count": 2},
        {"name": "Zonguldak", "count": 4}
    ],
    "educationLevels": [
        {"name": "Lise", "count": 433},
        {"name": "Lise Mezunu", "count": 334}
    ],
    "topDepartments": []
}

# Update 2024 cities
existing_cities = {c["name"]: c["count"] for c in d2024["cities"]}
for c in new_program["cities"]:
    existing_cities[c["name"]] = existing_cities.get(c["name"], 0) + c["count"]
d2024["cities"] = [{"name": k, "count": v} for k, v in sorted(existing_cities.items(), key=lambda x: x[0])]

# Update 2024 educationLevels
existing_edu = {e["name"]: e["count"] for e in d2024["educationLevels"]}
for e in new_program["educationLevels"]:
    existing_edu[e["name"]] = existing_edu.get(e["name"], 0) + e["count"]
d2024["educationLevels"] = [{"name": k, "count": v} for k, v in sorted(existing_edu.items(), key=lambda x: x[1], reverse=True)]

d2024["programs"].append(new_program)

# Convert back to JSON and format identically to original
new_data_str = json.dumps(yearly_data, indent=2, ensure_ascii=False)

# Re-indent to match original: data starts at indent level 0 but inside elements are indented.
# Original array definition: `const yearlyData: IYearlyData[] = [\n  {\n    "year": "2016",\n...`
# json.dumps gives `[\n  {\n    "year": "2016",\n...` which perfectly matches!

new_content = content[:start_idx] + new_data_str + content[end_idx:]

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully updated App.tsx")
""
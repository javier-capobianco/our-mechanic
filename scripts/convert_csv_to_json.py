import csv
import json
from collections import defaultdict

def sort_json(obj):
    if isinstance(obj, dict):
        # Sorts the keys of the dictionary (Year keys)
        return {k: sort_json(v) for k, v in sorted(obj.items())}
    if isinstance(obj, list):
        # Recursively sorts items within lists
        return [sort_json(item) for item in obj]
    return obj

def convert_csv_to_json(csv_filepath, json_filepath):
    # Structure: { "Year": { "Make": ["Model1", "Model2"] } }
    car_data = defaultdict(lambda: defaultdict(list))

    try:
        with open(csv_filepath, mode='r', encoding='utf-8') as csv_file:
            reader = csv.DictReader(csv_file)
            
            for row in reader:
                year = row['year']
                make = row['make']
                model = row['model']
                
                car_data[year][make].append(model)

        final_structure = {}
        for year, makes in car_data.items():
            # 1. Sort the Brand names (makes.items())
            # 2. Sort the list of models for each brand (sorted(models))
            final_structure[year] = [
                {"brand": make, "models": sorted(list(set(models)), key= lambda key: key.lower() )} 
                for make, models in sorted(makes.items(), key=lambda key: key[0].lower())
            ]

        # Use your sort_json to ensure the Years (top-level keys) are sorted
        final_structure = sort_json(final_structure)

        with open(json_filepath, 'w', encoding='utf-8') as json_file:
            json.dump(final_structure, json_file, indent=2)
            
        print(f"Success! {json_filepath} has been created with sorted data.")

    except FileNotFoundError:
        print("Error: The CSV file was not found.")
    except KeyError as e:
        print(f"Error: Missing column in CSV: {e}")

# Run the function
convert_csv_to_json(r'C:\Users\javie\Documents\Side Coding Projects\Our Mechanic\our-mechanic-frontend\cleaned_cars.csv',
                    'cars.json')
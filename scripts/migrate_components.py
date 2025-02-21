# Push Components to New Storyblok Site
import requests
from pprint import pprint
import json
import os

url = "https://api-us.storyblok.com/v1/spaces/1023258/components/"

querystring = {}


current_dir = os.getcwd()
print(current_dir)

filename = "../components.1014492.json"
# Open and parse the JSON file
with open(os.path.join(current_dir, filename), 'r') as file:
    data = json.load(file)

# Map the contents of the array into the payload
components = data.get('components', [])

payloads = []
for component in components:
    payload = {
        "component": {
            "name": component.get("name"),
            "display_name": component.get("display_name"),
            "schema": component.get("schema"),
            "is_root": component.get("is_root"),
            "is_nestable": component.get("is_nestable"),
        }
    }
    payloads.append(payload)

# Print the payloads to verify
for payload in payloads:
    print(json.dumps(payload, indent=2))

headers = {
    'Content-Type': "application/json",
    'Authorization': "USER TOKEN"
}

for payload in payloads:
    response = requests.request("POST", url, data=json.dumps(payload), headers=headers, params=querystring)
    print(response.json())

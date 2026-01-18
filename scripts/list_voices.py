import requests
API_KEY = 'sk_da15da2b103894a5559d37bf79c104b32f251a2b78c1aecb'
url = 'https://api.elevenlabs.io/v1/voices'
headers = {'xi-api-key': API_KEY}
r = requests.get(url, headers=headers)
voices = r.json()['voices']
for v in voices:
    print(f"{v['name']}: {v['voice_id']}")

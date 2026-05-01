import json

def merge_programs(programs):
    merged_basic = {
        'id': 'basic-merged',
        'name': '',
        'participants': 0,
        'graduates': 0,
        'gender': {'female': 0, 'male': 0, 'other': 0},
        'hasAgeData': False,
        'ageData': {},
        'cities': {},
        'educationLevels': {},
        'topSchools': {},
        'topDepartments': {}
    }
    
    basic_count = 0
    others = []
    
    for p in programs:
        if 'BASIC' in p['name']:
            basic_count += 1
            merged_basic['name'] = p['name'].split('-')[0].strip() # e.g. "BASIC 2021"
            merged_basic['participants'] += p['participants']
            merged_basic['graduates'] += p['graduates']
            
            merged_basic['gender']['female'] += p['gender'].get('female', 0)
            merged_basic['gender']['male'] += p['gender'].get('male', 0)
            merged_basic['gender']['other'] += p['gender'].get('other', 0)
            
            if p.get('hasAgeData'):
                merged_basic['hasAgeData'] = True
                for ad in p.get('ageData', []):
                    merged_basic['ageData'][ad['age']] = merged_basic['ageData'].get(ad['age'], 0) + ad['count']
                    
            for c in p.get('cities', []):
                merged_basic['cities'][c['name']] = merged_basic['cities'].get(c['name'], 0) + c['count']
                
            for e in p.get('educationLevels', []):
                merged_basic['educationLevels'][e['name']] = merged_basic['educationLevels'].get(e['name'], 0) + e['count']
                
            for d in p.get('topDepartments', []):
                merged_basic['topDepartments'][d['name']] = merged_basic['topDepartments'].get(d['name'], 0) + d['val']
                
            for s in p.get('topSchools', []):
                merged_basic['topSchools'][s['name']] = merged_basic['topSchools'].get(s['name'], 0) + s['val']
        else:
            others.append(p)
            
    if basic_count > 0:
        # Convert dicts back to lists
        merged_basic['ageData'] = [{'age': k, 'count': v} for k, v in merged_basic['ageData'].items()]
        merged_basic['cities'] = [{'name': k, 'count': v} for k, v in merged_basic['cities'].items()]
        merged_basic['educationLevels'] = [{'name': k, 'count': v} for k, v in merged_basic['educationLevels'].items()]
        
        # For departments and schools, we sort and take top 5
        deps = [{'name': k, 'val': v} for k, v in merged_basic['topDepartments'].items()]
        merged_basic['topDepartments'] = sorted(deps, key=lambda x: x['val'], reverse=True)[:5]
        
        schools = [{'name': k, 'val': v} for k, v in merged_basic['topSchools'].items()]
        merged_basic['topSchools'] = sorted(schools, key=lambda x: x['val'], reverse=True)[:5]
        
        # Sort ageData if needed, but it's okay.
        # Format age array to maintain order: <18, 18-20, 21-23, 24-26, 27-29, 30+
        age_order = ['<18', '18-20', '21-23', '24-26', '27-29', '30+']
        merged_basic['ageData'] = sorted(merged_basic['ageData'], key=lambda x: age_order.index(x['age']) if x['age'] in age_order else 99)
        
        # Sort cities alphabetically just in case
        merged_basic['cities'] = sorted(merged_basic['cities'], key=lambda x: x['name'])
        
        merged_basic['educationLevels'] = sorted(merged_basic['educationLevels'], key=lambda x: x['count'], reverse=True)
        
        # Only return what's not empty
        result_basic = {k: v for k, v in merged_basic.items() if v}
        result_basic['hasAgeData'] = merged_basic['hasAgeData']
        result_basic['id'] = 'basic-' + merged_basic['name'].split(' ')[1]
        
        return [result_basic] + others
    return others

# Need to parse the typescript file somehow or just do it via string manipulation.
# Let's read App.tsx, extract the yearlyData json structure.
import re

def process_app_tsx():
    with open('src/App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We will just write a python script to parse the javascript object and output the new merged objects.
    # It's easier if we just write a Node script!
    pass

if __name__ == '__main__':
    process_app_tsx()

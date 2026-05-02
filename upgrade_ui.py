import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Update main container and add background gradient
old_main = '<div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 relative">'
new_main = '''<div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-blue-100 relative">
      {/* Global premium background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-slate-50/20 to-slate-50/20 transition-colors duration-1000"></div>'''
content = content.replace(old_main, new_main)

# 2. Update hero text gradient
content = content.replace('className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 selection:text-blue-700"', 'className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 selection:text-blue-700 drop-shadow-sm"')

# 3. Update standard cards to frosted glass
glass_class = "bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"

# Map of old class fragments to new class fragments
replacements = [
    ('bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100', f'{glass_class} rounded-[2rem] lg:rounded-[2.5rem] border'),
    ('"bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100', f'"{glass_class} rounded-[2rem] lg:rounded-[2.5rem] border'),
    ('bg-white rounded-[2rem] lg:rounded-[3rem] border border-slate-100 shadow-sm', f'{glass_class} rounded-[2rem] lg:rounded-[3rem] border'),
    ('bg-white rounded-[2rem] lg:rounded-[3rem] border border-slate-200 p-8 md:p-12 shadow-sm', f'{glass_class} rounded-[2rem] lg:rounded-[3rem] border p-8 md:p-12'),
    ('bg-slate-50/50 rounded-2xl border border-slate-100', 'bg-white/50 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Upgrade applied.")

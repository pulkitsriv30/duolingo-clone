import sqlite3
import json
conn = sqlite3.connect('duolingo.db')
cur = conn.cursor()
cur.execute("SELECT options FROM exercises WHERE type='match_pairs'")
row = cur.fetchone()
print(repr(row[0]))
conn.close()

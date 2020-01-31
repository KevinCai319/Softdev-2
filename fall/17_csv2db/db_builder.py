#Kevin Cai
#SoftDev
#skeleton :: SQLITE3 BASICS
#Oct 2019

import sqlite3   #enable control of an sqlite database
import csv       #facilitate CSV I/O


DB_FILE="discobandit.db"
COURSE_FILE = "courses.csv";
STUDENT_FILE = "students.csv";

db = sqlite3.connect(DB_FILE) #open if file exists, otherwise create
c = db.cursor()               #facilitate db ops

#==========================================================
c.execute("DROP TABLE IF EXISTS courses")
c.execute("DROP TABLE IF EXISTS students")
# < < < INSERT YOUR POPULATE-THE-DB CODE HERE > > >
with open(STUDENT_FILE, newline='') as csvfile:
     reader = csv.DictReader(csvfile)
     test = "CREATE TABLE students (name TEXT,age INTEGER, id INTEGER);"
     c.execute(test)
     for row in reader:
         #test = "INSERT INTO students VALUES (?, ?, ?)"
         #+ str(row["name"])+"," + str(row["age"]) + "," + str(row["id"],) + ");"
         c.execute("INSERT INTO students VALUES (?, ?, ?)", (row["name"], row["age"], row["id"]))

c.execute("SELECT * FROM students;")

with open(COURSE_FILE, newline='') as csvfile:
      reader = csv.DictReader(csvfile)
      #headers = next(reader)
      #print(headers)
      test = "CREATE TABLE courses (code TEXT,mark INTEGER, id INTEGER);"
      c.execute(test)
      for row in reader:
          #test = "INSERT INTO courses VALUES ("+ str(row["code"], ) + str(row["mark"], ) + str(row["id"],) + ");"
          c.execute("INSERT INTO courses VALUES (?, ?, ?)", (row["code"], row["mark"], row["id"]))
        #print(row)
c.execute("SELECT * FROM courses;")
#c.execute(command)

#==========================================================

db.commit() #save changes
db.close()  #close database#Clyde "Thluffy" Sinclair

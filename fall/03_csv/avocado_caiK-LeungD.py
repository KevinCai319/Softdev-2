import csv
import random;
occupations = {}
def read_input():
  with open('occupations.csv', mode='r') as file:
    reader = csv.DictReader(file,delimiter=',')
    for row in reader:
      occupations.update({row['Job Class']: float(row['Percentage'])})
def print_occupations():
  for i in occupations:
    print(i+":"+str(occupations[i]));
def get_random_occupation():
  i = occupations["Total"];
  for j in occupations:
    if(random.random() < occupations[j]/i):
      return j;
    i-= occupations[j];

read_input();
#print_occupations();
print(get_random_occupation());

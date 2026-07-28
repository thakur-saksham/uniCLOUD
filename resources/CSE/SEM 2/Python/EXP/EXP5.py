'''
1.	Scan n values in range 0-3 and print the number of times each value has occurred from given set of lisst

list2=[0,0,1,2,3,0,1,2,3,3,2,1,0,0,1]
n=int(input("Enter the number of values to scan (0-3): "))
count0=0
count1=0
count2=0
count3=0
for i in range(n):
    val=int(input("Enter value (0-3): "))
    if val==0:
        count0+=1
    elif val==1:
        count1+=1
    elif val==2:
        count2+=1
    elif val==3:
        count3+=1
    else:
        print("Invalid input, please enter a value between 0 and 3.")
print('\n')
print("Occurrences of 0:", count0)
print("Occurrences of 1:", count1)
print("Occurrences of 2:", count2)
print("Occurrences of 3:", count3)
print('\n')
'''
'''
#2.reate a tuple to store n numeric values and find average of all values.


values=()
n=int(input("Enter the number of values to store in tuple: "))
for i in range(n):
    val=float(input(f"Enter value {i+1}: "))
    values+=(val,)
average=sum(values)/n
print("Average of the values in tuple:", average)
print('\n')
'''

'''
#3.	WAP to input a list of scores for N students in a list data type. Find the score of the runner-up and print the output. Sample Input N = 5 Scores= 2 3 6 6 5 Sample output 5 Note: Given list is [2, 3, 6, 6, 5]. The maximum score is 6, second maximum is 5. Hence, we print 5 as the runner-up score.

scores=[]
n=int(input("Enter the number of students: "))
for i in range(n):
    score=int(input(f"Enter score for student {i+1}: "))
    scores.append(score)
unique_scores=set(scores)
unique_scores.remove(max(unique_scores))
runner_up=max(unique_scores)
print("The runner-up score is:", runner_up)
'''

#4.Create a dictionary of n persons where key is name and value is city. 
#a) Display all names
#b) Display all city names
#c) Display student name and city of all students.
#d) Count number of students in each city

persons={}
n=int(input("Enter the number of persons: "))
for i in range(n):
    name=input(f"Enter name of person {i+1}: ")
    city=input(f"Enter city of person {i+1}: ")
    persons[name]=city 
print('\n')

print("All names:", list(persons.keys()))  #a

print("All cities:", list(persons.values())) #b
print('\n')

for name, city in persons.items():  #c
    print(f"Name: {name}, City: {city}")
print('\n')

city_count = {}  #d
cities = list(persons.values())   
i = 0
while i < len(cities):
    city = cities[i]
    
    if city in city_count:
        city_count[city] += 1
    else:
        city_count[city] = 1
    i += 1
print("Number of students in each city:")
for city in city_count:
    print(city, ":", city_count[city])
print('\n')


#5.Store details of n movies in a dictionary by taking input from the user. Each movie must store details like name,  year, director name, production cost, collection made (earning) & perform the following :-
#a)	print all movie details
#b)	display name of movies released before 2015
#c)	print movies that made a profit.
#d)	print movies directed by a particular director.

movies={}
n=int(input("Enter the number of movies: "))
for i in range(n):
    name=input(f"Enter name of movie: ")
    year=int(input(f"Enter release year of movie : "))
    director=input(f"Enter director name of movie: ")
    cost=float(input(f"Enter production cost of movie: "))
    earnings=float(input(f"Enter collection made (earning) of movie: "))
    movies[name]={"year": year, "director": director, "cost": cost, "earnings": earnings} 
print('\n')
print("All movie details:")
for name, details in movies.items():
    print(f"Name: {name}, Year: {details['year']}, Director: {details['director']}, Cost: {details['cost']}, Earnings: {details['earnings']}")
print('\n')

print("Movies released before 2015:")
for name, details in movies.items():
    if details['year'] < 2015:
        print(name)
print('\n')

print("Movies that made a profit:")
for name, details in movies.items():
    if details['earnings'] > details['cost']:
        print(name)
print('\n')

director_name=input("Enter director name to find movies directed by them: ")
print(f"Movies directed by {director_name}:")
for name, details in movies.items():
    if details['director'] == director_name:
        print(name)
print('\n')

#6.Create a contact book where users can store, search, update, and delete contacts. Use dictionary for storing contacts without using def

contact_book={}
contanct_name=input("Enter contact name: ")
contact_number=input("Enter contact number: ")
contact_book[contanct_name]=contact_number
print("Contact book:", contact_book)
print('\n')
search_name=input("Enter contact name to search: ")
if search_name in contact_book:
    print(f"Contact found: {search_name} - {contact_book[search_name]}")
else:
    print("Contact not found.")
print('\n')
update_name=input("Enter contact name to update: ")
if update_name in contact_book:
    new_number=input("Enter new contact number: ")
    contact_book[update_name]=new_number
    print(f"Contact updated: {update_name} - {contact_book[update_name]}")
else:
    print("Contact not found.")
print('\n')
delete_name=input("Enter contact name to delete: ")
if delete_name in contact_book:
    del contact_book[delete_name]
    print(f"Contact deleted: {delete_name}")
else:
    print("Contact not found.")
print("Updated contact book:", contact_book)

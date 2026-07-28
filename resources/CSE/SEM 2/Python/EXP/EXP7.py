#1.	Add few names, one name in each row, in “name.txt file”.
#a.	Count no of names
#b.	Count all names starting with vowel
#c.	Find longest name

# Open file and read names
with open("C:\\Users\\ASUS\\OneDrive\\Desktop\\UPES\\Python\\PYTHON_LAB\\EXP\\name.txt", "r") as f:
    names = f.read().splitlines()

# a) Count number of names
print("Total names:", len(names))

# b) Count names starting with vowel
vowels = ('A','E','I','O','U','a','e','i','o','u')
count_vowel = 0

for name in names:
    if name.startswith(vowels):
        count_vowel += 1

print("Names starting with vowel:", count_vowel)

# c) Find longest name
longest = max(names, key=len)
print("Longest name:", longest)

print("\n")

#2.	Store integers in a file.
#a.	Find the max number
#b.	Find average of all numbers
#c.	Count number of numbers greater than 100
with open("C:\\Users\\ASUS\\OneDrive\\Desktop\\UPES\\Python\\PYTHON_LAB\\EXP\\numbers.txt", "r") as f:
    nums = [int(i.strip()) for i in f]

# a) Max number
print("Maximum number:", max(nums))

# b) Average
avg = sum(nums) / len(nums)
print("Average:", avg)

# c) Numbers greater than 100
count = 0
for n in nums:
    if n > 100:
        count += 1

print("Numbers greater than 100:", count)
print("\n")

#3.	Assume a file city.txt with details of 5 cities in given format (cityname population(in lakhs) area(in sq KM) ):
#Example:
#Dehradun 5.78 308.20
#Delhi 190 1484
#……………
#Open file city.txt and read to:
#a.	Display details of all cities
#b.	Display city names with population more than 10Lakhs
#c.	Display sum of areas of all cities

with open("C:\\Users\\ASUS\\OneDrive\\Desktop\\UPES\\Python\\PYTHON_LAB\\EXP\\city.txt", "r") as f:
    lines = f.readlines()

total_area = 0

print("City Details:")

for line in lines:
    city, population, area = line.split()
    population = float(population)
    area = float(area)

    # a) Display details
    print(city, population, area)

    # b) Population more than 10 lakhs
    if population > 10:
        print("Population >10L:", city)

    # c) Sum of areas
    total_area += area

print("Total Area:", total_area)
print("\n")


#Input two values from user where the first line contains N, the number of test cases. The next N lines contain the space separated values of a and b. Perform integer division and print a/b. Handle exception in case of ZeroDivisionError or ValueError. 
#Sample input
#1 0
#2 $
#3 1 
#Sample Output :
#Error Code: integer division or modulo by zero 
#Error Code: invalid literal for int() with base 10: '$' 3

n = int(input("Enter number of test cases: "))

for i in range(n):
    try:
        a, b = input().split()
        a = int(a)
        b = int(b)

        print(a // b)

    except ZeroDivisionError as e:
        print("Error Code:", e)

    except ValueError as e:
        print("Error Code:", e)
print("\n")
    
        
#5.	Create multiple suitable exceptions for a file handling program
try:
    file = open("data.txt", "r")
    data = file.read()
    print(data)

except FileNotFoundError:
    print("Error: File not found")

except PermissionError:
    print("Error: Permission denied")

except IOError:
    print("Error: Input Output error")

finally:
    print("Program finished")
print("\n")
   
    
#6.	Write a program to create a counter to show that how many times the program is executed.
try:
    with open("counter.txt", "r") as f:
        count = int(f.read())

except FileNotFoundError:
    count = 0

count += 1

with open("counter.txt", "w") as f:
    f.write(str(count))

print("Program executed", count, "times")
print("\n")


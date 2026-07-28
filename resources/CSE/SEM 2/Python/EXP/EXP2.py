#1
x=15
if x%3==0 and x%5==0:
    print("Divisible by both 3 and 5 \n")
else:
    print("Not divisible by 3 and 5 \n")
    
#2
a=20
if a%5:
    print(f"{a} is divisible by 5 \n")
    
#3
s=20
y=30
if s>y:
    print(f"The greatest number is {s} \n")
else:
    print(f"The greatest number is {y} \n")
if s==y:
    print("Both the numbers are equal \n")
    
#4
no1=20
no2=50
no3=10

if no1>no2 and no1>no3:
    print(f"The greatest number is {no1} \n")
elif no2>no1 and no2>no3:
    print(f"The greatest number is {no2} \n")
else:
    print(f"The greatest number is {no3} \n")
    
#5
a = 1
b = -5
c = 6

D = b*b - 4*a*c

if D > 0:
    root1 = (-b + D**0.5) / (2*a)
    root2 = (-b - D**0.5) / (2*a)
    print("Roots are real and different")
    print("Root 1:", root1)
    print("Root 2:", root2,"\n")

elif D == 0:
    root = -b / (2*a)
    print("Roots are real and equal")
    print("Root: \n", root)

else:
    real = -b / (2*a)
    imag = (-D)**0.5 / (2*a)
    print("Roots are imaginary ")
    print("Root 1:", real, "+", imag, "i")
    print("Root 2:", real, "-", imag, "i \n")

    
    
#6
year = int(input("Enter a year: "))

if (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):
    print(year, "is a leap year \n")
else:
    print(year, "is not a leap year \n")
    
    
#7
day = int(input("Enter the day: "))
month = int(input("Enter the month: "))
year = int(input("Enter the year: "))

if month > 12 or month < 1:
    print("Invalid month")
    exit()

if month == 2:
    md = 28
elif month in (4, 6, 9, 11):
    md = 30
else:
    md = 31

day = day + 1

if day > md:
    day = 1
    month = month + 1

    if month > 12:
        month = 1
        year = year + 1

print(f"Next date is: {day}/{month}/{year}")


#8
name = "Rohit Sharma"
roll_no = "R17234512"
sap_id = "50005673"
sem = "1"
course = "B.Tech.CSE AI&ML"

print("\nEnter Marks for 5 Subjects (out of 100):")
pds = 70
python_marks = 80
chemistry = 90
english = 60
physics = 50

total_marks = pds + python_marks + chemistry + english + physics
percentage = (total_marks / 500) * 100
cgpa = percentage / 10

if 0 <= cgpa <= 3.4:
    grade = "F"
elif 3.5 <= cgpa <= 5.0:
    grade = "C+"
elif 5.1 <= cgpa <= 6.0:
    grade = "B"
elif 6.1 <= cgpa <= 7.0:
    grade = "B+"
elif 7.1 <= cgpa <= 8.0:
    grade = "A"
elif 8.1 <= cgpa <= 9.0:
    grade = "A+"
elif 9.1 <= cgpa <= 10.0:
    grade = "O (Outstanding)"
else:
    grade = "Invalid CGPA"

print("\n" + "================================================")
print("       GRADE SHEET")
print("=====================================================")
print(f"Name: {name}")
print(f"Roll Number: {roll_no}")
print(f" APID: {sap_id}")
print(f"Sem: {sem}")
print(f"Course: {course}")
print("--------------------------------------------------------")
print(f"Subject Name:        Marks")
print(f"PDS:                 {pds}")
print(f"Python:              {python_marks}")
print(f"Chemistry:           {chemistry}")
print(f"English:             {english}")
print(f"Physics:             {physics}")
print("-----------------------------------------------------------")
print(f"Percentage: {percentage}%")
print(f"CGPA: {cgpa:.1f}")
print(f"Grade: {grade}")
#2
age=18
print(age,type(age),"\n")

#3
x="Hello"
print(x,"\n")

#4
s="helllo"
t=36
u=20.5
v=("upes","dehradun")
print(type(s),type(t),type(u),type(v),"\n")

#5
x=9
y=7
z=x+y
print(z)
z=x-y
print(z)
z=x*y
print(z,"\n")

#6
l=3
k=4
m=(l**2+k**2)
p=m**0.5
print(f"The length of the hypotenuse is {p}\n")

#7
principal=100
rate=5
time=2
simple_interest=principal*rate*time/100
print(simple_interest,"\n")

#8
length1=10
length2=20
length3=30
area=3*(length1+length2+length3)
print(area,"\n")

#9
time_in_seconds=72650
hours=time_in_seconds//3600
print(f"the time in hours is:{hours}\n")
minutes=time_in_seconds//60
print(f"The given time in minutes is:{minutes}")


#10
a = 5
b = 10
a = a + b
b = a - b
a = a - b
print("After swapping:")
print("a =", a)
print("b =", b,"\n")

#11
no = int(input("Enter a number: "))
sum= no * (no + 1) // 2
print("Sum of first", no, "natural numbers is:", sum)

#12	Write a program to print truth table for bitwise operators (&, | and ^ operators)
print("A\tB\tA&B\tA|B\tA^B")
for A in [0, 1]:    
    for B in [0, 1]:
        print(f"{A}\t{B}\t{A & B}\t{A | B}\t{A ^ B}")

#13.	Write a program to find left shift and right shift values of a given number
num = int(input("Enter a number: "))
left_shift = num << 2
right_shift = num >> 2
print("Left shift of", num, "by 2 is:", left_shift)
print("Right shift of", num, "by 2 is:", right_shift)

#14
given = (10, 20, 56, 78, 89)
num = int(input("Enter a number: "))

if num in given:
    print(num, "is present in the sequence")
else:
    print(num, "is not present in the sequence")


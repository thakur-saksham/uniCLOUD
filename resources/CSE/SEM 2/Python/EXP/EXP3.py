#1
num=int(input("Enter a number to find the factorial: "))
fact=1
while num>0:
    fact=fact*num
    num=num-1
print("Factorial is: \n",fact )


#2.	Find whether the given number is Armstrong number.
num=int(input("Enter a number to check if it is an Armstrong number: "))
sum=0
a=num
while a>0:
    digit=a%10 
    sum+=digit**3
    a//=10
if sum==num:
    print(num,"is an Armstrong number \n")
else:
    print(num,"is not an Armstrong number \n")


#3.	Print Fibonacci series up to n terms.
n=int(input("Enter number of terms for fibonacci series: "))
a,b=0,1 
i=0 
while i<n:
    print(a)
    a,b=b,a+b
    i+=1
print("\n")
    
    
#4.	find the given number is prime or not.
num=int(input("Enter a number to find prime or not: "))
if num>1:
    for i in range(2,num):
        if(num%i)==0:
            print(num,"is not a prime number \n")
            break
    else:
        print(num,"is a prime number \n")


#5 Check whether given number is palindrome or not
num=int(input("Enter a number to check if it is palindrome: "))
temp=num
rev=0
while temp>0:
    digit=temp%10
    rev=rev*10+digit
    temp//=10
if num==rev:
    print(num,"is a palindrome number \n")
else:
    print(num,"is not a palindrome number \n")
 
    
#6.	Write a program to print sum of digits.
num=int(input("Enter a number to find sum of digits: "))
sum=0
while num>0:
    digit=num%10
    sum+=digit
    num//=10
print("Sum of digits is: \n",sum)


#7.	Count and print all numbers divisible by 5 or 7 between 1 to 100
count=0
for i in range(1,101):
    if i%5==0 or i%7==0:
        print(i)
        count+=1
print("Total count of numbers divisible by 5 or 7 between 1 to 100 is: \n",count)


#8Convert all lower cases to upper case in a string.
string=input("Enter a string to convert to uppercase:\n ")
print(string.upper())



#9.	Print the table for a given number: 

num=int(input("Enter a number to print its table: \n"))
for i in range(1,11):
    print(num,"*",i,"=",num*i,"\n")


#10.Write a program to print the following pattern 123454321 1234 * 4321 123 ** 321 12 *** 21 1 **** 1 python code using loops
for i in range(1,6):
    for j in range(1,6-i):
        print(j,end=" ")
    for k in range(1,i):
        print("*",end=" ")
    for l in range(5-i,0,-1):
        print(l,end=" ")
    print()
    
#11.	Write a program to print the sum of the following series 1+ ½ + 1/3 + ¼ +….+1/n
n=int(input("Enter the value of n to find sum of series 1 + 1/2 + 1/3 + ... + 1/n: "))
sum=0
for i in range(1,n+1):
    sum+=1/i
print("Sum of the series is: \n",sum)

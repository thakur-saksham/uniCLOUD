#1.	Write a Python function to find the maximum and minimum numbers from a sequence of numbers. EASY CODE without min and max and use 0 to0
def find_max_min(numbers):

    max_num = numbers[0]
    min_num = numbers[0]

    for num in numbers:
        if num > max_num:
            max_num = num
        if num < min_num:
            min_num = num

    return max_num, min_num
# Example usage
numbers = [3, 1, 4, 1, 5, 9,0]
max_value, min_value = find_max_min(numbers)
print(f"Maximum number: {max_value}")
print(f"Minimum number: {min_value}")


#2.	Write a Python function that takes a positive integer and returns the sum of the cube of all the positive integers smaller than the specified number
def sum_of_cubes(n):
    if n <= 0:
        return 0  

    total_sum = 0
    for i in range(1, n):
        total_sum += i ** 3
    return total_sum
number = 5
result = sum_of_cubes(number)
print(f"The sum of the cubes of all positive integers smaller than {number} is: {result}")

#3.	Write a Python function to print 1 to n using recursion
def print_numbers(n):
    if n > 0:
        print_numbers(n - 1)  
        print(n)
number = 5
print_numbers(number)

#4.	Write a recursive function to print Fibonacci series upto n terms.
def recur_fibo(n):
   if n <= 1:
       return n
   else:
       return(recur_fibo(n-1) + recur_fibo(n-2))

nterms = 10

if nterms <= 0:
   print("Plese enter a positive integer")
else:
   print("Fibonacci sequence:")
   for i in range(nterms):
       print(recur_fibo(i))


#5.	Write a lambda function to find volume of cone.
volume_of_cone=lambda r:4/3*3.14*r*r*r
print(volume_of_cone(1))

#6.	Write a lambda function which gives tuple of max and min from a list. Sample input: [10, 6, 8, 90, 12, 56] Sample output: (90,6)
list=[10,6,8,90,12,56]
minimum=lambda x:min(x)
maximum=lambda x:max(x)
print((maximum(list),minimum(list)))

#7.	Write functions to explain mentioned concepts: a.	Keyword argument b.	Default argument c.	Variable length argument
# a. Keyword argument
def greet(name, message):
    print(f"{message}, {name}!")
greet(name="Alice", message="Hello")
# b. Default argument
def greet(name, message="Hello"):
    print(f"{message}, {name}!")
greet("Bob")
greet("Charlie", "Hi")
# c. Variable length argument
def sum_numbers(*args):
    total = sum(args)
    print(f"The sum of the numbers is: {total}")
sum_numbers(1, 2, 3)


#8.	Write a program to check whether all the values in a dictionary are same or not using lambda function 
my_dict = {'a': 1, 'b': 1, 'c': 1}
all_same = lambda d: len(set(d.values())) == 1
print(all_same(my_dict))  # Output: True

#9.	Write a program to create two lists and generate a dictionary with keys from list1 and values from list2.
list1 = ['a', 'b', 'c']
list2 = [1, 2, 3]
my_dict = {}
for i in range(len(list1)):
    my_dict[list1[i]] = list2[i]
print(my_dict)


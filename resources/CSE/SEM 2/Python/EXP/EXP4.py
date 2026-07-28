#1.Write a program to count and display the number of capital letters in a given string.
s="HeLLo WorlD"
capital_letters=0
for i in range(len(s)):
    if s[i].isupper():
        capital_letters+=1
print("Number of capital letters in the string is:",capital_letters)
print('\n')

#2.Count total number of vowels in a given string.
string="The fox jumps over the lazy dog"
vowels="aeiouAEIOU"
vowel_count=0
for i in string:
    if i in vowels:
        vowel_count+=1
print("Total number of vowels in the string is:",vowel_count)
#3.Input a sentence and print words in separate lines.
s="Hello, My name is Saksham Thakur"
words=s.split() 
for i in range(len(words)):
    print(words[i]) 
print('\n')

#4.WAP to enter a string and a substring. You have to print the number of times that the substring occurs in the given string. String traversal will take place from left to right, not from right to left easy code  basic
string = input("Enter the string: ")
substring = input("Enter the substring: ")
count = string.count(substring)
print("Number of occurrences:", count)
print('\n')

#5.Given a string containing both upper and lower case alphabets. Write a Python program to count the number of occurrences of each alphabet (case insensitive) and display the same.Sample InputABaBCbGcSample using list and count
s = input("Enter a string: ")
s = s.upper()
char_list = list(s)
while len(char_list) > 0:
    ch = char_list[0]  
    
    if ch.isalpha():
        print(char_list.count(ch), ch)
    
    while ch in char_list:
        char_list.remove(ch)
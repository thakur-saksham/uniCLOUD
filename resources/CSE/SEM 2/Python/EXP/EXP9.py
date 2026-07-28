#1. Create a class of student (name, sap id, marks[phy,chem,maths] ). Create 3 objects by taking inputs from the user and display details of all students.
class Student:
    def __init__(self):
        self.name = ""
        self.sap_id = 0
        self.marks = [0, 0, 0] 

    def studata(self):
        self.name = input("Enter Name: ")
        self.sap_id = int(input("Enter SAP ID: "))
        print("Enter marks (Physics, Chemistry, Maths):")
        self.marks[0] = int(input("Physics: "))
        self.marks[1] = int(input("Chemistry: "))
        self.marks[2] = int(input("Maths: "))

    def display(self):
        print("\nName:", self.name)
        print("SAP ID:", self.sap_id)
        print("Physics:", self.marks[0])
        print("Chemistry:", self.marks[1])
        print("Maths:", self.marks[2])

students = []

print("Enter details of 3 students:\n")

for i in range(3):
    print(f"\nStudent {i+1}:")
    s = Student()
    s.studata()
    students.append(s)

print("\nStudent details:")

for s in students:
    s.display()


# #2.Add constructor in the above class to initialize student details of n students and implement following methods:
# a)	Display() student details
# b)	Find Marks_percentage() of each student
# c)	 Display result() [Note: if marks in each subject >40% than Pass else Fail]
# d)	Write a Function to find average of the class.
class Student:
    def __init__(self, name, sap_id, marks):
        self.name = name
        self.sap_id = sap_id
        self.marks = marks

    def display(self):
        print("\nName:", self.name)
        print("SAP ID:", self.sap_id)
        print("Marks:", self.marks)

    def marks_percentage(self):
        total_marks = sum(self.marks)
        percentage = (total_marks / 300) * 100
        return percentage

    def result(self):
        if all(mark > 40 for mark in self.marks):
            return "Pass"
        else:
            return "Fail"


#3.Create programs to implement different types of inheritances.

#Single Inheritance
class Parent:
    def show_parent(self):
        print("This is Parent class")

class Child(Parent):
    def show_child(self):
        print("This is Child class")

obj = Child()
obj.show_parent()
obj.show_child()


#Multiple Inheritance
class Father:
    def show_father(self):
        print("Father's class")

class Mother:
    def show_mother(self):
        print("Mother's class")

class Son(Father, Mother):
    def show_child(self):
        print("Child class")

obj = Son()
obj.show_father()
obj.show_mother()
obj.show_child()


#Multilevel Inheritance
class Grandparent:
    def fun1(self):
        print("I am the Grandparent.")

class Parent(Grandparent):
    def fun2(self):
        print("I am the Parent.")

class Child(Parent):
    def fun3(self):
        print("I am the Child.")

obj = Child()
obj.fun1()
obj.fun2()
obj.fun3()


#Heirarchial Inheritance
class Parent:
    def func1(self):
        print("This function is in parent class.")

class Child1(Parent):
    def func2(self):
        print("This function is in child 1.")

class Child2(Parent):
    def func3(self):
        print("This function is in child 2.")

object1 = Child1()
object2 = Child2()

object1.func1()
object1.func2()
object2.func1()
object2.func3()


#4. Create a class to implement method Overriding.
class Parent:
    def hello(self):
        print("Hello from Parent class")

class Child(Parent):
    def hello(self):
        print("Hello from Child class (Overridden)")
obj = Child()
obj.hello()

#
#1.	Create a simple Tkinter window with a title and fixed size.
import tkinter as tk
root=tk.Tk()
root.title("My Window")
root.geometry("400x300")
root.mainloop()


# 2.	Design a GUI based basic calculator for performing basic arithmetic operations.
import tkinter as tk
def add():
    num1 = float(entry1.get())
    num2 = float(entry2.get())
    result = num1 + num2
    label_result.config(text="Result: " + str(result))
def subtract():
    num1 = float(entry1.get())
    num2 = float(entry2.get())
    result = num1 - num2
    label_result.config(text="Result: " + str(result))
def multiply():
    num1 = float(entry1.get())
    num2 = float(entry2.get())
    result = num1 * num2
    label_result.config(text="Result: " + str(result))
def divide():
    num1 = float(entry1.get())
    num2 = float(entry2.get())
    if num2 != 0:
        result = num1 / num2
        label_result.config(text="Result: " + str(result))
    else:
        label_result.config(text="Error: Division by zero")
root = tk.Tk()
root.title("Basic Calculator")
entry1 = tk.Entry(root)
entry1.pack()
entry2 = tk.Entry(root)
entry2.pack()
button_add = tk.Button(root, text="Add", command=add)
button_add.pack()
button_subtract = tk.Button(root, text="Subtract", command=subtract)
button_subtract.pack()
button_multiply = tk.Button(root, text="Multiply", command=multiply)
button_multiply.pack()
button_divide = tk.Button(root, text="Divide", command=divide)
button_divide.pack()
label_result = tk.Label(root, text="Result: ")
label_result.pack()
root.mainloop()

# 3.	Design a GUI for student registration for a course  and store these details in a database. Use Tkinter for UI, SQLite/MySQL for database storage.
import tkinter as tk
def register():
    name = entry_name.get()
    sap_id = entry_sap_id.get()
    marks = entry_marks.get()
    label_result.config(text=f"Registered: {name}, SAP ID: {sap_id}, Marks: {marks}")
root = tk.Tk()
root.title("Student Registration")
label_name = tk.Label(root, text="Name:")
label_name.pack()
entry_name = tk.Entry(root)
entry_name.pack()
label_sap_id = tk.Label(root, text="SAP ID:")
label_sap_id.pack()
entry_sap_id = tk.Entry(root)
entry_sap_id.pack()
label_marks = tk.Label(root, text="Marks:")
label_marks.pack()
entry_marks = tk.Entry(root)
entry_marks.pack()
button_register = tk.Button(root, text="Register", command=register)
button_register.pack()
label_result = tk.Label(root, text="")
label_result.pack()
root.mainloop()

# 4.	Create a GUI based task manager where users can add, edit and remove tasks. Use Tkinter (buttons, listbox) , SQLite/MySQL (task storage).

import tkinter as tk
def add_task():
    task = entry_task.get()
    if task:
        listbox_tasks.insert(tk.END, task)
        entry_task.delete(0, tk.END)
def delete_task():
    selected_task_index = listbox_tasks.curselection()
    if selected_task_index:
        listbox_tasks.delete(selected_task_index)
def edit_task():
    selected_task_index = listbox_tasks.curselection()
    if selected_task_index:
        new_task = entry_task.get()
        if new_task:
            listbox_tasks.delete(selected_task_index)
            listbox_tasks.insert(selected_task_index, new_task)
            entry_task.delete(0, tk.END)
root = tk.Tk()
root.title("Task Manager")
entry_task = tk.Entry(root)
entry_task.pack()
button_add = tk.Button(root, text="Add Task", command=add_task)
button_add.pack()
button_delete = tk.Button(root, text="Delete Task", command=delete_task)
button_delete.pack()
button_edit = tk.Button(root, text="Edit Task", command=edit_task)
button_edit.pack()
listbox_tasks = tk.Listbox(root)
listbox_tasks.pack()
root.mainloop()

# 5.	Design a login and signup authentication system.
import tkinter as tk
def login():
    username = entry_username.get()
    password = entry_password.get()
    label_result.config(text=f"Login attempted with Username: {username} and Password: {password}")
def signup():
    username = entry_username.get()
    password = entry_password.get()
    label_result.config(text=f"Signup attempted with Username: {username} and Password: {password}")
root = tk.Tk()
root.title("Login and Signup")
label_username = tk.Label(root, text="Username:")
label_username.pack()
entry_username = tk.Entry(root)
entry_username.pack()
label_password = tk.Label(root, text="Password:")
label_password.pack()
entry_password = tk.Entry(root)
entry_password.pack()
button_login = tk.Button(root, text="Login", command=login)
button_login.pack()
button_signup = tk.Button(root, text="Signup", command=signup)
button_signup.pack()
label_result = tk.Label(root, text="")
label_result.pack()
root.mainloop()

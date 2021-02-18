import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export  type FilterValuesType = "All" | "Active" | "Completed"

function App() {
    //BLL
    const todoListId1 = v1()
    const todoListId2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: 'All'},
        {id: todoListId2, title: "What to learn", filter: 'All'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>(
        {
            [todoListId1]: [
                {id: v1(), title: "milk&CSS", isDone: false},
                {id: v1(), title: "bread", isDone: true},
                {id: v1(), title: "water", isDone: false}
            ],
            [todoListId2]: [
                {id: v1(), title: "bll", isDone: false},
                {id: v1(), title: "ui", isDone: true},
                {id: v1(), title: "sql", isDone: false}
            ]
        }
    )


    function changeFilter(filterValues: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = filterValues
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskId: string, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskId
        )
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskId
        )
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId, title: title, filter: "All"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})


    }

    function changeTodoListTitle(title: string, todoListId: string) {
        const TodolistTitle = todoLists.find(tl => tl.id === todoListId)
        if (TodolistTitle) {
            TodolistTitle.title = title
            setTodoLists([...todoLists])
        }
    }

    const todoListContainer = todoLists.map(tl => {
            let taskForTodoList = tasks[tl.id]
            if (tl.filter === "Active") {
                taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)
            }
            if (tl.filter === "Completed") {
                taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
            }
            return (
                <Grid item key={tl.id}>
                    <Paper style={{padding: '20px'}}><Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    /></Paper></Grid>
            )
        }
    )
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListContainer}
                </Grid>
            </Container>
        </div>
    )
}

export default App;

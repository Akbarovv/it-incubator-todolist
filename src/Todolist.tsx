import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filterValues: FilterValuesType, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

}


export function Todolist(props: PropsType) {


    const tasks = props.tasks.map(taskObj => {
        const removeTask = () => {
            props.removeTask(taskObj.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(taskObj.id, title, props.id)
        }

        return (
            <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
                <Checkbox checked={taskObj.isDone}
                          onChange={changeStatus}
                          color={"primary"}/>
                <EditableSpan title={taskObj.title} changeItem={changeTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const addTask = (title: string) => props.addTask(title, props.id)
    const AllClickHandler = () => props.changeFilter("All", props.id)
    const ActiveClickHandler = () => props.changeFilter("Active", props.id)
    const CompletedClickHandler = () => props.changeFilter("Completed", props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    return <div>
        <h3><EditableSpan title={props.title} changeItem={changeTodoListTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle:"none", paddingLeft:"0"}}>{tasks}</ul>
        <div>
            <Button
                color={props.filter === "All" ? "secondary" : "primary"}
                size={"small"}
                variant={"contained"}
                onClick={AllClickHandler}
            >All
            </Button>
            <Button
                color={props.filter === "Active" ? "secondary" : "primary"}
                size={"small"}
                variant={"contained"}
                onClick={ActiveClickHandler}
            >Active
            </Button>
            <Button
                color={props.filter === "Completed" ? "secondary" : "primary"}
                size={"small"}
                variant={"contained"}
                onClick={CompletedClickHandler}
            >Completed
            </Button>
        </div>
    </div>
}
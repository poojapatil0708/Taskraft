const { Task } = require('../types');
const { Request, Response } = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require("../services/task")

exports.createNewTask = (req: typeof Request, res: typeof Response) => {
    createTask(req.body)
        .then((newTask: typeof Task) => res.status(200).send(newTask))
        .catch((err: any) => res.status(400).send(err))
}

exports.getUserTasks = (req: typeof Request, res: typeof Response) => {
    getTasks({ user: req.user_id })
        .then((allTasks: [typeof Task]) => res.status(200).send(allTasks))
        .catch((err: any) => res.status(400).send({ message: 'error fetching tasks', err }))
}

exports.editTask = (req: typeof Request, res: typeof Response) => {
    updateTask(req.params.id, req.body)
        .then((updatedTask: typeof Task) => res.status(200).send(updatedTask))
        .catch((err: any) => res.status(400).send({ message: 'error updating tasks', err }))
}

exports.removeTask = (req: typeof Request, res: typeof Response) => {
    deleteTask(req.params.id)
        .then(() => res.status(200).send({ message: 'Task deleted successfully' }))
        .catch((err: any) => res.status(400).send({ message: 'error deleting tasks', err }))
}

export { };
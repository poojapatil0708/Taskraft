const { Task: TaskType } = require('../types');
const Task = require('../models/task');

exports.createTask = (query: typeof TaskType) => {
    return Task.create(query)
        .then((task: typeof TaskType) => {
            if (!task) throw ({ message: 'Error creating task!' });
            else return task;
        })
        .catch((err: any) => { throw err })
}

exports.getTasks = (query: Partial<typeof TaskType>) => {
    return Task.find(query)
        .then((tasks: typeof TaskType) => tasks)
        .catch((err: any) => { throw err })
}

exports.updateTask = (id: string, data: Partial<typeof TaskType>) => {
    return Task.findByIdAndUpdate(id, data, { new: true })
        .then((updatedTask: typeof TaskType) => {
            if (updatedTask) return updatedTask
            else throw ({ message: 'Task not found' })
        })
        .catch((err: any) => { throw err })
}

exports.deleteTask = (id: string) => {
    return Task.findByIdAndDelete(id)
        .then((res: any) => {
            if (res) return res
            else throw ({ message: 'Task not found' })
        })
        .catch((err: any) => { throw err })
}
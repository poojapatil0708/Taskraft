interface User {
    avatar: string,
    first_name: string,
    last_name: string,
    email: string,
    encry_password: string,
    device_token: string,
    salt: string,
}

interface Task {
    user: string,
    title: string,
    description: string,
    attachments: [string],
    status: string,
}

export { User, Task };
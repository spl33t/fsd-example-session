export type User = {
    login: string,
    token: string
}

//mock
const user: User = {login: "spl33t", token: 'xxxx'}

export const loginApi = async (params: { login: string, password: string }) => {
    if (params.login !== user.login)
        throw new Error('нету юзера')

    return new Promise<User>(resolve => setTimeout(() => {
        resolve(user)
    }, 1000))
}

export const refreshSession = async () => {
    return new Promise<User>(resolve => setTimeout(() => {
        resolve(user)
    }, 1000))
}
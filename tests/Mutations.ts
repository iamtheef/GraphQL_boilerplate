const login = `
mutation login($input:LoginInput!) {
    login(input: $input){
        success
        errors
    }
}`;

const logout = `
mutation logout{
    logout
}`;

const register = `
mutation register($input:RegisterInput!) {
    register(input: $input){
        success
        errors
    }
}`;

export { login, logout, register };

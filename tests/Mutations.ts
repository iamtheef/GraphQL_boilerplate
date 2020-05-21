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

export { login, logout };

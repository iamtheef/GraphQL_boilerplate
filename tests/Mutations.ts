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

const updateAcc = `
mutation updateAcc($input:UserUpdates!) {
    updateAcc(input: $input){
        success
        errors
    }
}`;

const migrateUp = `mutation migrateUp{
    migrateUp
}`;

const migrateDown = `mutation migrateDown{
    migrateDown
}`;
export { login, logout, register, migrateDown, migrateUp, updateAcc };

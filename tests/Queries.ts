const isUserRegistered = `
query isUserRegistered($email:String!) {
    isUserRegistered(email: $email)
}`;

const allUsers = `
query allUsers {
    allUsers{
        id
        email
    }
}`;

const findUser = `
query findUser($input: UserQueryInput!) {
    findUser(input: $input){
        id
        email
        fullName
    }
}`;

export { isUserRegistered, allUsers, findUser };

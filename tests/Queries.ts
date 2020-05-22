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
        isAdmin
    }
}`;

const me = `
query me {
    me {
        id
        email
        fullName
        isAdmin
    }
}`;

const userById = `
query userById($id: ID!) {
    userById (id:$id){
        email
        fullName
        
    }
}`;

export { isUserRegistered, allUsers, findUser, me, userById };

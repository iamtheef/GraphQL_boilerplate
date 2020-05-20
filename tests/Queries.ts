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
query findUser($input: {$email: String!,$fullName: String! }) {
    findUser($email, $fullName){
        id
        email
        fullName
    }
}`;

export { isUserRegistered, allUsers, findUser };

const isUserRegistered = `
query isUserRegistered($email:String!) {
    isUserRegistered(email: $email)
}`;

const allUsers = `
query allUsers() {
    allUsers(){
        name
        email
    }
}`;

export { isUserRegistered };

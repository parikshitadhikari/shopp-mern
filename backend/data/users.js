//this will contain the dummy users
import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        // password for this is 123456, which we hashed using bcryptjs
        password: bcrypt.hashSync('123456', 10), //10 is the salt
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10), //10 is the salt
    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456', 10), //10 is the salt
    },
]
export default users;
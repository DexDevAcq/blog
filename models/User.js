const bcrypt = require('bcrypt');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const DB_LINK_USERS = `${__dirname}/../DB/users.json`

class UserModel {

    constructor(link){
        this.usersLink = link;
    }

    getAllData() {
        const { data }= JSON.parse(fs.readFileSync(this.usersLink))
        return data
    }


    findById(id){
        const data  = this.getAllData();
        const user = data.find((user) => user.id === id)
        if(user){
            return user
        } else {
            console.log('There is no such user')
        }
    }


    findUserByEmail(email) {
        const data  = this.getAllData();
        if(email) { 
            const user = data.find(
                user => user.email === email
            )

            if(user){
                return user
            } else {
                console.log('There is no such user')
            }
        }

    }

    async createNewOne(userData){
        const {login, email, password} = userData;

        if(login && email && password) {
            const  data  = this.getAllData();


            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = {
                id: uuidv4(),
                login,
                email: email.toLowerCase(),
                password: hashedPassword
            }
            
            data.push(newUser)
    
            const updatedUsers = JSON.stringify({data})
    
            fs.writeFile(this.usersLink, updatedUsers, (err, data) => {
                if(err){
                    console.log(err)
                }
                console.log('Written successfully');
            })

            return newUser
        }

    }

    
}


module.exports = new UserModel(DB_LINK_USERS);


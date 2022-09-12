import userChaSchema from './userSchema.js'

const insertUser = (bodyData) => {
    return new Promise((resolve, reject) => {
        userChaSchema(bodyData)
        .save()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        userChaSchema
        .findOne({email})
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        userChaSchema
        .find({})
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

export {insertUser, getUserByEmail, getUsers}
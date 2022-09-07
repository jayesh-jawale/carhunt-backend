import carChaSchema from "./carSchema.js";

const createCar = (carData) => {
    return new Promise((resolve, reject) => {
        try   {
            carChaSchema(carData)
            .save()
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

const getCars = () => {
    return new Promise((resolve, reject) => {
        try   {
            carChaSchema
            .find({})
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

const getMarutiCars = (companyName) => {
    return new Promise((resolve, reject) => {
        try   {
            carChaSchema
            .find(companyName)
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

const searchCars = (searchCar) => {
    return new Promise((resolve, reject) => {
        try   {
            carChaSchema
            .find(searchCar)
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

const getCarById = (_id) => {
    return new Promise((resolve, reject) => {
        try   {
            carChaSchema
            .find({_id})
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

export {createCar, getCars, getMarutiCars, searchCars, getCarById}
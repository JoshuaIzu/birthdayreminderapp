import { isValidBirthdayDate } from "./validation.js";


const getAllBirthdaysUseCase = async (userRepository) => {
    return await userRepository.getAllUsers();
};


const addBirthdayUseCase = async (userRepository, userData) => {
    if (!userData.name || !userData.date) {
        throw new Error("Name and date are required to add a birthday.");
    }
    
    if(!isValidBirthdayDate(userData.date)) {
        throw new Error("Invalid date format. Please use MM-DD format.");
    }

    return await userRepository.createUser(userData);
};

const updateBirthdayUseCase = async (userRepository, id, updateData) => {
    if (!id) {
        throw new Error("User ID is required for updating.");
    }
    

   if (updateData.date && !isValidBirthdayDate(updateData.date)) {
       throw new Error("Invalid date format. Please use MM-DD format.");
   }

    return await userRepository.updateUser(id, updateData);
};

const deleteBirthdayUseCase = async (userRepository, id) => {
    if (!id) {
        throw new Error("User ID is required for deletion.");
    }
    return await userRepository.deleteUser(id);
};

export {
    getAllBirthdaysUseCase,
    addBirthdayUseCase,
    updateBirthdayUseCase,
    deleteBirthdayUseCase
};
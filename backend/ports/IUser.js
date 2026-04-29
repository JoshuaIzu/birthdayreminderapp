class IUser {
    
    async getUsersWithBirthday(month, day) {
        throw new Error("Method 'getUsersWithBirthday()' must be implemented.");
    }

    async getAllUsers() {
        throw new Error("Method 'getAllUsers()' must be implemented.");
    }

    async createUser(userData) {
        throw new Error("Method 'createUser()' must be implemented.");
    }

    async updateUser(id, updateData) {
        throw new Error("Method 'updateUser()' must be implemented.");
    }

    async deleteUser(id) {
        throw new Error("Method 'deleteUser()' must be implemented.");
    }
}

export { IUser };
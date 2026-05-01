import mongoose from 'mongoose';
import { IUser } from '../ports/IUser.js';
import { User } from '../core/User.js';
import { isValidBirthdayDate } from '../core/validation.js';
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String },
        date: { type: String, required: true },
        Age: { type: Number }
    },
    { timestamps: true }
);

const UserModel = mongoose.model('Usermodel', userSchema);


const assertValidBirthday = (dateStr) => {
if (!isValidBirthdayDate(dateStr)) {
    throw new Error(
        'Invalid birthday date. Please provide a valid date in the format MM-DD.'
    )
}
}
const toDomainUser = (doc) =>
    new User({
        id: doc._id?.toString(),
        name: doc.name,
        email: doc.email,
        date: doc.date,
        Age: doc.Age
    });

export class MongooseUser extends IUser {
    async getUsersWithBirthday(month, day) {
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        const targetDate = `${formattedMonth}-${formattedDay}`;

        const users = await UserModel.find({ date: targetDate }).lean();
        return users.map(toDomainUser);
    }

    async getAllUsers() {
        const users = await UserModel.find().lean();
        return users.map(toDomainUser);
    }

    async createUser(userData) {
        assertValidBirthday(userData?.date);
        const created = await UserModel.create(userData);
        return toDomainUser(created);
    }

    async updateUser(id, updateData) {
        if (Object.prototype.hasOwnProperty.call(updateData, 'date')) {
            assertValidBirthday(updateData.date);
        }
        const updated = await UserModel.findByIdAndUpdate(id, updateData, {
            returnDocument: 'after',
            runValidators: true
        }).lean();

        return updated ? toDomainUser(updated) : null;
    }

    async deleteUser(id) {
        const deleted = await UserModel.findByIdAndDelete(id).lean();
        return deleted ? toDomainUser(deleted) : null;
    }
}


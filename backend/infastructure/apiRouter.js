import { Router } from 'express';
import {
    getAllBirthdaysUseCase,
    addBirthdayUseCase,
    updateBirthdayUseCase,
    deleteBirthdayUseCase
} from '../core/manageBirthday.js';

const createApiRouter = (userRepository) => {
    const router = Router();

    router.get('/', async (_req, res) => {
        try {
            const users = await getAllBirthdaysUseCase(userRepository);
            return res.status(200).json(users);
        } catch (error) {
            console.error('[API] Error fetching birthdays:', error.message);
            return res.status(500).json({ error: 'Failed to fetch birthdays from the server.' });
        }
    });

    router.post('/', async (req, res) => {
        try {
            const newUser = await addBirthdayUseCase(userRepository, req.body);
            return res.status(201).json(newUser);
        } catch (error) {
            console.error('[API] Validation Error:', error.message);
            return res.status(400).json({ error: error.message });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const updatedUser = await updateBirthdayUseCase(userRepository, req.params.id, req.body);

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found.' });
            }

            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error('[API] Update Error:', error.message);
            return res.status(400).json({ error: error.message });
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const deletedUser = await deleteBirthdayUseCase(userRepository, req.params.id);

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found.' });
            }

            return res.status(200).json({ message: 'User deleted successfully.' });
        } catch (error) {
            console.error('[API] Delete Error:', error.message);
            return res.status(400).json({ error: error.message });
        }
    });

    return router;
};

export { createApiRouter };
const API_URL = import.meta.env.VITE_API_URL || '/api/birthdays';

const birthdayService = {
    async getAll() {
        const res = await fetch(API_URL);
        if (!res.ok) {
            const error = await res.json().catch(() => ({ error: 'Failed to fetch birthdays' }));
            throw new Error(error.error || 'Failed to fetch birthdays');
        }
        return res.json();
    },

    async create(userData) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to add birthday');
        }
        return res.json();
    },

    async remove(id) {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ error: 'Failed to delete birthday' }));
            throw new Error(error.error || 'Failed to delete birthday');
        }
    },

    async update(id, userData) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ error: 'Failed to update birthday' }));
            throw new Error(error.error || 'Failed to update birthday');
        }
        return res.json();
    }
};

export default birthdayService;
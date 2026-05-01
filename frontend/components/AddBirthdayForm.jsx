import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function AddBirthdayForm({ onAdd, editingId, editForm, onEdit, onCancelEdit }) {
    const [form, setForm] = useState({ name: '', date: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);

    const isValidDate = (dateStr) => {
        if (!/^\d{2}-\d{2}$/.test(dateStr)) return false;
        const [month, day] = dateStr.split('-').map(Number);
        return month >= 1 && month <= 12 && day >= 1 && day <= 31;

    }
    const handleDateChange = (e) => {
        let value = e.target.value;
        // Remove any characters that are not digits or hyphen
        value = value.replace(/[^0-9-]/g, '');

        const parts = value.split('-');
        if (parts.length > 2) return;
        // Auto-add hyphen after MM
        if (value.length === 2 && !value.includes('-') && form.date.length === 1) {
            value += '-';
        }
        // Limit to MM-DD length
        if (value.length <= 5) {
            setForm({ ...form, date: value });
        }
    };

    useEffect(() => {
        if (editingId && editForm.name && editForm.date) {
            setForm(editForm);
            setIsEditing(true);
        } else {
            setForm({ name: '', date: '', email: '' });
            setIsEditing(false);
        }
    }, [editingId, editForm]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidDate(form.date)) {
            alert("Invalid date. Please use a real MM-DD date like 04-29.");
            return
        }
        try {
            if (isEditing && editingId) {
                await onEdit(editingId, form);
            } else {
                await onAdd(form);
            }
            setForm({ name: '', date: '', email: '' });
            setIsEditing(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleCancel = () => {
        setForm({ name: '', date: '', email: '' });
        setIsEditing(false);
        onCancelEdit();
    };

    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="px-0 pt-0 mb-6 sm:-ml-1 lg:mb-2">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight uppercase -ml-1 sm:-ml-2 mr-auto">
                    <span className="text-cyan"> {isEditing ? 'Edit' : 'Add'} </span><span className="text-cyan">Entry</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-end">
                    <div className="space-y-3 sm:space-y-4">
                        <Label htmlFor="name" className="text-xs font-normal uppercase tracking-wide text-muted-foreground">Full Name</Label>
                        <Input 
                            id="name"
                            placeholder="SARAH JOHNSON"
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value.toUpperCase()})}
                            required 
                            className="bg-transparent border-white/10 focus:border-cyan h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-xl font-bold text-white uppercase tracking-tight rounded-none transition-all placeholder:text-white/20"
                        />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <Label htmlFor="email" className="text-xs font-normal uppercase tracking-wide text-muted-foreground">Email Address</Label>
                        <Input 
                            id="email"
                            type="email"
                            placeholder="SARAH@EXAMPLE.COM"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value.toLowerCase()})}
                            className="bg-transparent border-white/10 focus:border-cyan h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-xl font-bold text-white lowercase tracking-tight rounded-none transition-all placeholder:text-white/20"
                        />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <Label htmlFor="date" className="text-xs font-normal uppercase tracking-wide text-muted-foreground">Date (MM-DD)</Label>
                        <Input 
                            id="date"
                            placeholder="05-15"
                            value={form.date}
                            onChange={handleDateChange}
                            pattern="[0-9]{2}-[0-9]{2}"
                            title="Format: MM-DD (e.g., 04-29)"
                            required 
                            className="bg-transparent border-white/10 focus:border-cyan h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-xl font-bold text-white tracking-tight rounded-none transition-all placeholder:text-white/20"
                        />
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                        <Button type="submit" className="flex-1 h-12 sm:h-14 lg:h-16 text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-cyan hover:text-black rounded-none transition-all">
                            {isEditing ? 'Update' : 'Execute Add'}
                        </Button>
                        {isEditing && (
                            <Button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 h-12 sm:h-14 lg:h-16 text-xs font-semibold uppercase tracking-wider bg-white/20 text-white hover:bg-white/40 rounded-none transition-all"
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
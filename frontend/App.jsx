import { useState, useEffect } from 'react';
import { BirthdayList } from './components/BirthdayList';
import { AddBirthdayForm } from './components/AddBirthdayForm';
import birthdayService from './services/api';

export default function App() {
  const [birthdays, setBirthdays] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({name: '', date: '', email: ''});

  useEffect(() => {
    birthdayService.getAll().then(setBirthdays);
  }, []);

  const addBirthday = async (birthday) => {
    try {
      const newUser = await birthdayService.create(birthday);
      setBirthdays([...birthdays, newUser]);
    } catch (error) {
      console.error('Failed to add birthday:', error);
    }
  };

  const updateBirthday = async (id, updatedData) => {
    try {
      const updatedUser = await birthdayService.update(id, updatedData);
      setBirthdays(birthdays.map(b => b.id === id ? updatedUser : b));
      setEditingId(null);
      setEditForm({name: '', date: '', email: ''});
    } catch (error) {
      console.error('Failed to update birthday:', error);
    }
  };

  const startEdit = (birthday) => {
    setEditingId(birthday.id);
    setEditForm({name: birthday.name, date: birthday.date, email: birthday.email || ''});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({name: '', date: '', email: ''});
  };

  const deleteBirthday = async (id) => {
    try {
      await birthdayService.remove(id);
      setBirthdays(birthdays.filter(b => b.id !== id));
    } catch (error) {
      console.error('Failed to delete birthday:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans overflow-x-hidden selection:bg-cyan selection:text-black">
      {/* Responsive centered container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center mb-10 sm:mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-1 sm:w-1.5 h-8 sm:h-10 lg:h-12 bg-cyan"></div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold uppercase tracking-tight">
              Birthday <span className="text-cyan">Reminder</span>
            </h1>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid gap-12 sm:gap-20 lg:gap-32 p-6 sm:p-12 lg:p-16 border-4 border-white/[0.03] shadow-[0_0_50px_-12px_rgba(0,212,255,0.1)] rounded-[2rem]">
          {/* Add Birthday Form Section */}
          <section className="w-full">
            <AddBirthdayForm
              onAdd={addBirthday}
              editingId={editingId}
              editForm={editForm}
              onEdit={updateBirthday}
              onCancelEdit={cancelEdit}
            />
          </section>
          
          {/* Birthday List Section */}
          <section className="w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase tracking-tight mb-6 sm:mb-8 lg:mb-12">
              Upcoming <span className="text-cyan">Birthdays</span>
              {birthdays.length > 0 && (
                <span className="text-muted-foreground ml-3 text-lg sm:text-xl lg:text-2xl opacity-70">
                  {birthdays.length} {birthdays.length === 1 ? 'person' : 'people'}
                </span>
              )}
            </h2>
            <BirthdayList
              birthdays={birthdays}
              onDelete={deleteBirthday}
              onEdit={startEdit}
              editingId={editingId}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
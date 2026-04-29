class User {
    constructor({ id, name, email, date, Age }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.date = date;
        this.Age = Age;
    }

    isBirthdayToday(month, day) {
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        return this.date === `${formattedMonth}-${formattedDay}`;
    }
}

export { User };
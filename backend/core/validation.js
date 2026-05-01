const isValidBirthdayDate = (dateStr) => {
    if (!/^\d{2}-\d{2}$/.test(dateStr)) return false;
    const [month, day] = dateStr.split('-').map(Number);
    if (month < 1 || month > 12 || day < 1 || day > 31) return false;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day <= daysInMonth[month - 1];
};

export { isValidBirthdayDate };
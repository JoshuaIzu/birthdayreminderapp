const processBirthdays = async ( userRepository, notificationService, targetDate = new Date()) => {
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();

    const users = await userRepository.getUsersWithBirthday(month, day);
    if (!users || users.length === 0) {
        return { processed: 0 };
    }

    const validUsers = users.filter((user) => user.isBirthdayToday(month, day) && user.email );

    const notifyPromises = validUsers.map((user) =>
        notificationService.sendBirthdayGreeting(user)
    );

    await Promise.allSettled(notifyPromises);

    return { processed:validUsers.length };
};

export { processBirthdays };
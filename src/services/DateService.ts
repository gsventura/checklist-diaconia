export const DateService = {
  getRelevantDate: (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday

    if (dayOfWeek === 0) {
      return today;
    }

    // Calculate days until next Sunday
    const daysUntilSunday = 7 - dayOfWeek;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return nextSunday;
  },

  getDisplayDate: (): string => {
    const date = DateService.getRelevantDate();

    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date).replace(/^\w/, c => c.toUpperCase()); // Capitalize first letter
  },

  getDateKey: (): string => {
    // Returns YYYY-MM-DD for storage key
    const date = DateService.getRelevantDate();
    return date.toISOString().split('T')[0];
  },

  isFirstSundayOfMonth: (): boolean => {
    const date = DateService.getRelevantDate();
    // It is the first Sunday if the day of the month is less than or equal to 7
    return date.getDate() <= 7;
  }
};

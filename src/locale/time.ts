export const DateToDateTimeString = (date: Date): string => {
    return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`;
};

export const DateToDateString = (date: Date): string => {
    return date.toLocaleDateString('en-US');
};

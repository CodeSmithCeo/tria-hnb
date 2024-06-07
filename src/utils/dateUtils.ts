const ONE_DAY_IN_MS= 24 * 60 * 60 * 1000; // Number of seconds in one day

export const epoChToYYYYMMDD = (epoch: number): string => {
    const date = new Date(epoch);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const epochToCroatian = (epoch: number): string => {
    const date = new Date(epoch); 
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 0 based months
    const year = date.getFullYear().toString();
    return`${day}.${month}.${year}`;
};

export const modifyDays = (epoch: number, numberOfDays: number) => {
    return epoch + ONE_DAY_IN_MS * numberOfDays; // Subtract one day
}
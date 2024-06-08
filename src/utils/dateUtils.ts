const ONE_DAY_IN_MS= 24 * 60 * 60 * 1000; // Number of seconds in one day

// Converts epoch time to YYYY-MM-DD format string
export const epoChToYYYYMMDD = (epoch: number): string => {
    const date = new Date(epoch);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// converts epoch time to Croatian native DD.MM.YYYY. format string
export const epochToCroatian = (epoch: number): string => {
    const date = new Date(epoch); 
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 0 based months
    const year = date.getFullYear().toString();
    return`${day}.${month}.${year}`;
};

// adds a number of days to an epoch format value, use -numberOfDays to subb
export const modifyDays = (epoch: number, numberOfDays: number) => {
    return epoch + ONE_DAY_IN_MS * numberOfDays;
}
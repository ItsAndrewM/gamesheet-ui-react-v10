export const jerseyNumberSort = (a: string, b: string) => {
    // Handle the special cases '00' and '0'
    if (a === "00" && b === "0") {
        return -1; // '00' comes before '0'
    } else if (a === "0" && b === "00") {
        return 1; // '0' comes after '00'
    } else if (a === "00" && b === "00") {
        return 0; // '00' is equal to '00'
    }

    const numA = parseInt(a, 10);
    const numB = parseInt(b, 10);
    // Compare the numeric values
    return numA < numB ? -1 : numA > numB ? 1 : 0;
};

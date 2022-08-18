export function currencyFormatNO(num) {
    return (
        num
        .toFixed(2) // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    ) // use ' ' as a separator
}

export function numberFormatNO(num) {
    return (
        num
        .toString()
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    ) // use ' ' as a separator
}
function formatMoney(amountCents: number){
    return `JOD${(amountCents / 100).toFixed(2)}`
}

export default formatMoney;
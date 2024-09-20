function generateRandomNumberString(length: number = 6): string {
    let result: string = ''
    const characters: string = '0123456789'
    const charactersLength: number = characters.length
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength)
        result += characters[randomIndex]
    }
    return result
}
export default generateRandomNumberString

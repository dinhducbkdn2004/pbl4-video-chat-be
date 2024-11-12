export const validation = {
    containsEmail(inputString: string) {
        // Regex pattern for matching a basic email address
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/

        return emailRegex.test(inputString)
    }
}

export class UserValidation {
    static validationName(name: string):void {
        if (name) {
            throw new Error()
        }
    }
}
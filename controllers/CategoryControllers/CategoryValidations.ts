export class CategoryValidations {
    static validationId(id: number):void {
        if (!id || id <= 0) {
            throw new Error('Invalid id')
        }
    }

    static validationName(name: string):void {
        if (!name || name.trim() === '') {
            throw new Error('Invalid name')
        }
    }
}
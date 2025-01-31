export class ProductValidations {
    static validationId(id: number){
        if (!id || id <= 0){
            throw new Error('id must be a positive integer');
        }
    }

    static validationName(name: string): void{
        if(!name || name.trim() === '' ){
            throw new Error('The property "name" is required and cannot be empty');
        }
    }

    static validationDescription(description: string): void{
        if(!description || description.trim() === ''){
            throw  new Error('Missing required parameter description');
        }
    }

    static validationPrice(price: number): void{
        if(price <= 0 ){
            throw new Error( 'The price parameter must be a number');
        }
    }

    static validationStock(stock: number): void{
        if(stock <= 0){
            throw new Error('The property "stock" is required and cannot be empty');
        }
    }

    static validationIdCategory(idCategory: number): void{
        if(idCategory <= 0 || !Number.isInteger(idCategory)){
            throw new Error('The property "idCategory" is required and cannot be empty');
        }
    }

    static validationIdProvider(idProvider: number): void{
        if(idProvider <= 0 || !Number.isInteger(idProvider)){
            throw new Error('The property "idProvider" is required and cannot be empty');
        }
    }

    static validationProduct(name: string, description: string, price: number, stock: number, idCategory: number, idProvider: number): void{
        this.validationName(name);
        this.validationDescription(description);
        this.validationPrice(price);
        this.validationStock(stock);
        this.validationIdCategory(idCategory);
        this.validationIdProvider(idProvider);
    }
}
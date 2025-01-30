import {IProduct} from "../../models/products/Product.interface";
import {IProductValidation} from "./IProductValidation.interface";

export class ProductValidations {
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

    static validationProduct(product: IProductValidation): void{
        this.validationName(product.name);
        this.validationDescription(product.description);
        this.validationPrice(product.price);
        this.validationStock(product.stock);
        this.validationIdCategory(product.idCategory);
        this.validationIdProvider(product.idProvider);
    }
}
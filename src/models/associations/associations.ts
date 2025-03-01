import {Category} from "../categories/Category.model";
import {Product} from "../products/Product.model";
import {Provider} from "../providers/Provider.model";
import {Sale_details} from "../sale_details/sale_details.model";
import {Sale} from "../sales/Sale.model";
import {User} from "../users/User.model";

Category.hasMany(Product, {
    foreignKey: 'idCategory',
});

Product.belongsTo(Category, {
    foreignKey: 'idCategory',
});

Product.belongsTo(Provider, {
    foreignKey: 'idProvider',
});

Product.hasMany(Sale_details, {
    foreignKey: 'idProduct',
});

Provider.hasMany(Product, {
    foreignKey: 'idProvider',
});

Sale_details.belongsTo(Product, {
    foreignKey: 'idProduct',
});

Sale_details.belongsTo(Sale, {
    foreignKey: 'idSale',
});

Sale.hasMany(Sale_details, {
    foreignKey: 'idSale',
});

User.hasMany(Sale, {
    foreignKey: 'idUser',
});

export {Category, Product, Provider, Sale_details, Sale, User};
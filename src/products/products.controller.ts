import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './service/products.service';
const xmlbuilder = require('xmlbuilder'); 


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {
    }

    @Get('/')
    async getProducts(): Promise<any> {        
        return this.productsService.getOfferProducts([1,2,3,4]);
        const products = await this.productsService.getProducts();
        if(process.env.format === 'xml') {
            let xml = xmlbuilder.create('Products');
            for (const product of products) {
                xml.ele('Product', product)
            }                    
            return xml.end({ pretty: true });
        }
        else {
            return products
        }
    }

    @Get('/byCatalog:catalogId')
    getProductsByCategory(@Param('catalogId', ParseIntPipe) catalogId : number): Promise<Array<ProductDto>> {
        return this.productsService.getProductsByCatalog(catalogId);
    }    

}

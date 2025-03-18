import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService
{
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>
  ) {}

  async create(createProductDto: CreateProductDto)
  {
    try {
      const { images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(image => this.productImageRepository.create(
          {
            url: image
          }
        ))
      });
      await this.productRepository.save(product);
      return {
        ...product,
      images
    };
    } catch (error) {
      this.handleDBExepctions(error);
    }
  }

  findAll(
    paginationDto: PaginationDto
  ) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.productRepository.find(
    {
      take: limit,
      skip: offset,
      relations: {
        images: true,
      }
    });
  }

  async findOne(term: string)
  {
    let product: Product;

    if (isUUID(term))
    {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where('UPPER(title) = :title or slug = :slug',
          {
            title: term.toUpperCase(),
            slug: term.toLowerCase() 
          })
        .getOne();
    }
    
    if (!product)
    {
      throw new BadRequestException('product not found');
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  )
  {
    const product = await this.productRepository.preload(
      {
        id: id,
        ...updateProductDto,
        images: []
      }
    );

    if (!product)
    {
      throw new NotFoundException(`product with id ${id} not found`);
    }

    try {
      await this.productRepository.save(product)
      return product;
    } catch (error) {
      this.handleDBExepctions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product)
    {
      throw new BadRequestException('product not found');
    }
    await this.productRepository.remove(product);
  }

  private handleDBExepctions(error: any)
  {
    if (error.code === '23505')
    {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('unexpected error, check logs');
  }
}

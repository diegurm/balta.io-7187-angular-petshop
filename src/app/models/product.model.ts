export class ProductModel {
  constructor(
    public _id: string,
    public title: string,
    public categorty: string,
    public description: string,
    public price: number,
    public images: string[] = [],
  ) {}
}

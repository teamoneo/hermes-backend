export interface MarketInterface {
    getProductFeatures(html: string | Buffer):Promise<Array<Object>>;
}
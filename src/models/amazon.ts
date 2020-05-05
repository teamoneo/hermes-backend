import {MarketInterface} from './../interfaces/marketInterface';
import cheerio from 'cheerio';

export class Amazon implements MarketInterface{
    async getProductFeatures(html: string | Buffer): Promise<Array<Object>> {

        const $ = await cheerio.load(html);
        const description:Array<Object> = [];

        return description;
    }
};
import {MarketInterface} from '../interfaces/marketInterface';
import cheerio from 'cheerio';

export class B2Wdigital implements MarketInterface{
    async getProductFeatures(html: string | Buffer): Promise<Array<Object>> {
        const $ = await cheerio.load(html);
        const description:Array<Object> = [];

        $('tr').each(function (i : number, elem: CheerioElement) {
            description.push({
                description: $(elem).find('td span').slice(0,1).text(),
                value: $(elem).find('td span').slice(1,2).text(),
            });
        });
        return description;
    }
};
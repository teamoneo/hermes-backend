import {MarketInterface} from './../interfaces/marketInterface';
import cheerio from 'cheerio';

export class MercadoLivre implements MarketInterface{
    async getProductFeatures(html: string | Buffer): Promise<Array<Object>> {
        const $ = await cheerio.load(html);
        const description:Array<Object> = [];
        $('li').each(function (i : number, elem: CheerioElement) {
            if ($(elem).find('strong').text() != '') {
                description.push({
                    description: $(elem).find('strong').text(),
                    value: $(elem).find('span').text(),
                });
            }
        });
        console.log(description);

        return description;
    }
};
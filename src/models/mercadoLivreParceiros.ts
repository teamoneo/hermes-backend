import {MarketInterface} from './../interfaces/marketInterface';
import cheerio from 'cheerio';

export class MercadoLivreParceiros implements MarketInterface{
    async getProductFeatures(html: string | Buffer): Promise<Array<Object>> {
        const $ = await cheerio.load(html);
        const description:Array<Object> = [];

        $('tr.andes-table__row').each(function (i : number, elem: CheerioElement) {
            if ($(elem).find('th').text() != '') {
                description.push({
                    description: $(elem).find('th').text(),
                    value: $(elem).find('span').text(),
                })
            }
        });
        $('ul.ui-pdp-list__wrapper').each(function (i : number, elem: CheerioElement) {
            if ($(elem).find('li span').slice(0,1).text() != '') {
                description.push({
                    description: $(elem).find('li span').slice(0,1).text(),
                    value: $(elem).find('li p').slice(0,1).text(),
                });
            }
            if ($(elem).find('li span').slice(1,2).text() != '') {
                description.push({
                    description: $(elem).find('li span').slice(1,2).text(),
                    value: $(elem).find('li p').slice(1,2).text(),
                });
            }  
        });

        return description;
    }
};
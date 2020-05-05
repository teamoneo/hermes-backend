import requestCherio from 'request';

import {MercadoLivre} from './../../models/mercadoLivre'; 
import {MercadoLivreParceiros} from './../../models/mercadoLivreParceiros'; 
import { B2Wdigital } from '../../models/b2w';
import { Amazon } from '../../models/amazon';

import getClassification from './../../services/apiCall';

import {Response, Request} from 'express';

function getHtml(origin: string, callback: Function) {
  requestCherio(origin, function (error, response, html) { 
    if (!error && response.statusCode == 200) {
      callback(html);
    }
  });
}


function getAnswer(features, questions) {

  const result = [];
  const mask = [];

  questions.map((questionElem, qstIndex) => {
    const question = new RegExp(questionElem.text, 'i');
    features.map((featureElem, ftrIndex) => {
      const feauture = new RegExp(featureElem.description, 'i')
      if (question.exec(featureElem.description) != null || feauture.exec(questionElem.text) != null) {
        console.log('Encontrei uma Resposta');
        let featureElem = features[ftrIndex];
        let questionElem = questions[qstIndex].text;
        if(questionElem.toLowerCase() === featureElem.description.toLowerCase()){
          mask.push(featureElem.description);
        }
        result.push({
          question: questionElem,
          feature: featureElem.description,
          answer: featureElem.value
        });
      }    
    });
  });
  console.log(`Encontrados:${JSON.stringify(result,null,3)}`)
  console.log(`Filtrados por:${mask}`)

  result.map((elem,index) => {
    if(elem.question.toLowerCase() !== elem.feature.toLowerCase()){
      mask.map((elemTwo) => {
        if(elem.question.toLowerCase() === elemTwo.toLowerCase()){
          result.splice(index,1);
        }
      });
    }
  });
  return result;
}

// Valid Stores
const stores = {
  ml(){
    return new MercadoLivreParceiros;
  },
  b2w(){
    return new B2Wdigital;
  },
  ml_default(){
    return new MercadoLivre;
  },
  /*amz(){
    return new Amazon;
  }*/
}

module.exports = {
  async getResponse(request: Request, response: Response) {
    const { question , origin } = await request.body;

    if(question === "" || question == null){
      return response.status(400).json({error: 'Question is required'});
    }

    const { store } = request;  
    const storeObject = stores[store]();

    getHtml(origin, async function (html: string | Buffer) {
      const features = await (storeObject).getProductFeatures(html);
      console.log(features)
      if(features.length === 0){
        return response.status(400).json({error: 'No features found'});
      }
      const classResponse = await getClassification(question);
      const answer = getAnswer(features, classResponse.keywords);
      if(answer.length === 0){
        return response.status(400).json({error: 'Sorry :( , I couldn\'t find a suitable answer'});
      }

      return response.json({ origin, question , answer});
    });
  },
};
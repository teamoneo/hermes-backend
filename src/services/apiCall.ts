import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

require ('dotenv').config();

const apiKeyibm = process.env.IBM_API_KEY;

export default async function getClassification(question: String) {
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version: '2019-07-12',
      authenticator: new IamAuthenticator({
        apikey: apiKeyibm,
      }),
      url:
        'https://gateway-wdc.watsonplatform.net/natural-language-understanding/api',
    }); 
    const analyzeParams = {
      text: question,
      features: {
        keywords: {
          limit: 10,
        },
      },
      language: 'pt',
    };
  
    let result = '';
  
    await naturalLanguageUnderstanding
      .analyze(analyzeParams)
      .then(analysisResults => {
        console.log(analysisResults.result)
        result = analysisResults.result;
      })
      .catch(err => {
        console.log('error:', err);
      });

    return result;
}
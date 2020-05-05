import { Request, Response, NextFunction } from 'express';

export default function(req: Request, res: Response, next: NextFunction) {
  const {origin}  = req.body;

  const validStores = [
    {verifyStore(url: String){
      const regex = new RegExp("www\.mercadolivre\.com\.br", 'i')
      if(regex.exec(origin)!=null){
        req.store = 'ml';
        return true;
      }
    }},
    {verifyStore(url: String){
      const regex = new RegExp("produto\.mercadolivre\.com\.br", 'i')
      if(regex.exec(origin)!=null){
        req.store = 'ml_default';
        return true;
      }
    }},
    {verifyStore(url: String){
      const regex = new RegExp("americanas\.com\.br/produto", 'i')
      if(regex.exec(origin)!=null){
        req.store = 'b2w';
        return true;
      }
    }},
    {verifyStore(url: String){
      const regex = new RegExp("submarino\.com\.br/produto", 'i')
      if(regex.exec(origin)!=null){
        req.store = 'b2w';
        return true;
      }
    }},
    {verifyStore(url: String){
      const regex = new RegExp("shoptime\.com\.br/produto", 'i')
      if(regex.exec(origin)!=null){
        req.store = 'b2w';
        return true;
      }
    }},
    {verifyStore(url: String){
      const regex = new RegExp("soubarato\.com\.br/produto", 'i')
      if(regex.exec(origin)!=null){
        req.store = 'b2w';
        return true;
      }
    }},
    /*{verifyStore(url: String){
      const regex = new RegExp("amazon\.com\.br", 'i')
      if(regex.exec(origin)!=null){
        req.store = 'amz';
        return true;
      }
    }},*/
  ];
  
  if (origin != null) {
    let find = false;

    validStores.map(elem=>{
      if(elem.verifyStore(origin)){
        find = true;
      }
    })

    if(find){
      return next();
    }else{
      return res.status(400).json({error: 'Invalid marketplace'});
    }
  }else{
    return res.status(404).json({error: 'Missing origin'});
  }

}

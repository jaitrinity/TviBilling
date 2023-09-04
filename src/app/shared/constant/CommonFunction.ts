export class CommonFunction{
    public static createCommaSeprate(listData : any):string{
        let commSeprateValue = "";
        for(let i=0;i<listData.length;i++){
            commSeprateValue += listData[i];
            if(i != listData.length-1){
            commSeprateValue += ",";
            }
        }
        return commSeprateValue;
    }

    public static createCommaSeprateByParamCode(listData : any):string{
        let commSeprateValue = "";
        for(let i=0;i<listData.length;i++){
            commSeprateValue += listData[i].paramCode;
            if(i != listData.length-1){
            commSeprateValue += ",";
            }
        }
        return commSeprateValue;
    }
}
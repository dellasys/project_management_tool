export const processRecordOfIndexZero = (data) => {
    if(data.length > 0){
        return data[0]
    }else{
        return {};
    }
}
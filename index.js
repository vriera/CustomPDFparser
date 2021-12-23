const fs = require('fs')
const { parse } = require('path')
const pdfparse = require('pdf-parse')
const files = fs.readdirSync('./data_small');
console.log('found files are:');
console.log(files)
const {Parser , MAYBE , FOUND , ERROR , SAVING} = require('./parser')

let target_found = 0
//files.forEach( (filename) => console.log(filename));

app();
async function app(){
    await Promise.all(files.map( async (filename) => {
        let file = fs.readFileSync(`./data_small/${filename}`);
        data = await pdfparse(file)
        let text = data.text;
        //console.log(text , text.text_len);
        target_found += await  masterParser(text, text.length , filename);
    }));
    console.log(`Se encontraron ${target_found}  39/40`);
}

function resetAll(parserArray){
    parserArray.forEach(element => {
        element.reset();
    });
}

async function masterParser(text , text_len , filename){
    let parser51 = new Parser('(51)' , '\n');
    let parserCode = new Parser('A61P', ',');
    let parser10 = new Parser('(10)' , '\n');
    let totalPatentes = 0;
    let targetLocal = 0;
    for(let i = 0 ; i < text_len ; i++ ){
        c = text[i];
        parser10.feed(c);
        if(parser10.state == FOUND ){
            totalPatentes++;
        }
        //sconsole.log(parser51.state);
        if(c == '\n'){
            if(parserCode.state== FOUND){
                targetLocal+= 1;
            }
            parser51.reset();
            parserCode.reset();

        }else {
            parser51.feed(c);
            if(parser51.state == SAVING){
                if( c == ','){
                    if(parserCode.state== FOUND){
                        targetLocal+= 1;
                    }
                    parserCode.reset();
                }
                parserCode.feed(c);
                
            }
        }
    }
    console.log(`Se encontraron ${totalPatentes} con ${targetLocal} local en ${filename}`);
    return targetLocal;
}





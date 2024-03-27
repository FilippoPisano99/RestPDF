// Importa librerie
const express = require('express');
const bodyParser = require('body-parser');
const PuppeteerHTMLPDF = require('puppeteer-html-pdf');

// Crea app Express
const app = express();

// Configura body-parser per gestire JSON
app.use(bodyParser.json());

// Definisce rotta POST
app.post('/pdf', async (req, res) => {
    // Recupera contenuto HTML codificato in b64 dal body
    const encodedHtml = req.body.html;

    // Decodifica stringa b64
    const htmlContent = Buffer.from(encodedHtml, 'base64').toString('utf-8');

    // Stampa contenuto HTML decodificato in console
    //console.log(htmlContent);

    const htmlPDF = new PuppeteerHTMLPDF();
    htmlPDF.setAutoCloseBrowser(true)
    const options = {
        args: ['--no-sandbox'],
        format: 'A4',
        margin: {
            left: '25px',
            right: '25px',
            top: '20px'
        }
    }
    //args: ['--no-sandbox']
    htmlPDF.setOptions(options);

    try {
        // Genero PDF da HTML
        await htmlPDF.create(htmlContent, (err, data)=>{
            res.send(data);
        });

        // Invia risposta
        
        
    } catch (error) {
        console.log('PuppeteerHTMLPDF error', error);

        // Invia risposta
        res.send(error);
    }
});

// Avvia server
app.listen(3000, (e) => {
    console.log('Server in ascolto sulla porta 3000');
});

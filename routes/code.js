const express = require('express');

let router = express.Router();
var html_to_pdf = require('html-pdf-node');

router.get('/:code', (req, res)=>{

    let amount = req.query.amount ? req.query.amount : 0;
    let service = req.query.service ? req.query.service : 'Service';
    const fs = require('fs');

    try {
    let data = fs.readFileSync('public/invoice.html', 'utf8');
        data = data.replace('{{{service}}}', service);
        data = data.replace('{{{amount}}}', amount);
    // console.log(data);

    let options = {path: 'public/invoice.pdf'};
    html_to_pdf.generatePdf({content:data}, options).then(pdfBuffer => {
        // console.log("PDF Buffer:-", pdfBuffer);
      });

    } catch (err) {
    console.error(err);
    }
    res.download('public/invoice.pdf');
    // res.end();
});


module.exports = router;
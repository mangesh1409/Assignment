const expres = require("express");
const router = expres.Router();
const fs = require('fs');

// const data = {Title: "demo", Quantity: 10, Price: 100, Description: "Test..." }

router.get('/data', (req,res) => {
    
    let fileData;
    fileData = fs.readFileSync('data.json','utf8')
    res.send((fileData));
});

router.post('/data', (req,res) => {

    let fileData;
    fileData = JSON.parse(fs.readFileSync('data.json','utf8')); 

    let isIdDuplicate = false;

    fileData.forEach((d, index) => {

        if(req.body.Id === d.Id) {

            isIdDuplicate = true;

            d.Id = req.body.Id; 
            d.Title = req.body.Title;
            d.Quantity = req.body.Quantity;
            d.Price = req.body.Price;
            d.Description = req.Description;
        }

    })

    if(!isIdDuplicate) {

        fileData.push(req.body);
        fs.writeFile('data.json',JSON.stringify(fileData), function (err) {
            if (err) throw err;
          });

    } 
         
    if(isIdDuplicate) {
        console.log("$$$$$$data$$$$$", fileData);
        
        fs.writeFile('data.json',JSON.stringify(fileData), function (err) {
        });
        res.send('duplicate id found');
    } else {
        let resData;
        resData = fs.readFileSync('data.json','utf8')
        res.send(JSON.stringify(resData));
    
    }
    
});

router.post('/data/delete', (req,res) => {

    console.log("delete ID", req.body.Id);

    let resData =  JSON.parse(fs.readFileSync('data.json','utf8'));
    
    
    let finalData = resData.filter((d) => {
        
        if (d.Id != req.body.Id) {
            return d;
        } 

    });
    console.log("***resData***",finalData);
    fs.writeFile('data.json',JSON.stringify(finalData), function (err) {
        if (err) throw err;
    });
    
    
    res.send(JSON.stringify(finalData));
    
});


router.post('/data/update', (req,res) => {

    console.log("delete ID", req.body.Id);

    let resData =  JSON.parse(fs.readFileSync('data.json','utf8'));
    
    
    let finalData = resData.map((d) => {
        
        if (d.Id == req.body.Id) {
           d.Id = req.body.Id; 
           d.Title = req.body.Title;
           d.Quantity = req.body.Quantity;
           d.Price = req.body.Price;
           d.Description = req.Description;
        } 
        return d;
    });
    console.log("***resData***",finalData);
    fs.writeFile('data.json',JSON.stringify(finalData), function (err) {
        if (err) throw err;
    });
    
    
    res.send(JSON.stringify(finalData));
    
});

module.exports = router; 
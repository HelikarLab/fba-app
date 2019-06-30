const { PythonShell } = require('python-shell');
const fs = require('fs');

module.exports = async function (req, res) {

    console.log(Object.values(req.fields)[0]);

    // fs.renameSync("analysisModel", `./uploads/${file.name}`)
    fs.writeFile ("./analysis/analysisModel.json", Object.values(req.fields)[0], function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );

    const options = {
        args: [Object.values(req.fields)[0]]
    };


    PythonShell.run('modelAnalysis.py', options, function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).send('Something went wrong!')
        } else {
            res.status(200).json(data)
        }

    })
};
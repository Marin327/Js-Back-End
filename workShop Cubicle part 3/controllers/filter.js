const { getAllCubes } = require('./cubes');

async function searchHandler(req, res) { 
    const { search, from, to } = req.query;
    let data = await getAllCubes();
    if(search){
        data = data.filter(item => {
            return item['name']
            .toLowerCase()
            .includes(search.toLowerCase())
        })
    }
    if(from){
        data = data.filter(item => {
            return Number(item.difficulty) >= Number(from);
        })
    }
    if(to){
        data = data.filter(item => {
            return Number(item.difficulty) <= Number(to);
        })
    }
    return res.render('index', {
        cubes: data,
        isLoggedIn: req.isLoggedIn
    });
}
module.exports = { searchHandler };
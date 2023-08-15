const { html, data } = require('../util');

const catalogPage = `<h1>Catalog</h1>
<form method="POST" action='/create'>
    <label>Name: <input type='text' name='name'></label>
    <label>Color:
        <select name='color'>
            <option value='red'>Red</option>
            <option value='green'>Green</option>
            <option value='blue'>Blue</option>
</select>
</label>
</form>
<input type='submit' value="Create item">
<ul>
    ${data.map(i => `<li>${i.name} - ${i.color}</li>`).join("\n")}
</ul>`;

function catalogController(req, res) {
    res.write(html(catalogPage));
    res.end();
}

function createController(req, res) {
    console.log('create request');
    
    res.writeHead(301, {
    'Location': '/catalog'
    });
    res.end();
}
module.exports = {
    catalogController,
    createController
}
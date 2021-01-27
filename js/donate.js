// Donate Carousel

var btc = {
    name: 'Bitcoin',
    addr: '364i4khD1kfQgHjVv3eitsX97TqmHkie5k', 
    qr: 'img/btcqr.bmp', 
    html: document.getElementById('btc')
}
var eth = {
    name: 'Ethereum',
    addr: '0x402B70eaf3552c779073D958A38489fc62f52517',
    qr: 'img/ethqr.bmp',
    html: document.getElementById('eth')
}
var xrp = {
    name: 'Ripple',
    addr: 'rDa3z4CnfKQy3Sg8CsTfqgk1sErL5wtSao',
    qr: 'img/xrpqr.bmp',
    html: document.getElementById('xrp')
}
var ltc = {
    name: 'Litecoin',
    addr: 'MSnhZBJhyuSTB3W7A4zDFy98ECWXuTQnm3',
    qr: 'img/ltcqr.bmp',
    html: document.getElementById('ltc')
}
var doge = {
    name: 'Dogecoin',
    addr: 'DT9XgJV7VR6hVAr9nM36oKQ8MnkpJA8kxY',
    qr: 'img/dogeqr.bmp',
    html: document.getElementById('doge')
}
var coins = [btc, eth, xrp, ltc, doge]

const qr = document.getElementById('qr');
const currency = document.getElementById('currency');
const addr = document.getElementById('addr');

function resetNav(html){
    html.className = 'nav-link';
}
function resetAll(coins){
    for (i=0; i<coins.length; i++){
        resetNav(coins[i].html);
    }
}
function activeNav(html){
    html.className = 'nav-link active';
}
function setNav(html){
    resetAll(coins);
    activeNav(html);
}

btc.html.addEventListener('click', function(){
    currency.innerHTML = btc.name;
    addr.innerHTML = btc.addr;
    qr.src = btc.qr;
    setNav(btc.html);
})
eth.html.addEventListener('click', function(){
    currency.innerHTML = eth.name;
    addr.innerHTML = eth.addr;
    qr.src = eth.qr;
    setNav(eth.html);
})
xrp.html.addEventListener('click', function(){
    currency.innerHTML = xrp.name;
    addr.innerHTML = xrp.addr;
    qr.src = xrp.qr;
    setNav(xrp.html);
})
ltc.html.addEventListener('click', function(){
    currency.innerHTML = ltc.name;
    addr.innerHTML = ltc.addr;
    qr.src = ltc.qr;
    setNav(ltc.html);
})
doge.html.addEventListener('click', function(){
    currency.innerHTML = doge.name;
    addr.innerHTML = doge.addr;
    qr.src = doge.qr;
    setNav(doge.html);
})

// End donate Carousel
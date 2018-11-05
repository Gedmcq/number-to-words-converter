const wordsMap = {oneDigit: [
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
        'Eleven',
        'Twelve',
        'Thirteen',
        'Fourteen',
        'Fifteen',
        'Sixteen',
        'Seventeen',
        'Eighteen',
        'Nineteen'],
    twoDigits: ['Twenty',
        'Thirty',
        'Forty',
        'Fifty',
        'Sixty',
        'Seventy',
        'Eighty',
        'Ninety',],
    multipleDigits: [
        'hundred',
        'thousand',
        'milllion'
    ]
};

function converter(e) {
    const number = `${parseInt(e.target.value, 10)}`;
    const wordsHolder = document.getElementById('words');

    if (number.length <= 7) {
        wordsHolder.innerHTML = loop(number, false, number.length > 6);
    } else {
        wordsHolder.innerHTML = 'Limit exceeded';
    }
}

function loop(number, noSuffix, doubleDeepness) {
    if (number.length < 3) {
        return belowHundred(number).join(' ');
    } else {
        return aboveHundred(number, noSuffix, doubleDeepness).join('');
    }
}

function pickFromMap(num, map) {
    let decrement = map === 'oneDigit' ? 1 : 2;
    return !!Number(num) ? wordsMap[map][num - decrement] : '';
}

function belowHundred(number) {
    const numberArray = number.split('');

    let words = [];
    if (number < 20) {
        words.push(pickFromMap(number, 'oneDigit'));
    } else {
        numberArray.forEach((number, index) => {
            if (!index) {
                words.push(pickFromMap(number, 'twoDigits'));
            } else {
                words.push(pickFromMap(number, 'oneDigit'));
            }
        });
    }
    return words;
}


function aboveHundred(number, noSuffix = false, doubleDeepness) {
    const numberArray = number.split('');

    let suffix = number.length < 4 ? wordsMap.multipleDigits[0] : number.length < 7
        ? wordsMap.multipleDigits[1] : wordsMap.multipleDigits[2];

    let words = [];
    let memo = number.length === 5 ? 2 : number.length === 6 ? 3 : 1;

    const primary = loop(numberArray.slice(0, memo).join(''), memo === 2, doubleDeepness);

    if (noSuffix || !primary  || (!primary.replace(/\s/g, '').length && doubleDeepness)) {
        suffix = '';
    }

    words.push(`${primary} ${suffix} `);

    const secondary = loop(number.slice(memo, number.length), false, doubleDeepness);

    words.push(secondary);

    return words;
}

window.onload = function(){
    document.getElementById('input').addEventListener('keyup', converter);
};

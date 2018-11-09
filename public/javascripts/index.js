'use strict';

const calTotalNumber = () => {
    let count = 0;
    $('input[type="number"].item').each(function() {
        count += $(this).val().length !== 0 ? parseInt($(this).val()) : 0;
    });
    $('#total_number').text(count);
};

const showPriceBefore = (data) => {
    $('#before').removeClass('d-none');
    const { price, discounts } = data;
    const priceBefore = +(price + discounts['DVD'] + discounts['Blu-Ray'] + discounts['bulk']).toFixed(2);
    $('#price_before').text('$' + priceBefore);
};

const calPrice = () => {
    const items = [];

    $('input[type="number"].item').each(function() {
        if ($(this).val().length !== 0 && $(this).val() > 0) {
            items.push({
                name: $(this).attr('name'),
                quantity: $(this).val()
            });
        }
    });

    $.ajax({
        url: '/api/v1/items',
        type: 'post',
        data: JSON.stringify({ items: items }),
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data){
            console.log(data);
            $('#total_price').text(data.price);
            if (data.discounts.DVD > 0) {
                $('#dvd').removeClass('d-none');
                $('#dvd_discount').text('- $' + data.discounts.DVD);
                showPriceBefore(data);
            } else {
                $('#dvd').addClass('d-none');
            }
            if (data.discounts['Blu-Ray'] > 0) {
                $('#blu').removeClass('d-none');
                $('#blu_discount').text('- $' + data.discounts['Blu-Ray']);
                showPriceBefore(data);
            } else {
                $('#blu').addClass('d-none');
            }
            if (data.discounts.bulk > 0) {
                $('#bulk').removeClass('d-none');
                $('#bulk_discount').text('- $' + data.discounts.bulk);
                showPriceBefore(data);
            } else {
                $('#bulk').addClass('d-none');
            }
            if (data.discounts.bulk === 0 && data.discounts.DVD === 0 && data.discounts['Blu-Ray'] === 0) {
                $('#before').addClass('d-none');
            }
        },
        error: function (err){
            console(err.stack);
        }
    });
};

$(() => {
    calTotalNumber();
    calPrice();

    $('.auto-submit').on('change keyup', () => {
        calTotalNumber();
        calPrice();
    });

});
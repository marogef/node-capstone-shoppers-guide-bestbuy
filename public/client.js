
$(document).on('keypress', function(key) {
    //keyCode == 13 is the ENTER key
    if (key.keyCode == 13) {
        $('.loader').fadeIn('slow');
        var userInput = $('#search-section').val();
        
        getResults(userInput);
        // $('#search-section').val('');
    }
});

$(document).on('click', "#userInput",function(key) {
     $('.loader').fadeIn('slow');
        var userInput = $('#search-section').val();
        getResults(userInput);
        // $('#search-section').val('');
});



// function getResults(query) {
//     console.log(query);
//     var url = 'https://api.bestbuy.com/v1/products((name=' + query + '*)&type!=BlackTie&customerTopRated=true)?sort=salesRankShortTerm.asc';
//     $.ajax({
//         method: 'GET',
//         url: url,
//         data: {
//             format: 'json',
//             apiKey: 't5reggzup769kevta2bdabkx',
//             page: 1,
//             pageSize: 36
//         },
//         cache: true, // necessary because our API rejects queries with unrecognized query parameters, such as the underscore injected when this isn't included
//         preowned: false,
//         active: true,
//         dataType: 'jsonp'
//     }).done(ajaxDone).fail(ifResultsFail);
// }

function getResults(query) {
    console.log(query);
    var url = '/product/' + query ;
    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: url
    }).done(ajaxDone).fail(ifResultsFail);
}

function resultsIntoListItem(output, product) {
    var isSale;
    output += '<li>';
    output += '<div class="product-container">';
    output += '<div class="add-product-to-favorites">';
    output += '<input type="hidden" value="' + product.name + '">';
    output += '<button type="submit"><img src="images/add-to-favorites.png"></button>';
    output += '</div>';
    output += '<div class="title-wrapper"><h3 class="clamp-this">' + product.name + '</h3></div>';
    if (product.image != null) {
        output += '<img src="' + product.image + '">';
    }
    else {
        output += '<img src="images/product-image-not-found.gif">';
    }
    output += '<div class = "product-details">';
    if (product.customerReviewCount != null) {
        output += '<p class="review-num">' + product.customerReviewCount + ' Reviews</p>';
    }
    if (product.customerReviewAverage != null) {
        output += '<p class="star-avg">' + product.customerReviewAverage + ' Stars</p>';
    }

    if ((product.salePrice < product.regularPrice) && (product.salePrice != null)) {
        output += '<p class="reg-price strikethrough">$' + product.regularPrice + '</p>';
        output += '<p class="sale-price highlight">Sale: $' + product.salePrice + '</p>';
        isSale = true;
    }
    else {
        output += '<p class="reg-price strong no-sale">$' + product.regularPrice + '</p>';
        isSale = false;
    }
    output += '</div>';
    if (isSale == false) {
        output += '<a href="' + product.addToCartUrl + '" class="add-to-cart">Add to Cart</a>';
    }
    else {
        output += '<a href="' + product.addToCartUrl + '" class="add-to-cart sale-button">Add to Cart</a>';
    }
    output += '</div>';
    output += '</li>';
    return output;
}

function clampItemTitle(index, element) {
    $clamp(element, {
        clamp: 3
    });
}

function ifResultsFail(jqXHR, error, errorThrown) {
    console.log(jqXHR);
    console.log(error);
    console.log(errorThrown);
}

function ajaxDone(result) {
    console.log(result);
    var output = '';
    if (result.products.length == 0) {
        alert('No Results Found!');
    }
    else {
        if (!result.error && result.products) {
            console.log(result.products);
            output = result.products.reduce(resultsIntoListItem, '');
        }
        else {
            output = 'Unable to access products (see browser console for more information)';
        }
        $('.results ul').html(output);
        $('.clamp-this').each(clampItemTitle);
    }
    $('.loader').fadeOut('slow');
}

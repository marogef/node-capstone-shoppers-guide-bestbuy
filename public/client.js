$(document).on('keypress', function(key) {
    //keyCode == 13 is the ENTER key
    if (key.keyCode == 13) {
        $('.loader').fadeIn('slow');
        var userInput = $('#search-section').val();
        getResults(userInput);
        // $('#search-section').val('');
    }
});

$(document).on('click', "#userInput", function(key) {
    $('.loader').fadeIn('slow');
    var userInput = $('#search-section').val();
    getResults(userInput);
    $('#search-section').val('');
});

function getResults(query) {
    console.log(query);
    var url = 'https://api.bestbuy.com/v1/products((name=' + query + '*)&type!=BlackTie&customerTopRated=true)?sort=salesRankShortTerm.asc';
    $.ajax({
        method: 'GET',
        url: url,
        data: {
            format: 'json',
            apiKey: 't5reggzup769kevta2bdabkx',
            page: 1,
            pageSize: 36
        },
        cache: true, // necessary because our API rejects queries with unrecognized query parameters, such as the underscore injected when this isn't included
        preowned: false,
        active: true,
        dataType: 'jsonp'
    }).done(ajaxDone).fail(ifResultsFail);
}

// function getResults(query) {
//     console.log(query);
//     var url = '/product/' + query ;
//     $.ajax({
//         method: 'GET',
//             // apiKey: 't5reggzup769kevta2bdabkx',
//         dataType: 'json',
//         url: url,
//     }).done(ajaxDone).fail(ifResultsFail);
// }

// function getResults(query) {
//     console.log(query);
//     var url = '/product/' + query ;
//     $.ajax({
//         type: 'GET',
//         dataType: 'json',
//         url: url
//     }).done(ajaxDone).fail(ifResultsFail);
// }

// function getResults(query) {
//     console.log(query);
//     var url = '/product/' + query ;
//     $.ajax({
//         method: 'GET',
//         url: url,
//         data: {
//             format: 'json',
//             apiKey: 't5reggzup769kevta2bdabkx',
//             page: 1,
//             pageSize: 36;
//         },
//         cache: true, // necessary because our API rejects queries with unrecognized query parameters, such as the underscore injected when this isn't included
//         preowned: false,
//         active: true,
//         dataType: 'jsonp'
//     }).done(ajaxDone).fail(ifResultsFail);
// }

function resultsIntoListItem(output, product) {
    var isSale;
    output += '<li>';
    output += '<div class="product-container">';
    output += '<div class="title-wrapper"><h3 class="clamp-this">' + product.name + '</h3></div>';
    output += '<img src="' + product.image + '">';
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




//function to add items
function addItem() {
    //get the value of the input box
    var itemValue = $('.product-container').val();

    //dynamicaly create one row inside the shopping list
    var row = '';
    row += '<li>';
    row += '<span class="shopping-item">' + itemValue + '</span>';
    row += '<div class="shopping-item-controls">';
    row += '<button class="shopping-item-toggle">';
    row += '<span class="button-label">check</span>';
    row += '</button>';
    row += '<button class="shopping-item-delete">';
    row += '<span class="button-label">delete</span>';
    row += '</button>';
    row += '</div>';
    row += '</li>';

    //add each row to the previous ones
    $('.cart-items').append(row);
}


function resultsIntoListItem(output, product) {
    var isSale;
    output += '<li>';
    output += '<div class="product-container">';
    output += '<div class="add-product-to-favoritess">';
    output += '<input type="hidden" value="' + product.name + '">';
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
        output += '<button class="favorites" type="submit"><img src="images/add-to-favorites.png"></button>';

    }
    else {
        output += '<a href="' + product.addToCartUrl + '" class="add-to-cart sale-button">Add to Cart</a>';
        output += '<button class="favorites" type="submit"><img src="images/add-to-favorites.png"></button>';

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
    // console.log(result);
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


//Login an already existing user

    $('#btnLogin').click (function (event) {
        event.preventDefault();
        $('#temp-error').hide();
        let user-name = $('#username').val();
        let user-password = $('#password').val();
        let item = {
            'username' : user-name, 
            'password' : user-password
        };
        
        var ajax = $.ajax ('/login', {
            type: 'POST',
            data: JSON.stringify (item),
            dataType: 'json',
            contentType: 'application/json'
        });
        ajax.done (function (res) {
            if (res.response == 'error') {
                $('#login').append ('<div id="temp-error">' + res.message + '</div>');
                return;
            }
            else {
                userData = res;
                updatedData = res;

                $('#login').hide();
                $('.search').hide();
                $('.form-login').hide();
                $('.mid-content').show();
            }
        });
    });

//Create a new user
    
    $('#form-submit').click (function (event) {
        event.preventDefault();
        $('#temp-error').hide();
        let newUser = $('#new-user').val();
        let newPassword = $('#new-pass').val();
        let newEmail = $('#new-email').val();
        var item = {'username' : newUser, 'password' : newPassword, 'userEmail' : newEmail};
        
        var ajax = $.ajax ('/new-user', {
            type: 'POST',
            data: JSON.stringify (item),
            dataType: 'json',
            contentType: 'application/json'
        });
        ajax.done (function (res) {
            if (res.response == 'error') {
                $('#newuser').append ('<div id="temp-error">' + res.message + '</div>');
                return;
            }
            else {
                userData = res;
                updatedData = res;
                $('#newuser').hide();
                $('#newPassword').hide();
                $('#newEmail').hide();
            }    
        });
    });

// $(document).on('click', '#btnLogin', function(key) {
//     var user = $("#username").val();
//     var pass = $("#password").val();
//     $.post("/login", {
//         Username: user,
//         Password: pass
//     }, function(data) {
//         if (data === 'done') {
//             alert("Welcome");
//         }
//     });
// });

// //code for event handling for cart
// function move_navigation( $navigation, $MQ) {
// 	if ( $(window).width() >= $MQ ) {
// 		$navigation.detach();
// 		$navigation.appendTo('header');
// 	} else {
// 		$navigation.detach();
// 		$navigation.insertAfter('header');
// 	}
// }



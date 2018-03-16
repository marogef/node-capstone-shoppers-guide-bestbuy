var totalList = 10;


//function to hide results when document loads
$(document).ready(function() {
    $(".search-results").hide();
});

//Function for when the user presses enter to display results

$(document).on('keypress', function(key) {
    //keyCode == 13 is the ENTER key
    if (key.keyCode == 13) {
        $('.loader').fadeIn('slow');
        var userInput = $('#search-section').val();
        getResults(userInput);
        // $('#search-section').val('');
    }
});

//Fuction when the user clicks to see the results
$(document).on('click', "#userInput", function(key) {
    $('.loader').fadeIn('slow');
    var userInput = $('#search-section').val();
    getResults(userInput);
    $('#search-section').val('');
});


function getResults(query) {
    console.log(query);
    var url = '/product/' + query;
    $.ajax({
        method: 'GET',
        apiKey: 'ccw7r1Dxrz9wNwgQuNWLOKqZ',
        dataType: 'json',
        url: url,
    }).done(ajaxDone).fail(ifResultsFail);
}

function sanitizeJSON(unsanitized) {
    var str = JSON.stringify(unsanitized);
    var output = str
        .replace(/\\/g, "-")
        .replace(/\//g, "-")
        .replace(/\n/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
        .replace(/\f/g, "")
        .replace(/"/g, "")
        .replace(/'/g, "")
        .replace(/\®/g, "")
        .replace(/\&/g, "");
    return output;
}


//function for showing results
function resultsIntoListItem(output, product) {
    var isSale;
    output += '<li>';
    output += '<div class="product-container">';
    output += '<div class="title-wrapper"><h3 class="clamp-this">' + sanitizeJSON(product.name) + '</h3></div>';
    output += '<img src="' + product.image + '">';
    output += '<a href="' + product.url + '" class="linking">Visit product</a>';

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



//clicking the favorites to add the products 
$(document).on('click',".favorites", function(key) {
    
     if(!$(this).hasClass('visited'))
    {
        $(this).addClass('visited');
      
        addFavoriteProduct($(this).parents('li').find('.linking').attr('href'));

          return true;
}
else
    {
        return false;
    }

});




//$(document).on('click', ".favorites", function(key) {
//    var favoriteProductName = $(this).closest('.add-product-to-favorites').find('input').val();
//
//    // $(".search-results").show();
//
//    addFavoriteProduct(favoriteProductName);
//});

//function to add items 
function addFavoriteProduct(favoriteProductName) {

    console.log(favoriteProductName);

    var favoriteProduct = {
        'productName': favoriteProductName
    };

    $.ajax({
            method: 'POST',
            dataType: 'json',
            data: favoriteProduct,
            url: '/favorite-product/',
        })
        .done(function(product) {
            alert("Product added favorites");
            getFavoriteProducts();
        })
        .fail(ifResultsFail);
}

function getFavoriteProducts() {

    $.ajax({
            method: 'GET',
            dataType: 'json',
            url: '/favorite-products',
        })
        .done(function(products) {
            console.log(products);

            var buildTheHtmlOutput = "";

            $.each(products, function(productsKey, productsValue) {
                buildTheHtmlOutput += "<li>" + productsValue.name + "</li>";
            });

            //use the HTML output to show it in the index.html
            $(".favorites-container ul").html(buildTheHtmlOutput);

        })
        .fail(ifResultsFail);
}



//function to display results of list items
function resultsIntoListItem(output, product) {
    var isSale;
    output += '<li>';
    output += '<div class="product-container">';
    output += '<div class="add-product-to-favorites">';
    output += '<input type="hidden" value="' + sanitizeJSON(product.name) + '">';
    output += '<button class="favorites"><img src="images/add-to-favorites.png"></button>';
    output += '</div>';
    output += '<div class="title-wrapper"><h3 class="clamp-this">' + sanitizeJSON(product.name) + '</h3></div>';
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
//function for clamp element
function clampItemTitle(index, element) {
    $clamp(element, {
        clamp: 3
    });
}
//function in case if results fail
function ifResultsFail(jqXHR, error, errorThrown) {
    console.log(jqXHR);
    console.log(error);
    console.log(errorThrown);
}
//function for displaying output
function ajaxDone(result) {
    // console.log(result);
    var output = '';
    if (result.products.length == 0) {
        alert('No Results Found!');
    }
    else {
        if (!result.error && result.products) {
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


// //Function for Login an already existing user

//     $('#btnLogin').click (function (event) {
//         event.preventDefault();
//         $('#temp-error').hide();
//         let username = $('#username').val();
//         let userpassword = $('#password').val();
//         let item = {
//             'username' : username, 
//             'password' : userpassword
//         };

//         var ajax = $.ajax ('/login', {
//             type: 'POST',
//             data: JSON.stringify (item),
//             dataType: 'json',
//             contentType: 'application/json'
//         });
//         ajax.done (function (res) {
//             if (res.response == 'error') {
//                 $('#login').append ('<div id="temp-error">' + res.message + '</div>');
//                 return;
//             }
//             else {
//                 userData = res;
//                 updatedData = res;

//                 $('#login').hide();
//                 $('.search').hide();
//                 $('.form-login').hide();
//                 $('.mid-content').hide();
//             }
//         });
//     });

// //Function for new user submission function
//     $('.form-submit').click (function (event) {
//         event.preventDefault();
//         $('#temp-error').hide();
//         let newUser = $('#new-user').val();
//         let newPassword = $('#new-pass').val();
//         let newEmail = $('#new-email').val();
//         var item = {'username' : newUser, 'password' : newPassword, 'userEmail' : newEmail};

//         var ajax = $.ajax ('/new-user', {
//             type: 'POST',
//             data: JSON.stringify (item),
//             dataType: 'json',
//             contentType: 'application/json'
//         });
//     ajax.done(function(res){
//       accountStatus.text('Account created.  Please sign in');
//         //   $('.form-signup').hide();

//     });
//   });

//  //function to return to results and add more items
//       $(".add-item").click(function () {
//         $('.results').show();
//           $('#login').show();
//              //if the user clicks more than 10 times then prompt that basket is full
//             if((".add-item").click < totalList)
//             (

//             )
//       });





//     ajax.done (function (res) {
//         if (res.response == 'error') {
//             $('#newuser').append ('<div id="temp-error">' + res.message + '</div>');
//             return;
//         }
//         else {
//             userData = res;
//             updatedData = res;
//             $('#newuser').hide();
//             $('#newPassword').hide();
//             $('#newEmail').hide();
//         }    
//     });
// });

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
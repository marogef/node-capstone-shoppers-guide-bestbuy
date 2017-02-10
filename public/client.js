
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
//     $.ajax({
//         method: 'GET',
//         dataType: 'json',
//         url: url,
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
               pageSize: 36;
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
  } else {
    output += '<p class="reg-price strong no-sale">$' + product.regularPrice + '</p>';
    isSale = false;
  }
  output += '</div>';
  if (isSale == false) {
    output += '<a href="' + product.addToCartUrl + '" class="add-to-cart">Add to Cart</a>';
  } else {
    output += '<a href="' + product.addToCartUrl + '" class="add-to-cart sale-button">Add to Cart</a>';
  }
  output += '</div>';
  output += '</li>';
  return output;
}




function resultsIntoListItem(output, product) {
    var isSale;
    output += '<li>';
    output += '<div class="product-container">';
    output += '<div class="add-product-to-favoritess">';
    output += '<input type="hidden" value="' + product.name + '">';
    output += '</div>';
    output += '<div class="title-wrapper"><h3 class="clamp-this">' + product.name + '</h3></div>';
        // output += '<button type="submit"><img src="images/add-to-favorites.png"></button>';
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
            output += '<button type="submit"><img src="images/add-to-favorites.png"></button>';

    }
    else {
        output += '<a href="' + product.addToCartUrl + '" class="add-to-cart sale-button">Add to Cart</a>';
            output += '<button type="submit"><img src="images/add-to-favorites.png"></button>';

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


//  $(document).on('click', function(key) {
//          var user=$("#username").val();
//           var pass=$("#password").val();
//           $.post("http://localhost:3000/login",{Username: username, Password: password}, function(data){
//             if(data==='done')
//               {
//                 alert("Welcome");
//               }
//           });
        
//  $(document).on('click', function(key) {
//         var user=$("#name").val();
//           var pass=$("#email").val();
//           var  message=$("#msg").val();
//           $.post("http://localhost:3000/login",{user: name, pass: password, message: msg}, function(data){
//             if(data==='done')
//               {
//                 alert("Thanks for the submission.  We will get back to you shortly.");
//               }
//           }
//  });

//code for event handling for cart
function move_navigation( $navigation, $MQ) {
	if ( $(window).width() >= $MQ ) {
		$navigation.detach();
		$navigation.appendTo('header');
	} else {
		$navigation.detach();
		$navigation.insertAfter('header');
	}
}

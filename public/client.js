* {
    margin: 0;
    padding: 0;
    border: 0;
    /*The box-sizing property is used to tell the browser what the sizing properties (width and height) should include border-box.*/
    box-sizing: border-box;
    /*reset Chrome user agent styles*/
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-before: 0px;
    -webkit-padding-after: 0px;
    -webkit-padding-start: 0px;
    -webkit-padding-end: 0px;
    /*reset Firefox user agent styles*/
    -moz-margin-before: 0px;
    -moz-margin-after: 0px;
    -moz-margin-start: 0px;
    -moz-margin-end: 0px;
    -moz-padding-before: 0px;
    -moz-padding-after: 0px;
    -moz-padding-start: 0px;
    -moz-padding-end: 0px;
    /*reset Internet Explorer user agent styles*/
    -ms-margin-before: 0px;
    -ms-margin-after: 0px;
    -ms-margin-start: 0px;
    -ms-margin-end: 0px;
    -ms-padding-before: 0px;
    -ms-padding-after: 0px;
    -ms-padding-start: 0px;
    -ms-padding-end: 0px;
    /*reset Opera user agent styles*/
    -o-margin-before: 0px;
    -o-margin-after: 0px;
    -o-margin-start: 0px;
    -o-margin-end: 0px;
    -o-padding-before: 0px;
    -o-padding-after: 0px;
    -o-padding-start: 0px;
    -o-padding-end: 0px;
}

/*general styles*/
body {
    font-size: 15px;
    font-family: 'Nunito', sans-serif;
    background-color: #115391;
}
.favorite-header h1{
    padding-top: 50px;
    padding-bottom: 20px;
    color: white;
    font-size: 14px;
    display: block;
    width: 80%;
    margin: 0 auto;
    color: #115391;
}
a:hover,
a:focus {
    border-left: 0px solid #F7F7F6;
}

nav ul,
nav li {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
}

ul,
ol {
    list-style-type: none;
}

input, button {
    padding: 0.2rem;
    border-radius: 5px;
    border: 1px solid gray;
    margin-bottom: 0.2rem;
}
header styles
h3 {
    font-weight: 600;
}

.banner, .favorite {
    background: linear-gradient(lightblue, transparent 10%), url(images/blue-e.jpg) no-repeat center;
    text-align: left;
    background-size: cover;
    background-attachment: fixed;
    margin-left: auto;
    margin-right: auto;
    width: 980px;
    height: 102px;
    border-radius: 5px;
        border:5px solid green;
    /*background-position: 1px -100px; */
}

.banner h1, .favorite h1 {
     padding-top: 50px;
   padding-bottom: 20px;
    color: white;
    font-size: 14px;
    display: block;
    width: 90%;
    margin-left: auto;
   margin-right: auto;
    width: 400px;
}

.banner .favorites-container {
/*
    background-image: url("../images/transparent.jpg");
    position: fixed;
    top: 15px;
    right: 15px;
    width: 20%;
    color: white;
     text-align: left; 
    font-size: 10px;
    z-index: 1000;
    border: 2px gray solid;
    border-radius: 7px;
    padding: 10px;
    text-align: center;
    max-height: 150px;
    min-width: 150px;
    overflow-y: auto;
*/
    padding: 6px;
    text-align: center;
    margin-left: auto;
    background-color: lightblue;
    margin-right: auto;
    width: 582px;
    border: 5px solid green;
}
}
.banner .favorites-container ul {
    list-style-type: decimal;
    text-align: left;
    margin: 0 15px;
}
.banner .favorites-container ul li{
    margin-top: 10px;
}

.banner .favorites-container .delete-favorites{
    position: absolute;
/*
    margin-top: 55px;
    margin-left: 0px;
*/
}

.banner .favorites-container .delete-favorites button {
     padding:0; 
     border: 0; 
     margin: 0;
     width: 14px;
     height: 14px;
}
.banner .favorites-container .delete-favorites img{
    max-width: 100%;
    height: auto;
     padding:0; 
     margin: 0; 
}

.banner img{
    width:50px;
    height: 20px;
}

/*content styles*/
.side-menu {
    border: 1px solid gray;
    position: absolute;
    top: 103px;
    left: -150px;
    width: auto;
    transition: width .2s linear;
    -webkit-transform: translateZ(0) scale(1, 1);
    margin-top: 20px;
    float: left;
    background-color: #00164F;
    z-index: 10000;
}

.side-menu:hover {
    left: 0px;
}

.side-menu .side-logo {
    float: right;
    position: absolute;
    right: -117px;
    top: -58px;
    background-repeat: no-repeat;
    width: auto;
    background-color: white;
    margin: 0px;
    margin-top:120px;
    text-align: center;
    font-size: 15px;
    padding: 0.4rem;
    transform: rotate(90deg);
    transform-origin: left top 0;
}
.side-menu .side-logo a {
    text-decoration: none;
}

.side-menu .scrollbar ul {
    list-style-type: square;
    padding: 0px 0px 0px 20px;
    /*list-style-image: url('sqpurple.gif');*/
}

.side-menu .scrollbar li {
    display: block;
    width: auto;
    margin: 10px;
    padding-left: 10px;
}

.side-menu .scrollbar li>a {
    position:relative;
    color: #51FF7E;
    font-size: 15px;
    text-decoration: none;
    font-family: 'Strait', sans-serif;
    text-shadow: 1px 1px 1px #fff;
}

.content{
    background-color: #115391;
    /*background-image: url('./images/cool-house.jpg');*/
    text-align: center;
}
.content .search {
    margin: 10px 8px 21px 5px;
    width: auto;
    display: block;
}
.content .search .search-items {
    margin-top: 5px;
}
.content .search .search-items input{
    display: inline-block;
    width: auto;
}
.content .results {
    margin-left: auto;
    margin-right: auto;
    width: 87%;
/*    margin-top: 5rem;*/
}


.content .results li {
    width: 49%;
    vertical-align: top;
    padding: 1rem 0.5rem 1rem 0.5rem;
    display: inline-block;
}
.content .results .product-container {
    position: relative;
    background-color: #fff;
    min-height: 22rem;
    min-width: 100%;
    padding: 1rem;
    display: inline-block;
    text-align: center;
    -webkit-box-shadow: 0px 7px 6px -5px rgba(38, 38, 38, 0.5);
    -moz-box-shadow: 0px 7px 6px -5px rgba(38, 38, 38, 0.5);
    box-shadow: 0px 7px 6px -5px rgba(38, 38, 38, 0.5);
}

.content .results .product-container .add-product-to-favorites {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 321px;
    margin-left: 156px;
    width: 284px;
}

.content .results .product-container .add-product-to-favorites button{
     padding:0; 
     border: 0; 
     margin: 0; 
}
.content .results .product-container .add-product-to-favorites img{
/*
    max-width: 100%;
    width: 20px;
    height: auto;
     padding:0; 
     margin: 0; 
*/
    display: block;
    text-align: center;
    width: 50%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #333;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #193366;
    color: #fff;
    -webkit-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    -moz-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);

}

.content .results img {
    display: block;
    max-width: 90%;
    height: 6rem;
    overflow: hidden;
    vertical-align: middle;
    margin: 1.25rem auto 1rem auto;
}

.content .results .title-wrapper {
    height: 5rem;
    display: table;
    width: 100%;
}

.content .favorites-link{
border: 8px solid green;
    color: greenyellow;
    background-color: white;
    /* float: right; */
    width: 195px;
    margin-top: 75px;
    margin-bottom: 58px;
    text-align: center;
    height: 55px;
    margin-left: auto;
    margin-right: auto;
    width: 196px;
    padding: 9px 24px 14px 14px;
    color: salmon;
    
    
}
.content .product-details {
    min-height: 6.5rem;
}
.content .results .product-container .add-favorites{
    display: block;
    text-align: center;
    width: 50%;
    padding: 0.5rem;
    margin-top: 20 rem;
    margin-left: 142px;
    margin-right: auto;
    border: 1px solid #333;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #193366;
    color: #fff;
    -webkit-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    -moz-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    
}

.content .add-to-cart {
    display: block;
    text-align: center;
    width: 50%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #333;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #193366;
    color: #fff;
    -webkit-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    -moz-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
}
.content .add-product-to-favorites{
        display: block;
    text-align: center;
    width: 50%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #333;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #193366;
    color: white;
    -webkit-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    -moz-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
}
.content .add-product-to-favorites .favorites{
color: white;
    
}
.content .sale-button {
    background: #F4DE7B;
    color: #333;
    border: 1px solid #C2AA3D;
    font-weight: 600;
}

.content .strikethrough {
    text-decoration: line-through;
}

.content .highlight {
    color: red;
    text-transform: uppercase;
    font-weight: 800;
}

.content .strong {
    font-weight: 800;
}

.content .no-sale {
    margin-top: 1.56rem;
}
.main-content{
    width: 973px;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    padding: 4px;
    border-radius: 20px;
    box-shadow: 5px 5px 5px 5px deepskyblue;
    height: 32em;
    border-bottom: 10px;
    border-top: 5px;
    background-color: #EEEEEE;
    padding-top: 10px;
}
.intro-content{
    float: left;
    border: 6px solid #02d2b9;
    width: 328px;
    /* height: 75%; */
    padding-bottom: 10px;
    /* margin: auto; */
    margin-left: 2px;
    border-bottom-right-radius: 10px;
    background: #193366;
    color: #fff;
    -webkit-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    -moz-box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
    box-shadow: 0px 2px 2px 0px rgba(38, 38, 38, 0.5);
}
.intro-content img{
    padding: 1px 1px 1px 1px;
    margin-right: auto;
    margin-left: auto;
    width: 315px;
    border-radius: 16px;
    margin-bottom: 20px;
}
.intro-content p{
    font-size: 20px;
    border: 7px solid darkgreen; 

}
.mid-content {
    background-color: #1153B1;
    font-size: 24px;
    background-size: cover;
    border-radius: 8px;
    border-style: dotted;
    margin-bottom: 30px;
    margin-top: 30px;
        background-color: #1153B1;
    background-size: cover;
    border-style: dotted;
    margin-bottom: 30px;
    margin-top: 30px;
    margin-bottom: 20px;
    box-shadow: 0 0 5px #cdcdcd;
    background-color: steelblue;
    margin-left: auto;
    margin-right: auto;
    width: 625px;
    border: none;
    padding: 52px 85px 74px 60px;
    border-top: 6px solid #02d2b9;
    border-bottom: 6px solid #da7cd6;
    background-position: 0 0, 100% 0;
    background-repeat: no-repeat;
    -webkit-background-size: 6px 100%;
    -moz-background-size: 6px 100%;
    /* background-size: 6px 100%; */
    background-image: -webkit-linear-gradient(top, #02d2b9 0%, #da7cd6 100%), -webkit-linear-gradient(top, #02d2b9 0%, #da7cd6 100%);
    background-image: -moz-linear-gradient(top, #02d2b9 0%, #da7cd6 100%), -moz-linear-gradient(top, #02d2b9 0%, #da7cd6 100%);
    background-image: -o-linear-gradient(top, #02d2b9 0%, #da7cd6 100%), -o-linear-gradient(top, #02d2b9 0%, #da7cd6 100%);
    background-image: linear-gradient(to bottom, #02d2b9 0%, #da7cd6 100%), linear-gradient(to bottom, #02d2b9 0%, #da7cd6 100%);
    margin: auto;
/*    padding: 10px;*/
    margin-left: 5px;
    float: right;
/*    width: 25%;*/
}
}
.mid-content p {
    color: #DDFFE6;
    /*text-align: center;*/
    line-height: 2.0;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 500px;
    font-family: ariel;
}

.search-results{
    background-color: lightblue;
    border: solid 3px black;
    width: 500px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    /*padding-bottom: 200px;*/
    /*margin-top: 200px;*/
    margin-top: 200px;
    margin-bottom: 300px;
    
}
.search-results .add-item{
    padding: 0.4rem;
    border-radius: 5px;
    border: 1px solid gray;
    /*margin-bottom: 0.2rem;*/
    /*margin-top: 230px;*/
    /*margin-right: 450px;*/
}
.banner .favorite ul { 
    border: 3px solid black;
    /* color: white; */
    /* margin-right: 50px; */
    background-color: silver;
    float: left;
    width: 195px;
    margin-top: 10px;
    margin-bottom: 58px;
    text-align: center;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    padding: 4px 3px 7px 6px;
    color: salmon;
    font-weight: bold;
    
}

footer .inside-footer {
    height: 5px;
    background-color: orange;
    margin-top: 50px;
}
footer .inside-footer-favorites {
    height: 5px;
    background-color: orange;
    margin-top: 630px;
}


/*reposnsive */

@media only screen and (max-width: 800px) {
    .banner,
    .content,
    .search-results,
    footer,
    .mid-content {
        width: 100%;
        border-top: none;
    }
    .content .results li {
        width: 100%;
        display: block;
    }
}

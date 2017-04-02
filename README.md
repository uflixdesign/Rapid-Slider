# Rapid Slider

Rapid Slider by UFLIX DESIGN is a super fast jQuery Plugin
which is also the most hackable HTML5 image / content slider.


## Getting Started

To use Rapid Slider in your project you must include the
dependencies and Rapid Sider's core CSS & JS files.

### Installation

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="rapidslider/rapidslider.css" />
    
    <!-- You must specify atleast the height of the slider in %, px -->
    <!-- Or if you use absolute or fixed positions the bounding box must have a calculative height -->
    <style>
        .rapidslider{
            height: 600px;
        }
    </style>
    
    <!-- JS -->
    <script src="lib/jquery.2.2.4.min.js"></script>
    <script src="rapidslider/rapidslider.js"></script>
    
### Markup
    
    
    <!-- MARKUP -->
    <div class="rapidslider">
        <div class="rapidslider-slides">
            <div class="rapidslider-slide">
                <img class="rapidslider-slide-image" title="Foodie" alt="" src="images/slide-01.jpg" />
            </div>
            <div class="rapidslider-slide">
                <img class="rapidslider-slide-image" alt="" title="Woman" src="images/slide-02.jpg" />
                <a class="slide-link" href="#">Slide Link</a>
            </div>
            <div class="rapidslider-slide">
                <img class="rapidslider-slide-image" alt="" title="Dragonfly" src="images/slide-03.jpg" />
            </div>
            <div class="rapidslider-slide">
                <img class="rapidslider-slide-image" alt="" title="House" src="images/slide-04.jpg" />
            </div>
        </div>
    
        <ul class="rapidslider-pagination"></ul>
        
        <div class="rapidslider-directions">
            <a class="rapidslider-prev" href="#">&laquo;</a>
            <span class="rapidslider-caption">Here will be the caption, you may leave a blank tag</span>
            <a class="rapidslider-next" href="#">&raquo;</a>
        </div>
    
    </div>
    
    
### Initialization
    
    <!-- Initialization -->
    <script>
    
        // With default options
        $('.rapidslider').rapidslider();
        
        // With custom options
        $('.rapidslider').rapidslider({
            autoplay: true,
            speed: 300,
            pause: 2000
        });
        
        
    </script>

### Options

|Option|Possible values|Default|Description|
|---|---|---|---|
|autoplay|boolean|false|Autoplay slider upon initialization|
|loop|boolean|true|Loop slider if reached to one end|
|speed|integer|400|The time in milliseconds the slider will take to move from one slide to other|
|pause|integer|400|The time in milliseconds one slide will pause before moving to another slide|


## LICENSE
https://github.com/uflixdesign/Rapid-Slider/blob/master/LICENSE.md
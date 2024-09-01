/*global jQuery, Galleria */

(function($) {

Galleria.addTheme({
    name: 'portfolio',
    author: 'NickEng',
    css: 'galleria.portfolio.css',
    defaults: {
        transition: 'slide',
        thumbCrop:  'height',
		imageMargin: '24',
		initialTransition: 'flash',
		debug: false,
		_toggleInfo: true
    },
    init: function(options) {

       //add extra elements
        this.addElement('info-link','info-close');
        this.append({
            'info' : ['info-title','info-link','info-close'],
			'container':'counter'
        });
		
        var t = this,
			info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';
		
        this.$('loader,counter').show();
		this.$('loader').css('opacity', 0.4);
		
		// add nav button for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-100 });
            this.addIdleState( this.get('image-nav-right'), { right:-100 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }

        // toggle info
        if ( options._toggleInfo === true ) {
			this.$('info-link').text('more info')
            info.bind( click, function() {
                t.$('info-close,info-text').toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }

        // fade non-active thumbnails
        this.bind('thumbnail', function(e) {
            if (! touch ) {
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
            }
        });

        //loading states
        this.bind('loadstart', function (e) {
			e.cached || this.$('loader').show().fadeTo(100, 1);
			this.$('info').toggle( this.hasInfo() );
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
		});
		this.bind('loadfinish', function (e) {
			this.$('loader').fadeOut(200);
		});
    }
});


}(jQuery));

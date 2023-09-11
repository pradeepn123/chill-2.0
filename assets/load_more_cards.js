var articles_on_page = $('.articles-on-page');
var next_url = articles_on_page.data('next-url');
var load_more_btn = $('.blog_load_more_btn');
var load_more_spinner = $('.blog_load_more_spinner');

function showMoreCards() {
    $.ajax(
        {
            url: next_url,
            type: 'GET',
            dataType: 'html',
            beforeSend: function() {
                load_more_btn.hide();
                load_more_spinner.show();
            }
        }
    ).done(function(next_page){
        load_more_spinner.hide();

        var new_articles = $(next_page).find('.articles-on-page');
        var new_url = new_articles.data('next_url');

        if(new_url){
            load_more_btn.show();
        }
        next_url = new_url;
        articles_on_page.append(new_articles.html());
    });
}
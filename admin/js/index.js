$(()=>{
    $('.tab').on('click', function(){
        $('.tab').removeClass('active');
        $(this).addClass('active');
    })
})
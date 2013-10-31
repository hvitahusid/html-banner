$(document).ready(function() {
    $('#urlencoder input').on('keyup change', function() {

        var params = {};
        $('#urlencoder input').each(function() {
            var key = $(this).data('key');
            var val = $(this).val();
            var checked = $(this).prop('checked');

            if(val && !checked) {
                params[key] = val;
            }

            if(checked) {
                params[key] = '1';
            }
        });

        $('#urlencoder div.url').html('?' + $.param(params));
    });
});

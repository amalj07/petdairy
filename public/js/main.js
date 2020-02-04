$(document).ready( () => {
  $('.delete-article').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/livestocks/'+id,
      success: (response) => {
        alert('Delete animal data?');
        window.location.href='/';
      },
      erorr: (error) => {
        console.log(error);
      }
    });
  });
});

import Service from '@ember/service';

export default Service.extend({
  message(text){
    $('.feedback').css("display", "flex");
    $('.feedback').children('h5').empty().append(text);
  },

});

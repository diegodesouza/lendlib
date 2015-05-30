Template.categories.helpers({
  classification: function(){
    return Lists.find({}, {sort: {Category: 1}});
  },
});

Template.categories.events({

});


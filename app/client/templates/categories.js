Template.categories.helpers({
  classification: function(){
    return Lists.find({}, {sort: {Category: 1}});
  },

  new_category: function(){
    return Session.equals('adding_category', true);
  }
});

Template.categories.events({
  'click #btnNewCat': function (event, template) {
    Session.set('adding_category', true);
    Meteor.flush();
    focusText(template.find("#add-category"));
  },
  'keyup #add-category': function (event,template){
    if (event.which === 13)
    {
      var categoryValue = String(event.target.value || "");
      if (categoryValue)
      {
        Lists.insert({Category:categoryValue});
        Session.set('adding_category', false);
      }
    }
  }
});

function focusText(i) {
  i.focus();
  i.select();
};

Template.categories.helpers({
  classification: function(){
    return Lists.find({}, {sort: {Category: 1}});
  },

  new_category: function(){
    return Session.equals('adding_category', true);
  }
});

Template.categories.events({
  'click #btnNewCat': function (e, t) {
    Session.set('adding_category', true);
    Meteor.flush();
    focusText(t.find("#add-category"));
  },
  'keyup #add-category': function (e,t){
    if (e.which === 13)
      {
        var catVal = String(e.target.value || "");
        if (catVal)
          {
            Lists.insert({Category:catVal});
            Session.set('adding_category', false);
          }
      }
  }
});

function focusText(i) {
  i.focus();
  i.select();
};

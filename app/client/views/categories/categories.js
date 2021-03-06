Template.categories.helpers({
  lists: function(){
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
  },
  'focusout #add-category': function() {
      Session.set('adding_category', false);
  },
  'list_status': function() {
    if (Session.equals('current_list', this._id))
      return "";
    else
      return " btn-inverse";
  },
  'click .category': function() {
    Session.set('current_list', this._id);
  }
});

function focusText(i) {
  i.focus();
  i.select();
};

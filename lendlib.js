Lists = new Mongo.Collection("lists");

if (Meteor.isClient) {
  /*
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  */
  Template.categories.helpers({
    classification: function(){
      return Lists.find({}, {sort: {Category: 1}});
    },

     // This returns true if adding_category had been assigned a value of true
     new_cat: function() {
       // declaring the 'new_cat' flag
       Session.set('adding_category', false);
       return Session.get('adding_category', true);
     }
  });
  Template.categories.events({
     'click #btnNewCat': function (e, t) {
       Session.set('adding_category', true);
       Meteor.flush();
       focusText(t.find("#add-category"));
     }
  });
  /////Generic Helper Functions/////
  //this function puts our cursor where it needs to be.
  function focusText(i, val) {
    i.focus();
    i.value = val ? val : "";
    i.select();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

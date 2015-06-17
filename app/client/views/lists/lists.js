Template.list.helpers ({
  'lists': function() {
    if (Session.equals('current_list',null))
      return null;
    else
    {
      var cats = Lists.findOne({_id:Session.get('current_list')});
      if (cats&&cats.items)
        {
          for(var i = 0; i<cats.items.length;i++)
          {
            var d = cats.items[i];
            d.Lendee = d.LentTo ? d.LentTo : "free";
            d.LendClass = d.LentTo ? "label-important" : "label-success";
          }
          return cats.items;
        }
    }
  },
  'list_selected': function() {
    return ((Session.get('current_list') != null) && (!Session.equals('current_list', null)));
  },
  'list_adding': function() {
    return (Session.equals('list_adding', true));
  },
  'lendee_editing': function() {
    return (Session.equals('lendee_input', this.Name));
  },
  'addItem': function(list_id, item_name) {
    if (!item_name&&!list_id)
      return;
    lists.update({_id: list_id},
                 {$addToSet: {items:{Name:item_name}}});
  },
  'removeItem': function(list_id, item_name) {
    if (!item_name&&!list_id)
      return;
      lists.update({_id:list_id},
      {$pull:{items:{Name:item_name}}});
  },
  'updateLendee': function(list_id, item_name, lendee_name) {
    var l = lists.findOne({"_id":list_id ,
       "items.Name":item_name});
     if (l&&l.items)
     {
       for (var i = 0; i<l.items.length; i++)
       {
         if (l.items[i].Name === item_name)
           {
           l.items[i].LentTo = lendee_name;
           }
        }
       lists.update({"_id":list_id},{$set:{"items":l.items}});
     }
  }
});


Template.list.events({
  'click #btnAddItem': function (e,t){
    Session.set('list_adding',true);
    Meteor.flush();
    focusText(t.find("#item_to_add"));
  },
  'keyup #item_to_add': function (e,t){
    if (e.which === 13)
    {
      addItem(Session.get('current_list'),e.target.value);
      Session.set('list_adding',false);
    }
  },
  'focusout #item_to_add': function(){
     Session.set('list_adding',false);
  },
  'click .delete_item': function(e,t){
    removeItem(Session.get('current_list'),e.target.id);
  },
  'click .lendee' : function(e,t){
    Session.set('lendee_input',this.Name);
    Meteor.flush();
    focusText(t.find("#edit_lendee"),this.LentTo);
  }
 // 'keyup #edit_lendee': function (e,t){
   // if (e.which === 13)
   // {
     // updateLendee(Session.get('current_list'),this.Name, e.target.value);
     // Session.set('lendee_input',null);
// ￼  }
   // if (e.which === 27)
     // {
        // Session.set('lendee_input',null);
     // }
 // }
});

function focusText(i) {
  i.focus();
  i.select();
};

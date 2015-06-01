Template.item.helpers ({
  items: function() {
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
  }
});

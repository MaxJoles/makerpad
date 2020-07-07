// adds item to metadata lists
const itemSlug = '{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}'
MemberStack.onReady.then(async function (member) {
  if (member.loggedIn) {
    const metadata = await member.getMetaData();
    metadata.savedList = metadata.savedList || [];
    const savedNum = metadata.savedList.length || 0;
    $('.cc-saved-counter').text(savedNum);
    metadata.completedList = metadata.completedList || [];
    const completenum = metadata.completedList.length || 0;
    $('.cc-completed-counter').text(completenum);


    // show/hide saved buttons
    if (metadata.savedList.indexOf(itemSlug) === -1) {
      $('.cc-save-item.cc-checked').hide();
      console.log("not in watchlist");
    }
    else {
      console.log("in watchlist");
      $('.cc-save-item.cc-unchecked').hide();
    }

    // show/hide watchlist buttons
    if (metadata.completedList.indexOf(itemSlug) === -1) {
      $('.cc-mark-as-complete.cc-checked').hide();
      console.log("not completed");
    }
    else {
      console.log("completed");
      $('.cc-mark-as-complete.cc-unchecked').hide();
    }

    $('.cc-save-item').click(function () {
      if (metadata.savedList.indexOf(itemSlug) === -1) {
        metadata.savedList.push(itemSlug);
        const savedNum = metadata.savedList.length || 0;
        metadata.savedItemsNum = savedNum;
        member.updateMetaData(metadata);
        $('.cc-saved-counter').text(savedNum);
        $('.cc-save-item.cc-checked').show();
        $('.cc-save-item.cc-unchecked').hide();
      }
    });
    $('.cc-mark-as-complete').click(function () {
      if (metadata.completedList.indexOf(itemSlug) === -1) {
        metadata.completedList.push(itemSlug);
        const completenum = metadata.completedList.length || 0;
        metadata.completeitemsNum = completenum;
        member.updateMetaData(metadata);
        $('.cc-completed-counter').text(completenum);
        $('.cc-mark-as-complete.cc-checked').show();
        $('.cc-mark-as-complete.cc-unchecked').hide();
      }
    });
  }
});

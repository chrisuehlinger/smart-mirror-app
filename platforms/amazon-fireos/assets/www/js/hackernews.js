window.displayTopStories = function(data) {
    var $stories = $('<ol class="hn-top-stories"></ol>');

    data.forEach(function(story, i) {
        var $story = $('<li></li>');
        var $storynumber = $('<div class="story-number">' + (i+1) + '</div>');
        var $storyblock = $('<div class="story-block"></div>');
        $storyblock.append('<span class="story-title">' + story.title + '</span>');
        $storyblock.append('<span class="story-comments">' + (story.kids ? story.kids.length : 0) + ((story.kids && story.kids.length === 1) ? ' comment' : ' comments') + '</span>');
        $storyblock.append('<span class="story-votes">' + story.score + (story.score === 1 ? ' vote' : ' votes') + '</span>');
        
        $story.append($storynumber);
        $story.append($storyblock);
        $stories.append($story);
    });

    $('body').append($stories);
}
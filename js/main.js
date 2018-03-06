$(function () {


    function $id(id) {
        return typeof id == "string" ? document.getElementById(id) : id
    }

    function hide(obj) {
        obj.style.display = "none"
    }

    function show(obj, display) {
        obj.style.display = display || "block"
    }

    var blackBg = $id('blackBg');
    var video_box = $id('video_box');

    var videoSet = function () {
        audio.pause();
        $(".musicBtn").hide();
        $(".musicBtn-stop").show();
        show(video_box);
        show(blackBg);
    };

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }

    function stopVideo() {
        //player.stopVideo();
    }

    $(".playBtn").on("click", function () {
        var video_html = '<div id="player"></div>' + '<div class="closeBtn" id="closeBtn">' +
            '<p class="vjs-no-js">' + 'To view this video please enable JavaScript, and consider upgrading to a web browser that' +
            '<a href="http://videojs.com/html5-video-support/" target="_blank">' + 'supports HTML5 video' + '</a>' +
            '</p>' + '</div>';
        if (document.all && document.querySelector && !document.addEventListener) {
            alert('To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video');
        }
        video_box.innerHTML = video_html;
        videoSet();
        var player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'qFOHJ6ZdXW8',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });

    var audio = document.getElementById("audio");
    $(".musicBtn").click(function () {
        audio.pause();
        $(".musicBtn").hide();
        $(".musicBtn-stop").show();
    });


    $(".musicBtn-stop").click(function () {
        audio.play();
        $(".musicBtn-stop").hide();
        $(".musicBtn").show();
    });


    $("#video_box").on('click', ".closeBtn", function () {
        //hide(this);
        video_box.innerHTML = "";
        hide(video_box);
        hide(blackBg);
    });

});
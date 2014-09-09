define([
    "jquery",
    "underscore",
    "eventMgr",
    'editor',
    "socketio",
    'diff_match_patch_uncompressed'
], function($, _, eventMgr, editor, io, diff_match_patch) {

    var socket = io('/file-sync');
    var diff = new diff_match_patch();

    var group = window.getParam('group');
    var file = window.getParam('file');
    if (group && file) {
        var username = new Date();
        socket.emit('login', {
            path: decodeURI("doc/"+group+'/'+file),
            username: username
        });
    }

    socket.on('server:patch', function(message) {
        //console.log('server:patch', message);
        var patch = message.patch;
        var patches = diff.patch_fromText(patch);
        var results = diff.patch_apply(patches, editor.getValue());
        var content = results[0];
        console.log(content);
        //console.log('result', results);
        //inSync = true;
        editor.setValueNoWatch(content);
        //editor.setValueNoWatch(content);
        //inSync = false;
        //oldContent = content;
    });


    var gap = 500;
    var timid;
    eventMgr.addListener('onContentChanged', function(fileDesc, newContent, oldContent) {
        var patchList = diff.patch_make(oldContent, newContent);
        var patchText = diff.patch_toText(patchList);

        //var changes = diffMatchPatch.diff_main(oldTextContent, newTextContent);
        //var changes = 1//diffMatchPatch.diff_main(123, 1);
        //clearTimeout(timid);
        //timid = setTimeout(function(){
            socket.emit('patch', {
                'patch': patchText
            });
        //},gap);
        //console.log(patchText);
    });


    return socket;
});

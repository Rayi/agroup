// ADoc 内部 SDK
var adoc = {};

adoc.upload = function(path, file, onProgress) {
  var uri = "/.upload";
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  formData.append('path', path);
  formData.append('file', file);
  
  xhr.open("POST", uri, true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText); // handle response.
      }
  };

  xhr.upload.addEventListener("progress", function(e) {
     if (e.lengthComputable) {
       var percentage = Math.round((e.loaded * 100) / e.total);
       onProgress(percentage);
     }
   }, false);
  
  xhr.send(formData);
}
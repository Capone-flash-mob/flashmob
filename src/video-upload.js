import React, { Component } from 'react';

var VideoUploadBtn = {};

VideoUploadBtn.Btn = class Btn extends Component{
  constructor(props) {
     super(props);
     this.state = {status: ''};
     this.uploadFile = this.uploadFile.bind(this);
   }



  validFileType(file) {
   var fileTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/x-flv',
    'video/mp4',
    'video/MP2T',
    'video/3gpp',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv'
   ];
   for(var i = 0; i < fileTypes.length; i++) {
     if(file.type === fileTypes[i]) {
       return true;
     }
   }
   return false;
  }

  // Uploads a video file to GDrive or fails with error message
   uploadFile(event) {
     var currentFiles = event.target.files;
     if (currentFiles.length === 0){
       this.setState({status: 'Upload Error: Please refresh page and try again.'});
     }
     else if (currentFiles.length === 1){
       if (this.validFileType(currentFiles[0])){
         this.setState({status: ''});
         var fsize = currentFiles[0].size;
         //@TODO: Upload to our servers
       }
       else{
         this.setState({status: 'Upload Error: Use a different video file type.'});
       }
    }
    else{
      this.setState({status: 'Upload Error: Only load one file at a time please.'});
    }
   }

   render() {
     return (
       <form>
           <input type="file" onChange={this.uploadFile}></input>
           <p>{this.state.status}</p>
       </form>
     );
   }
}
export default VideoUploadBtn;

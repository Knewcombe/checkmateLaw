/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2017 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Security Service will take a files and encrypt or decrypt using AES.
 *
 */

 angular.module("app").service('SecurityService', ['$q', '$rootScope', function($q, $rootScope) {
   var self = this;
   //**************************************************************************************************************
   //**************************************************************************************************************
   //*************************************************************************************************
   // Finding the file type.
   //
   // Kyle Newcombe
   // 20170412
   //************************************************************************************************
   //**************************************************************************************************************
   //**************************************************************************************************************
   function base64MimeType(encoded) {
      var result = null;

      if (typeof encoded !== 'string') {
        return result;
      }

      var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

      if (mime && mime.length) {
        result = mime[1];
      }

      return result;
    }
   //**************************************************************************************************************
   //**************************************************************************************************************
   //*************************************************************************************************
   // Encrypting the file from Base64.
   //
   // Kyle Newcombe
   // 20170412
   //************************************************************************************************
   //**************************************************************************************************************
   //**************************************************************************************************************
   this.b64toBlob = function (b64Data, contentType, sliceSize) {
       contentType = contentType || '';
       sliceSize = sliceSize || 512;

       var byteCharacters = atob(b64Data);
       var byteArrays = [];

       for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
           var slice = byteCharacters.slice(offset, offset + sliceSize);

           var byteNumbers = new Array(slice.length);
           for (var i = 0; i < slice.length; i++) {
               byteNumbers[i] = slice.charCodeAt(i);
           }

           var byteArray = new Uint8Array(byteNumbers);

           byteArrays.push(byteArray);
       }

       var blob = new Blob(byteArrays, {type: contentType});
       byteCharacters = null;
       byteArrays = null;
       b64Data = ''
       return blob;
   }

   this.encyptFile = function(filePath, fileName){
     var deferred = $q.defer();
     window.plugins.toast.showWithOptions({
 				message: "Encypting File",
 				duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
 				position: "bottom",
 				addPixelsY: 0 // added a negative value to move it up a bit (default 0)
 		})
     console.log(filePath);
     console.log(fileName);
     //Will take in the filePath to find the file, and the file name needed to read it when writing the file back as blob.
     window.resolveLocalFileSystemURL(filePath, foundFile, resOnError);

     function foundFile(entry) {
         //new file name and folder.
         console.log("-------Found file-------");
         var fileType = ''
         console.log(entry);
         entry.file(function (file) {
             var reader = new FileReader();
             reader.onloadend = function (e) {
                 dataRead = e.target.result;
                 fileType = base64MimeType(dataRead);
                //  console.log("BJM read file:" + dataRead);
                 dataRead = dataRead.replace(/^data:image\/(png|jpg|jpeg|gif|pdf);base64,/, "");
                 dataRead = dataRead.replace(/^data:application\/(pdf);base64,/, "");
                 dataRead = dataRead.replace(/^data:audio\/(x-m4a);base64,/, "");
                 dataRead = dataRead.replace(/^data:video\/(quicktime);base64,/, "");
                 dataRead = dataRead.replace(/^data:video\/(mp4);base64,/, "");
                //  console.log("BJM read file (removed base64 stuff):" + dataRead);
                //  deferred.resolve(dataRead);
                 window.Security.aesEncrypt(dataRead, 'PBKDF2WithHmacSH',
                 function(encryptedData){
                   dataRead = '';
                   console.log('Success');
                  //  console.log(encryptedData);
                   entry.createWriter(function (writer) {
                       writer.onwriteend = function (evt) {
                          encryptedData = '';
                          e = null;
                          console.log("BJM Write successfull");
                          deferred.resolve(entry.fullPath);
                       }
                       encryptedData = self.b64toBlob(encryptedData, fileType, 512);
                       writer.write(encryptedData);
                   }, function (error) {
                       console.log("BJM-Unable to write to file ");
                       console.log(error);
                       deferred.reject();
                   });
                 },
                 function(erro){
                   console.log('Error');
                   console.log(erro);
                 }
               )
             }
             reader.onloadstart = function (e) {
                 console.log("BJM Starting to read file");
             }

             //todo bjm if encrypted the asdataurl does not work but the asbinarystring does.
             reader.readAsDataURL(file);

         }, resOnError);
     }

     function resOnError(error) {
         deferred.reject(error.code);
         //alert("Error "+error.code);
         console.log(error);
     }

     return deferred.promise;
   }
   //**************************************************************************************************************
   //**************************************************************************************************************
   //*************************************************************************************************
   // Decrypting the files and placing them into the temp directory.
   //
   // Kyle Newcombe
   // 20170412
   //************************************************************************************************
   //**************************************************************************************************************
   //**************************************************************************************************************
   this.decyptFile = function(filePath, fileName, folder){
     var deferred = $q.defer();
     console.log(filePath)
     var fileType = '';
     window.resolveLocalFileSystemURL(filePath, foundFile, resOnError);

     function foundFile(entry){
       entry.file(function (file) {
           var reader = new FileReader();

           reader.onloadend = function (e) {
               dataRead = e.target.result;
               fileType = base64MimeType(dataRead);
               console.log(fileType)
              //  console.log(e);
              //  console.log('File read as Base 64');
              //  console.log(dataRead);
              //  console.log("BJM read file:" + dataRead);
               dataRead = dataRead.replace(/^data:image\/(png|jpg|jpeg|gif|pdf);base64,/, "");
               dataRead = dataRead.replace(/^data:application\/(pdf);base64,/, "");
               dataRead = dataRead.replace(/^data:audio\/(x-m4a);base64,/, "");
               dataRead = dataRead.replace(/^data:video\/(quicktime);base64,/, "");
               dataRead = dataRead.replace(/^data:video\/(mp4);base64,/, "");
              //  console.log("BJM read file (removed base64 stuff):" + dataRead);
              //  deferred.resolve(dataRead);
              //  console.log(cordova.plugins);
              //  console.log(window.Security);
               window.Security.aesDecrypt(dataRead, 'PBKDF2WithHmacSH',
               function(decryptData){
                 console.log('Success');
                 console.log(decryptData);
                 window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fileSys) {
                         //The folder is created if doesn't exis
                         dataRead = '';
                         var fileSystem = fileSys.root.toURL();
                         fileSys.root.getDirectory(folder, {
                                 create: true,
                                 exclusive: false
                             },
                             function(directory) {
                               directory.getFile(fileName, {create: true}, function (file) {
                                   console.log("BJM got the file", file);

                                   //*********************************
                                   // BJM OK creating file in \Phone\Android\data\com.checkmate.checkmatelaw\cache
                                   //****************************************

                                   file.createWriter(function (writer) {
                                       writer.onwriteend = function (evt) {
                                         decryptData = ''
                                         deferred.resolve(file.nativeURL);
                                         console.log("BJM Write successfull");
                                       }
                                       decryptData = self.b64toBlob(decryptData, fileType, 512);
                                       console.log(writer)
                                       writer.write(decryptData);
                                      //  deferred.resolve(fileName);
                                   }, function (error) {
                                       console.log("BJM-Unable to write to file ");
                                       console.log(error);
                                       deferred.reject();
                                   });
                               });
                             },
                             resOnError);
                     },
                     resOnError);
               },
               function(erro){
                 console.log('Error');
                 console.log(erro);
                 deferred.reject();
               }
             )
           }
           reader.onloadstart = function (e) {
               console.log("BJM Starting to read file");
           }

           //todo bjm if encrypted the asdataurl does not work but the asbinarystring does.
           reader.readAsDataURL(file);
           //reader.readAsBinaryString(file);
           // if(alreadyBase64Flag){
           //     reader.readAsArrayBuffer(file);
           // }else {
           //                      reader.readAsDataURL(file);
 //                    }

       }, resOnError);
     }

     function resOnError(error) {
         deferred.reject(error.code);
         //alert("Error "+error.code);
         console.log('Didnt find in tmp')
         console.log(error);
     }
     return deferred.promise;
   }

   this.decyptFileBase64 = function(filePath){
     var deferred = $q.defer();
     window.resolveLocalFileSystemURL(filePath, foundFile, resOnError);

     function foundFile(entry){
       entry.file(function (file) {
           var reader = new FileReader();

           reader.onloadend = function (e) {
               dataRead = e.target.result;
               fileType = base64MimeType(dataRead);
               console.log(fileType)
              //  console.log(e);
              //  console.log('File read as Base 64');
              //  console.log(dataRead);
              //  console.log("BJM read file:" + dataRead);
               dataRead = dataRead.replace(/^data:image\/(png|jpg|jpeg|gif|pdf);base64,/, "");
               dataRead = dataRead.replace(/^data:application\/(pdf);base64,/, "");
               dataRead = dataRead.replace(/^data:audio\/(x-m4a);base64,/, "");
               dataRead = dataRead.replace(/^data:video\/(quicktime);base64,/, "");
               dataRead = dataRead.replace(/^data:video\/(mp4);base64,/, "");
              //  console.log("BJM read file (removed base64 stuff):" + dataRead);
              //  deferred.resolve(dataRead);
              //  console.log(cordova.plugins);
              //  console.log(window.Security);
               window.Security.aesDecrypt(dataRead, 'PBKDF2WithHmacSH',
               function(decryptData){
                 console.log('Success');
                 deferred.resolve(decryptData);
               },
               function(erro){
                 console.log('Error');
                 console.log(erro);
                 deferred.reject();
               }
             )
           }
           reader.onloadstart = function (e) {
               console.log("BJM Starting to read file");
           }

           //todo bjm if encrypted the asdataurl does not work but the asbinarystring does.
           reader.readAsDataURL(file);

         }, resOnError);
       }

       function resOnError(error) {
           deferred.reject(error.code);
           //alert("Error "+error.code);
           console.log('Didnt find in tmp')
           console.log(error);
       }
       return deferred.promise;
   };

 }]);

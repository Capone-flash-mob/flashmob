import fire from './fire';

var database = {
    youtubeLinkHelper: function(link){
      //var index = link.indexOf('v=');
      //var id = '';
      return link.replace("https://www.youtube.com/watch?v=", "");
    },
    guid: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    },
    // Get full flashMob item using flashMobId
    getFlashMob:  function(flashMobId, callback){
        console.log('Flashmobid:', flashMobId);
        var flashMobRef = fire.database().ref('/flashmobs/'+flashMobId);
        flashMobRef.once("value").then(function(snapshot){
            console.log(snapshot.val());
            var flashMobSnap = snapshot.val();
            // TODO: REMOVE TEMPORARY ADDITION OF ELEMENT
            callback(flashMobSnap);
        })
    },

    getAllFlashMobs: function(callback){
        var allMobs = fire.database().ref('/flashmobs');
        var allFlashMobs = [];
        allMobs.once("value").then(function(snapshot){
        snapshot.forEach(function(item){
              var myItem = item.val();
              myItem.key = item.key;
              allFlashMobs.push(myItem);
              //console.log("ITEM: " + myitem.key);
            });
          callback(allFlashMobs.reverse());
        })
      },

    editFlashmob: function(uid, key, value){
        var flashMobUpdateInstance =  {};
        flashMobUpdateInstance[key] = value;

        var flashRef = fire.database().ref('flashmobs').child(uid);

        flashRef.update(flashMobUpdateInstance);
    },

     getUser: function(UserId, callback){
        console.log('UserID', UserId);
        var UserRef = fire.database().ref('/users/'+ UserId);
        UserRef.once("value").then(function(snapshot){
            console.log(snapshot.val());
            var UserSnap = snapshot.val();
            // TODO: REMOVE TEMPORARY ADDITION OF ELEMENT
            callback(UserSnap);
        })
    },

    signInUser: function(userId, userEmail, userName, emailVerified){
        var newUser = {
            'userId': userId,
            'Email': userEmail,
            'Name': userName,
            'emailVerified': emailVerified,
        };
        var usersRef = fire.database().ref('/users/' + userId).update(newUser);
        return usersRef.key;
    },

    addUserField: function(userObj, fieldName, fieldValue, callback){
        var userid = userObj.userId;
        var newUserObj = userObj;
        newUserObj[fieldName] = fieldValue;
        console.log("USERID: " + userid)
        var UserRef = fire.database().ref('/users/' + userid);
        var NewUserRef = UserRef.update(newUserObj);
        UserRef.once("value").then(function(snapshot){
            var finalUser = snapshot.val();
            callback(finalUser);
        })
    },

     getMyFlashMobs: function(userID, callback){
        var myMobsRef = fire.database().ref('/users/' + userID + '/MyMobs');
        var allMobsRef = fire.database().ref('flashmobs');
        var allMyMobsKeys = [];
        var allMyMobs = [];

        //get list of keys for interested mobs
        myMobsRef.once("value").then(function(snapshot){
            snapshot.forEach(function(item){
                var mobkey = item.key;
                allMyMobsKeys.push(mobkey);
            })

            var processed = 0;
            console.log("SIZE IS " + allMyMobsKeys.length)
            allMyMobsKeys.forEach(function(item){

            var myRef = fire.database().ref('/flashmobs/'+ item);

            myRef.once("value").then(function(snapshot){
                var myNewMob = snapshot.val();
                myNewMob.key = snapshot.key;
                allMyMobs.push(myNewMob);
                processed++;
                if(processed == allMyMobsKeys.length){
                    callback(allMyMobs);
                }
            })

        })

    })
    },

    getMyFlashMobIDs: function(userID){
       var myMobsRef = fire.database().ref('/users/' + userID + '/MyMobs');
       var allMobsRef = fire.database().ref('flashmobs');
       var allMyMobsKeys = [];
       var allMyMobs = [];

       return new Promise((resolve,reject)=>{
         //get list of keys for interested mobs
         myMobsRef.once("value").then(function(snapshot){
           snapshot.forEach(function(item){
             var mobkey = item.key;
             /*console.log("KEY IS " + mobkey);*/
             allMyMobsKeys.push(mobkey);
             })

             resolve(allMyMobsKeys);
             });
         });
   },

    createFlashMobInstanceHelper: function(name, date, time, description, loc, adminID, email, imgAddr){
        return {
            'name': name,
            'date': date,
            'time': time,
            'description': description,
            'location': loc,
            'adminID': adminID,
            'email': email,
            'imgAddr': imgAddr,
            'timestamp': new Date(Date.now()),
        };
    },

    addFlashmob: function(flashMobInstance){
        // Send flashmob to firebase
        flashMobInstance['interested'] = 0;
        //flashMobInstance['feedback'] = [];
        console.log('About to add flashmob:', flashMobInstance);
        var flashmobRef = fire.database().ref('flashmobs').push(flashMobInstance);
        console.log('flashmob ref:', flashmobRef);
        return flashmobRef.key;
    },


    submitFeedbackComment: function(flashmobId, feedbackId, commentText){

      console.log('Entered submit comment function, flashmobid:', flashmobId, 'feedbackid:', feedbackId, 'commenttext:', commentText);
      this.getFlashMob(flashmobId, function(flashmob) {
        console.log('Got flashmob:', flashmob);
        var currentFeedback = flashmob['feedback'];
        var finalFeedback = [];
        if (currentFeedback){
          console.log('Flashmob has feedback, iterating over list');

          currentFeedback.forEach(function(feed){
            console.log('Iterating over piece of feedback:', feed);
            if (feed['uid'] == feedbackId){
              console.log('Found matching uid feedback that we will add comment to:', feed);
              var currentComments = feed['comments'] || [];
              const currentTime = new Date();
              currentComments.push({
                'time': currentTime.getTime(),
                'comment': commentText,
              });
              feed['comments'] = currentComments;
            }
            finalFeedback.push(feed);
          });
        }
        var flashMobUpdateInstance =  { 'feedback': finalFeedback};

        var flashRef = fire.database().ref('flashmobs').child(flashmobId);
        console.log(flashRef);

        flashRef.update(flashMobUpdateInstance);
      });

    },
    submitFeedbackForFlashmob: function(flashmobId, userid, username, videoUrl){
      console.log('SUBMITTING FEEDBACK:', flashmobId, userid, username, videoUrl);
      videoUrl = this.youtubeLinkHelper(videoUrl);
      var guid = this.guid();
      this.getFlashMob(flashmobId, function(flashmob) {
        var currentFeedback = flashmob['feedback'] || [];
        const currentTime = new Date();
        currentFeedback.push({
          'flashmobId': flashmobId,
          'userId': userid,
          'videoUrl': videoUrl,
          'time': currentTime.getTime(),
          'username': username,
          'flashmobName': flashmob['title'],
          'comments': [],
          'uid': guid
        });

        var flashMobUpdateInstance =  { 'feedback': currentFeedback};

        var flashRef = fire.database().ref('flashmobs').child(flashmobId);
        console.log(flashRef);

        flashRef.update(flashMobUpdateInstance);
      });
    },
    getAllFeedbackForFlashmob: function(flashmobId, callback){
        // Send flashmob to firebase
      this.getFlashMob(flashmobId, function(flashmob) {
        var feedback = flashmob['feedback'] || [];
        callback(feedback);
      });
    },
    getAllFeedbackForUser: function(userId, callback){
        // Send flashmob to firebase
        //var feedback = this.getAllFeedbackForFlashmob(flashmobId);
        var feedback = [];
        this.getMyFlashMobs(userId, function(flashMobs){
          console.log('Got flashmobs:', flashMobs);
          flashMobs.forEach(function(flashmob){
            if (flashmob['feedback']){
              console.log('Flashmob ', flashmob['title'], 'has feedback!');
              if (flashmob['currentUser']['userId'] === userId){

                flashmob['feedback'].forEach(function(feed){
                  if (feed['comments']){
                    feedback.push(feed);
                  } else {
                    feed['comments'] = [];
                    feedback.push(feed);
                  }
                });
              } else {
                flashmob['feedback'].forEach(function(feed){
                  console.log('Found feedback:', feed['userId']);
                  if (feed['userId'] == userId){
                    if (feed['comments']){
                      feedback.push(feed);
                    } else {
                      feed['comments'] = [];
                      feedback.push(feed);
                    }
                  }
                });
              }
            }
          });
          console.log('All feedback found for user:', feedback);
          callback(feedback);
        });
      },
      getFeedbackForUserForSpecificFlashmob: function(flashmobId, userId, callback){

        // Dummy return for now
         callback([
          {
            'userId': 'userid1',
            'videoUrl': 'video1.com',
            'time': (new Date()).getTime(),
            'comments': []
          },
          {
            'userId': 'userid1',
            'videoUrl': 'video2.com',
            'time': (new Date()).getTime(),
            'comments': []
          }
        ]);
    }
}

export default database;

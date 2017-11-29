import fire from './fire';

var database = {
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
                    myItem.key = item.key
                    allFlashMobs.push(myItem);
                    //console.log("ITEM: " + myitem.key);
                })
                callback(allFlashMobs);
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
                console.log("KEY IS " + mobkey);
                allMyMobsKeys.push(mobkey);
            })

            var processed = 0;
            console.log("SIZE IS " + allMyMobsKeys.length)
            allMyMobsKeys.forEach(function(item){

            var myRef = fire.database().ref('/flashmobs/'+ item);

            myRef.once("value").then(function(snapshot){
                console.log(snapshot.val());
                allMyMobs.push(snapshot.val());
                processed++;
                if(processed == allMyMobsKeys.length){
                    console.log('allMyMobs', allMyMobs)
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

    /*********************
    These next 3 functions should work but they have not been tested yet since there are no flashmobs to test on
    **************/
    submitFeedbackForFlashmob: function(flashmobId, userid, username, videoUrl){
      this.getFlashMob(flashmobId, function(flashmob) {
        var currentFeedback = flashmob['feedback'] || [];
        const currentTime = new Date();
        currentFeedback.push({
          'userId': userid,
          'videoUrl': videoUrl,
          'time': currentTime.getTime(),
          'username': username,
          'flashmobName': flashmob['title'],
          'comments': []
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
        // Dummy return for now
        /*callback([
          {
            'userId': 'userid1',
            'videoUrl': 'a.com',
            'time': (new Date()).getTime(),
            'comments': []
          },
          {
            'userId': 'userid2',
            'videoUrl': 'b.com',
            'time': (new Date()).getTime(),
            'comments': []
          },
          {
            'userId': 'userid3',
            'videoUrl': 'c.com',
            'time': (new Date()).getTime(),
            'comments': []
          }
        ]);*/
        //return flashmob['feedback'];
      //});
    },
    getAllFeedbackForUser: function(userId, callback){
        // Send flashmob to firebase
        //var feedback = this.getAllFeedbackForFlashmob(flashmobId);
        /*var feedback = [];
        this.getMyFlashMobs(userId, function(flashMobs){
          console.log('Got flashmobs:', flashMobs);
          flashMobs.forEach(function(flashmob){
            if (flashmob['feedback']){
              flashmob['feedback'].forEach(function(feed){
                if (feed['uid'] == userId){
                  feedback.push(feed);
                }
              });
            }
          });
          callback(feedback);
        });*/
        // Dummy return for now
          callback([
            {
              'userId': 'userid1',
              'videoUrl': 'video1.com',
              'time': (new Date()).getTime(),
              'comments': ['Great job, keep up the good work! I would work on the hip movement so you can really get this thing swinging! We are really trying to indicate fun with this dance so make sure you smile.', 'You are the best thanks!']
            },
            {
              'userId': 'userid1',
              'videoUrl': 'video2.com',
              'time': (new Date()).getTime(),
              'comments': []
            }
          ]);
      },
      getFeedbackForUserForSpecificFlashmob: function(flashmobId, userId, callback){
        // Send flashmob to firebase
        /*var feedback = this.getAllFeedbackForFlashmob(flashmobId);
        feedback.forEach(function(iFeed){
          if (iFeed['userId'] == userId){

            //return iFeed;


          }
        });*/
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

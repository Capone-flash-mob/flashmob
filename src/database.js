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
            flashMobSnap['announcements'] = ['a', 'b']
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

     getMyFlashMobs: function(userID, callback){
        console.log('USERID is ' + userID);
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
                    callback(allMyMobs);
                }
            })

        })

    })     
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
            'timestamp': new Date(Date.now())
        };
    },

    addFlashmob: function(flashMobInstance){
        // Send flashmob to firebase
        flashMobInstance['interested'] = 0;
        var flashmobRef = fire.database().ref('flashmobs').push(flashMobInstance);
        console.log('flashmob ref:', flashmobRef);
        return flashmobRef.key;
    }
}

export default database;

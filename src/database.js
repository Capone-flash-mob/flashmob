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

    createFlashMobInstanceHelper: function(name, date, time, description, loc, adminID, email, imgAddr){
        return {
            'name': name,
            'date': date,
            'time': time,
            // do we really need a description?
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

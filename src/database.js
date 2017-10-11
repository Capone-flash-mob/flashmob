import fire from './fire';

var database = {
    // Get full flashMob item using flashMobId
    getFlashMob:  function(flashMobId, callback){
        console.log('Flashmobid:', flashMobId);
        var flashMobRef = fire.database().ref('/flashmobs/'+flashMobId);
        flashMobRef.once("value").then(function(snapshot){
            console.log(snapshot.val());
            var flashMobSnap = snapshot.val();
            callback(flashMobSnap);
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
        fire.database().ref('flashmobs').push(flashMobInstance);
    }
}

export default database;

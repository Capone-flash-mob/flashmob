import fire from './fire';

function database() {
    // Get full flashMob item using flashMobId
    this.getFlashMob = function(flashMobId){
        var flashMobRef = fire.database().ref('/flashmobs/'+flashMobId);
        flashMobRef.once("value").then(function(snapshot){
            console.log(snapshot.val());
            var flashMobSnap = snapshot.val();
            document.getElementById("flashMobTitle").innerHTML = flashMobSnap.name;
            document.getElementById("flashMobDate").innerHTML = flashMobSnap.date + flashMobSnap.time;
            document.getElementById("flashMobName").innerHTML = flashMobSnap.location;
            document.getElementById("flashMobDescription").innerHtml = flashMobSnap.description;
            return flashMobSnap;
        })
    }

    this.editFlashmob = function(uid, key, value){
        var flashMobUpdateInstance =  {};
        flashMobUpdateInstance[key] = value;

        var flashRef = fire.database().ref('flashmobs').child(uid);

        flashRef.update(flashMobUpdateInstance);
    }

    this.createFlashMobInstanceHelper = function(name, date, time, description, loc, adminID, email, imgAddr){
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
    }

    this.addFlashmob = function(flashMobInstance){
        // Send flashmob to firebase
        fire.database().ref('flashmobs').push(flashMobInstance);
    }
}

export default database;

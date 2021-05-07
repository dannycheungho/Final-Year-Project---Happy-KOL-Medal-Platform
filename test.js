import Fire from '../Fire';


const collectionName = 'snack-SJucFknGX';

let coll = db.collection(collectionName);

class test {


 
    get abc(){
        let ref = coll.orderBy('timestamp', 'desc').limit(size);
        ref.where('tag', '==' , 'photo' )
        .then(snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
              return;
            }
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
              });
            })
            .catch(err => {
              console.log('Error getting documents', err);
            }); 
        console.log(ref);

    }



}


test = new test();
export default test;
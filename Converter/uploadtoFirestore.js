const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Replace with the path to your service account key file
const serviceAccount = require('/Users/baileymendel/Desktop/OncAssistdesktop/serviceAccountKey.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://baileymendel-firebase.firebaseio.com'
});

const db = admin.firestore();

// Path to the JSON file
const filePath = path.join(__dirname, 'output.json');

// Read the JSON file
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Name of the collection
const collectionName = 'test31';

// Function to delete all documents in a collection
async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject);
  });
}

async function deleteQueryBatch(db, query, resolve, reject) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve, reject);
  });
}

// Validate the data
function validateData(data) {
  return data.map(item => {
    const validatedItem = {};
    for (const key in item) {
      if (key && key.trim()) { // Ensure key is not empty or whitespace
        validatedItem[key] = item[key];
      }
    }
    return validatedItem;
  });
}

// Upload the data to Firestore
async function uploadData() {
  try {
    // Delete existing data
    await deleteCollection(db, collectionName, 100);

    // Validate and add new data
    const batch = db.batch();
    const validatedData = validateData(data);
    validatedData.forEach((item) => {
      const docRef = db.collection(collectionName).doc(); // Automatically generate unique IDs
      batch.set(docRef, item);
    });

    await batch.commit();
    console.log('Data uploaded successfully.');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

uploadData();

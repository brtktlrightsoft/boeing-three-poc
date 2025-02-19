import localforage from 'localforage';

// Configure localforage
localforage.config({
  name: 'boeing-viewer',
  storeName: 'activation_data', // The name of the database and table
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE
  ],
  version: 1.0,
  description: 'Storage for Boeing Viewer activation data'
});

// Create a separate instance for activation data
export const activationStorage = localforage.createInstance({
  name: 'activation-data',
  storeName: 'pins'
});

// Export the default instance as well
export default localforage; 
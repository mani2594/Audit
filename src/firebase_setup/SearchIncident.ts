import { query,where,collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import {firestore }from "./firebase"


export async function GetIncident(userId:string){
  const collectionRef = collection(firestore, 'Incident');    
  // const selectQuery = query(collectionRef, where('auditor', '==', 'mani')); 
  const querySnapshot: QuerySnapshot = await getDocs(collectionRef);  
  return querySnapshot;
}


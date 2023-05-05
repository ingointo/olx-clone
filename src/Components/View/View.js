import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs } from "firebase/firestore";

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails} = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  

  useEffect(() => {
    console.log(postDetails.userId)
    const { userId } = postDetails;
    console.log(userId)
    if (userId) {
      const q = query(collection(firebase, 'users'), where('id', '==', userId));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc)
          setUserDetails(doc.data());
        });
      });
    }
  }, []);
  
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;


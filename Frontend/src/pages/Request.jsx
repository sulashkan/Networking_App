import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiousInstance";
import { requestActions } from "../redux/slices/requestSlice";
import {ToastContainer,toast} from "react-toastify"

export const Request = () => {
  // const [list , setList] = useState([]);
  const [isRequest, setIsRequest] = useState(false);
  const dispatch = useDispatch();

  const requestData = useSelector((state) => state.request);
  console.log("requestdata", requestData);

  const currentUser = useSelector((state) => state.auth);
  console.log("currentUser", currentUser.user._id);

  const requestPost = useSelector((state) => state.feed);
  console.log("requestPost", requestPost);
  const filterPost = requestPost.filter(
    (post) => post._id === requestData.from
  );
  console.log("filterPost", filterPost);

  // useEffect( () => {
  //   const request = async () => {
  //     try{
  //       const requestList = await axiosInstance.get("/friends/requests")
  //       console.log("requestList" , requestList.data);
  //       setList(requestList.data)
  //       setIsRequest(true);
  //     }catch(error){
  //       console.log("request error" , error)
  //     }
  //   }
  //   request();
  // } , [])

  useEffect(() => {
    if (requestData.to == currentUser.user._id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRequest(true);
    } else {
      setIsRequest(false);
    }
  }, [requestData, currentUser]);

  const acceptHandler = async (id) => {
    try {
      console.log("id", id);
      if (requestData.from === id) {
        const accept = await axiosInstance.post(
          `/request/accept/${requestData._id}`
        );
        console.log("accept", accept);
        dispatch(requestActions.acceptRequest(accept.data));
      }
    } catch (error) {
      console.log("accept error", error);
    }

    toast("Request Accept");
  };

  const rejectHandler = async (id) => {
    try {
      console.log("id" , id)
      
      if (requestData.from === id) {
        const reject = await axiosInstance.post(
          `/request/reject/${requestData._id}`
        );
        console.log("reject", reject);
         setIsRequest(false);
        dispatch(requestActions.rejectRequest(reject.data));
       
      }
    } catch (error) {
      console.log("reject error", error);
    }

 toast("Request Rejected");
  };

  return (
    <div>
       <ToastContainer />
      {isRequest ? (
        <div className=" ml-30 w-[1000px] h-40 ">
          {filterPost.map((post) => (
            <div className="flex justify-around border mt-15 rounded-2xl p-2">
              <div className="flex gap-3 ">
                <img
                  className="w-9 rounded-4xl"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAACUCAMAAADyHdbUAAAAPFBMVEX6+vqPj4////+Li4uioqLx8fGHh4eUlJTh4eGDg4PX19f29vbn5+eqqqqAgIC7u7uysrLMzMycnJzCwsKHk7PUAAAEBUlEQVR4nO2c25ajIBBFsVBALoL6//86YJKZdG4CHaGcxX7o1el+OSdWIVAFhDQajUaj0Wg0Go1G4xm4UltHFl72MGjh0cNAzmYCYJCrNT3f6I1d5XAiD0CEWzj1dBvhN95bcRILAPPS3bT/w/9lkSewAESy8VH8jakTtfXtos30Tv5mwenaCj8BZOZPsfMTtsjaKj/huh39Phc6W1vlW6Dflb9ZcDhTGYCzGP0+jHqMDkDFff+bA1db7QuUjdbvo2itLfeZOV5+QCKLItB74+fDI1iG2pIfcEn6fRrgGkxBfnz/vmISmIIIEr//LgQRIgMwv52/neMRAE/X31E8rzOQ6REUHGgsDsDl6O86i8XAsOQ9gb628Csgc1LAsyCJIVjz9HfdjMMASZnG3UNXHAYGk2sAyaxaxy8EHgwYFDM60HmDUBiGcBgQS55+bwDFHguIzFE0GMCQxb8yUFt84Pw5cPZR6DfvAVVb+4XU9fBfA0imo7BmGsAyFwKZqZ9jWVRmrweQpAABk/UAsKRA2JTIM4AlgghRWQY4Gv0EbGRl4J4RyRh0IXln0UcQJv2wJm/Njbg22FXqSEpNbckPJG7OUXwl77Q8RlhjSpqTYqzyQcKEwk8iUGXwhfiVGesHhPo3B1F5gFX/triMcMAcVv0hD9zeC42OlqDVT7bFzedEQLOIeQco97bkTSm3Z2g6E3ZhLzxQtlgUO3G7ANGzYeMPD/6jmzXq6L8HyKBnx8dpGj3+J3dSqxNEzwNKC+kRYQf0dOI3Tt073Wg00ANEDV+hzhsClJid6b+AsbMo/54A6Thj9Cswxl3xSeqa1ma5B+VlNxqVydgM/UzRPkzYXXhlMJXbKsroEo1yUCwP8soBu1BeSH9+VXIHViiRIbc7ZQ9qihgAndvcsQsv0nqQXRaOMFAkjTNrkpgMHBdCRcpO/4GBo/T/BwbK5MDpR6HsJr99A2Va0IbDDCyF+m+Omkp0hQ6l5B7Y2KVUAxHMX1+OXRhLLQjUQQaK9a9EHnxO1l/soPRRS8qCBagjBtJCy5kNkAfsSrCSFcCz7wsdMJ2gpQ+VfX1nYi4q35Pbc/8aVuGuidxzG68oOQLdSOnQ2tVf5VgoDDHdQVH6TZ0ONBjcVxwwV+soDaj19w4oLT7+3FsQz3dRJerndVtwACKuFPokv34HFAgXey3PI4w7DB1QQKTt0id3dOS2QnX1JaD0yqekSGLTsmJq4AKihJliPbCJOaEQyd8ACNnQdS/uyLuLm/C/0PtXPXVfAuGKRWv6hYfbCX+U8VmQzpfebJcuolR/JZjQcp6tdcaz9UIY45y1sxSh8Q+z+BvXPrmtE0Vf+lHIWZvnzqm60Wg0Go1Go9FoNIrwB5O9MOs/lnfZAAAAAElFTkSuQmCC"
                ></img>
                <div className="mt-1">{post.name}</div>
              </div>
              <div className="mt-1">{post.profession}</div>
              <div className="flex gap-2 ">
               
                 <button
                  onClick={() => acceptHandler(post._id)}
                  className=" rounded-md p-1 pl-2 pr-2 bg-green-600 hover:bg-green-700 "
                >
                  Accept
                </button>
                   

               
                <button
                  onClick={() => rejectHandler(post._id)}
                  className=" rounded-md p-1 pl-2 pr-2 bg-red-600 hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}{" "}
        </div>
      ) : (
        <div className="w-full min-h-screen flex justify-around items-center text-3xl">
          {" "}
          No Request
        </div>
      )}
    </div>
  );
};

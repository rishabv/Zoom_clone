// const { PeerServer } = require("peer");
const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer=new Peer(undefined,{
  path:'./peerjs',
  host:'/',
  port:'3030' 
})

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });


peer.on('open',id=>{
  socket.emit("join-room", ROOM_ID, id);
})  

socket.on('user-connected', (userId) => {
  connectTONewUser(userId);
});

const connectTONewUser = (userId) => {
  console.log(userId);
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};

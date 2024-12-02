// WebRTC utility functions
export const createPeerConnection = (iceServers = [{ urls: "stun:stun.l.google.com:19302" }]) => {
  return new RTCPeerConnection({ iceServers });
};

export const addTracksToConnection = (peerConnection, stream) => {
  stream.getTracks().forEach(track => {
    peerConnection.addTrack(track, stream);
  });
};

export const cleanupMediaStream = (stream) => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};
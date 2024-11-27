// WebRTC configuration
export const peerConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
  ]
};

export class WebRTCPeer {
  constructor(stream, onStream, onConnect, onClose) {
    this.stream = stream;
    this.onStream = onStream;
    this.onConnect = onConnect;
    this.onClose = onClose;
    this.pc = new RTCPeerConnection(peerConfiguration);
    this.setupPeerConnection();
  }

  setupPeerConnection() {
    // Add local stream
    this.stream.getTracks().forEach(track => {
      this.pc.addTrack(track, this.stream);
    });

    // Handle incoming stream
    this.pc.ontrack = (event) => {
      this.onStream(event.streams[0]);
    };

    // Connection state changes
    this.pc.onconnectionstatechange = () => {
      if (this.pc.connectionState === 'connected') {
        this.onConnect();
      } else if (this.pc.connectionState === 'disconnected' || 
                 this.pc.connectionState === 'failed') {
        this.onClose();
      }
    };

    // ICE candidate handling
    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.onIceCandidate(event.candidate);
      }
    };
  }

  async createOffer() {
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    return offer;
  }

  async createAnswer() {
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    return answer;
  }

  async handleSignal(signalData) {
    try {
      if (signalData.type === 'offer') {
        await this.pc.setRemoteDescription(new RTCSessionDescription(signalData));
        const answer = await this.createAnswer();
        return answer;
      } else if (signalData.type === 'answer') {
        await this.pc.setRemoteDescription(new RTCSessionDescription(signalData));
      } else if (signalData.candidate) {
        await this.pc.addIceCandidate(new RTCIceCandidate(signalData));
      }
    } catch (err) {
      console.error('Error handling signal:', err);
    }
  }

  close() {
    if (this.pc) {
      this.pc.close();
    }
  }

  setOnIceCandidate(callback) {
    this.onIceCandidate = callback;
  }
}
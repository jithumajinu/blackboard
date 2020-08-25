import io from 'socket.io-client';
import chai from 'chai';

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const PORT = process.env.PORT;
const socketURL = `http://127.0.0.1:${PORT}`;
const options = {
  trasports: ['websocket'],
  'force new connection': true
};

describe('chat server', () => {
  it('should broadcast to all connected users when new user connect', (done) => {
    let client1 = io.connect(socketURL, options);
    
    client1.on('connect', (data) => {
      
      // connect second connection
      let client2 = io.connect(socketURL, options);

      client2.on('connect', (data) => {

      });

      client2.on('join', (data) => {
        expect(data).to.be.a('object');
        expect(data.message).to.be.equal('new guy joined');
        client2.disconnect();
      });
    });

    let numbers = 0;

    client1.on('join', (data) => {
      numbers++;

      // check 2 new users joined
      if (numbers == 2) {
        expect(data).to.be.a('object');
        expect(data.message).to.be.equal('new guy joined');
        client1.disconnect();
        done();
      }
    });
  });

  it('should draw line to all connected users when user draw line', (done) => {
    let client1 = io.connect(socketURL, options);
    let line = {
      current: {x: 1, y: 2},
      prev: {x: 3, y: 4}
    };

    client1.on('connect', (data) => {
      
      // connect second connection
      let client2 = io.connect(socketURL, options);

      client2.on('connect', (data) => {
        client2.emit('draw', line);
      });
    });

    client1.on('draw', (data) => {

      // check draw event is driven
      expect(data).to.be.a('object');
      expect(data).to.be.eql(line);
      client1.disconnect();
      done();
    });
  });
}); 
import amqplib from 'amqplib';

class Socket {

  /**
   * @constructor
   * @param {string} url URL to connect to rabbitMQ server
   * @param {Object} options options to pass to the amqplib
   * @param {Object} amqp allows for test to pass in fake amqplib
   */
  constructor(url, options, amqp){

    if (typeof amqp === 'undefined' || amqp === null){
      amqp = amqplib
    }

    if (typeof url !== 'string'){
      throw new Error('URL must be in the form of an string')
    }
    this.url = url;
    this.options = options;
    this.amqp = amqp;
  }

  /**
   * connect Establishes the connection to the RabbitMQ server
   * @returns {Promise} promise that returns the communication channel
   */
  connect(){
    return this.amqp.connect(this.url, this.options)
      .catch((err)=> { console.error(err); throw err; })
      .then((conn)=>{
        process.once('SIGINT', conn.close.bind(conn));
        this.connection = conn;
        this.connection.on('error', console.error);
        return this.connection.createChannel();
      })
  }

}

exports default Socket;

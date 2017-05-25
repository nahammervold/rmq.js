import Socket from './Socket';

class Subscriber extends Socket  {

  /**
   * @constructor
   * @param {string} url Used to specify the rabbitMQ server address
   * @param {Object} options Used to specify connection options to rabbitMQ
   * @param {Object} amqp Normally null used to mock out amqp
   * @param {string} exchange used to specify which
   */
  constructor(url, options, amqp, exchange, exchangeOptions, type, topic, queueName, queueOptions){
    super (url, options, amqp);
    // need to validate parameters
    super.connect()
      .catch((err)=>{
        console.error(err);
        throw err;
      })
      .then((channel)=>{
        this.channel = channel;
        this.channel.assertExchange(exchange, type, exchangeOptions)
          .then(()=>{
            this.channel.assertQueue(queueName, queueOptions)
              .then((q)=>{
                this.queue = q.queue;
                this.channel.bindQueue(this.queue, exchange, topic)
                  .then(()=>{
                    this.channel.consume(this.queue, this.handleMessage, {noAck:true, exclusive: false})
                  })
                  .catch((err)=>{
                    console.error(err);
                    throw err;
                  })
              })
              .catch((err)=>{
                console.error(err);
                throw err;
              })
          })
          .catch((err)=>{
            console.error(err);
            throw err;
          })
      })

  }

  /**
   * handleMessage called when message is consumed should be overwritten in child classes
   * @param {Buffer} rawMsg message consumed from rabbitMQ queue
   */
  handleMessage(rawMsg){

  }
}

export default Subscriber;

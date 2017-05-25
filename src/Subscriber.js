import Socket from './Socket';

class Subscriber extends Socket  {

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
        this.channel.assertExchange(exchange, type, exchangeOptions);
        this.channel.assertQueue(queueName, queueOptions)
          .then((q)=>{
            this.queue = q.queue;
            this.channel.consume(this.queue, this.handleMessage, {noAck:true, exclusive: false})
          })
          .catch((err)=>{
            console.error(err);
            throw err;
          })
      })

  }

  handleMessage(msg){

  }
}

export default Subscriber;

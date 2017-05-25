import Socket from './Socket';

class Publisher extends Socket {
  constructor(url, options, amqp, exchange, exchangeOptions, type){
    super(url, options, amqp);

    // Make sure exchange is passed in
    if (exchange === null || typeof exchange === 'undefined'){
      throw new Error("Publisher needs an Exchange");
    }

    // make sure type is passed in or default to 'topic'
    if (type === null || typeof type === 'undefined'){
      type = 'topic';
    }

    // default exchange options to durable: true
    if (exchangeOptions === null || typeof exchangeOptions === 'undefined'){
      exchangeOptions = {
        durable: true
      };
    }



    super.connect()
      .catch((err)=>{
        console.error(err);
        throw err;
      })
      .then((channel) =>{
        this.channel = channel;

        this.channel.assertExchange(exchange, type, exchangeOptions)
          .then(()=>{
            this.channel.checkExchange(exchange)
              .then(()=>{
                this.exchange = exchange;
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
  }

  publish(message, topic){
    if (this.channel){
      this.channel.publish(this.exchange, topic, new Buffer(message));
    } else {
      throw new Error("Channel has not been created yet");
    }
  }
}

exports default Publisher;

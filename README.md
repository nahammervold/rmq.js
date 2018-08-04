# rmq.js
Simple RabbitMQ topic implementation with ES6

for option objects see https://www.rabbitmq.com/getstarted.html 

## Usage
There are two major classes Publisher and Subscriber that wrap the implementation specified on the rabbitMQ website.

### Publisher
Used to send rabbitMQ messages. Two main methods are the constructor which takes url, connectionOptions, amqplib(optional for mocking), exchange, exchangeOptions, type arguments.
	
~~~~~~~~
var publisher = new Publisher("someUrl", {connectionOptions}, null, "someExchange", {exchangeOptions});
~~~~~~~~

Also has the publish method which takes in the message and the topic to publish to.

	
~~~~~~~~
publisher.publish("message", "topic");
~~~~~~~~

### Subscriber
Meant to be overriden with a specific subscriber class that needs to implement handleMessage(message) method.

Constructor should be specified with parameters 
url, connectionOptions, amqplib(optional for mocking), exchange, exchangeOptions, type, topic, queueName, queueOptions

	
~~~~~~~~
class SpecificSubscriber extends Subscriber {
    constructor(){
        super(url, connectionOptions, null, exchange, exchangeOptions, type, topic, queueName, queueOptions);
    }

    handleMessage(msg){
        // do something with message
    }
}	
~~~~~~~~

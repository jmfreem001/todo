const broker = {
    topics: {},
  
    subscribe: function(topic, listener) {
      // Create if it does not exist
      if(!this.topics[topic]) this.topics[topic] = [];
  
      //add listener
      this.topics[topic].push(listener);     
    },
    publish:  function(topic, data){
        // return if no topic or there are no listeners
        if(!this.topics[topic] || this.topics[topic].length < 1 ) {
            console.log('No listeners or No topic');
            return
        }

        // send event to all listeners        
        this.topics[topic].forEach(listener => listener(data || {}))
    }
  }

  export default broker

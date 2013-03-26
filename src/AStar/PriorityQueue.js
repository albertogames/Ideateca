//Alberto Ortega PriorityQueue
CAAT.Module({

    /**
     * <p>
     * Priority queue, needed to calculate a star pathfinding
     * Based on this priority queue http://strd6.com/2009/06/priorityqueuejs/
     *
     * <p>
     * @name PriorityQueue
     * @memberOf CAAT.Math
     * @constructor
     */

    defines:"CAAT.Math.PriorityQueue",
    aliases:["CAAT.PriorityQueue"],
    extendsWith:function () {
        return {
			/**
             * @lends CAAT.Math.PriorityQueue.prototype
             */
			
			/**
			* Array with the objects 
			*/
			contents:null,
			
			/**
			* Function to sort the queue
			*/
			sortStyle:null,
			
			/**
			* If queue is sorted
			*/
			sorted:false,
			
			/**
			* Constructor
			* @param options. {low: true} - low to high, else, hight to low
			*/
			__init:function (options) {
                
				this.contents = [];
				if(options && options.low) {
				  this.sortStyle = this.prioritySortLow;
				} else {
				  this.sortStyle = this.prioritySortHigh;
				}
            },
			
			
            
			 prioritySortLow:function(a, b) {
				return b.priority - a.priority;
			  },

			  prioritySortHigh:function(a, b) {
				return a.priority - b.priority;
			  },
			  
            
  
			/**
				* Removes and returns the next element in the queue.
			   * @member PriorityQueue
			   * @return The next element in the queue. If the queue is empty returns
			   * undefined.
			   *
			   * @see PrioirtyQueue#top
			   */
			  pop: function() {
				if(!this.sorted) {
				  this.sort();
				}

				var element = this.contents.pop();

				if(element) {
				  return element.object;
				} else {
				  return undefined;
				}
			  },

			  /**
			   * Returns but does not remove the next element in the queue.
			   * @member PriorityQueue
			   * @return The next element in the queue. If the queue is empty returns
			   * undefined.
			   *
			   * @see PriorityQueue#pop
			   */
			  top: function() {
				if(!this.sorted) {
				  this.sort();
				}

				var element = this.contents[this.contents.length - 1];

				if(element) {
				  return element.object;
				} else {
				  return undefined;
				}
			  },

			  /**
			   * @member PriorityQueue
			   * @param object The object to check the queue for.
			   * @returns the queue object if it is in the queue, null otherwise.
			   */
			  includes: function(objec) {
				for(element in this.contents) {
				  if(this.contents[element].object.equals(objec)) {
					return this.contents[element].object;
				  }
				}

				return null;
			  },

			  /**
			   * @member PriorityQueue
			   * @returns the current number of elements in the queue.
			   */
			  size: function() {
				return this.contents.length;
			  },

			  /**
			   * @member PriorityQueue
			   * @returns true if the queue is empty, false otherwise.
			   */
			  empty: function() {
				return this.contents.length === 0;
			  },

			  /**
			   * @member PriorityQueue
			   * @param object The object to be pushed onto the queue.
			   * @param priority The priority of the object.
			   */
			  push: function(object, priority) {
				this.contents.push({object: object, priority: priority});
				this.sorted = false;
			  },
			  
			  sort: function() {
				  this.contents.sort(this.sortStyle);
				  this.sorted = true;
				},
				
				resort: function() {
					this.sorted = false;
				},
			  /**
			  * Delet a object of the queue
			  * @param object
			  */
			  erase: function(object){
				var pos = this.contents.indexOf(object);
				if (pos > -1 ){
					this.contents.splice(pos,1);
				}
			  },
			  
			  /**
			  * Print queue values
			  */
			  print: function() {
				for (element in this.contents){
					console.log("Priority: " + this.contents[element].priority + " - "  + this.contents[element].object.print());
				}
			  }
        }
    }
});
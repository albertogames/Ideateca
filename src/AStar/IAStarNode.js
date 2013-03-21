//Alberto Ortega IAStarNode
CAAT.Module({

    /**
     * <p>
     * Represents a node of the a star pathfindinf
     *
     *
     * <p>
     * @name IAStarNode
     * @memberOf CAAT.IAStarNode
     * @constructor
     */

    defines:"CAAT.PathUtil.IAStarNode",
    depends:[
    ],
    extendsWith:function () {
        return {

            /**
             * @lends CAAT.PathUtil.IAStarNode.prototype
             */
			
			/**
			* Constructor
			* @param posX
			* @param posY
			* @param parent
			*/
            __init:function (posX,posY,parent) {
				
				this.posX = posX;
				this.posY = posY;
				this.parent = parent;
				
				if (this.parent != null){
					this.calculateG();
				}
				
                return this;
            },

            /**
             * Position x (in cells) of th node
             */
            posX:-1,

            /**
             * Position y (in cells) of the node
             */
            posY:-1,

            /**
             * Parent node of actual node
             */
            parent:null,
			
			/**
			*
			*/
			g:0.0,
			h:0.0,
			f:0.0,
			
			/**
			*
			*/
			free:false,



            /**
             * Set the x position (in cells) of the node
             * @param posX
             */
            setPosX:function (posX) {
                this.posX = posX;
                return this;
            },
			
			/**
             * Set the y position(in cells) of the node
             * @param posY
             */
            setPosY:function (posY) {
                this.posY = posY;
                return this;
            },
			
			/**
             * Set the parent of the node
             * @param coordsX
             */
            setParent:function (parent) {
                this.parent = parent;
                return this;
            },
			

			/**
             * Get the x position (in cells) of the node
             * @return posX {number}
             */
            getPosX:function () {
                return this.posX;
            },
			
			/**
             * Get the y position(in cells) of the node
             * @return posY {number}
             */
            getPosY:function () {
                return this.posY;
            },
			
			/**
             * Get the parent of the node
             * @return parent {IAStarNode}
             */
            getParent:function () {
                return this.parent;
            },
			
			/**
             * Get the if the node parameter is the same as this
			 * @param iaStarNode
             * @return {boolean}
             */
			isSameState:function(iaStarNode){
				return ((iaStarNode.getPosX() == this.posX) && (iaStarNode.getPosY() == this.posY));
			},
			
			/**
             * Calculate f value using the definited heuristic an the final node
			 * @param finalNode
             * @return f {number}
             */
			calculate:function(finalNode){
				this.h = Math.abs(this.posX - finalNode.getPosX()) + Math.abs(this.posY - finalNode.getPosY ());
				this.f = this.h + this.g;
				return this.f;
			},
			
			/**
             * Set node to free
             */
			setFree:function(){
				this.free = true;
				return this;
			},
			
			/**
             * Get if the node is free
             * @return {boolean}
             */
			isFree:function(){
				return this.free;
			},
			
			/**
             * Get g value
             * @return g {number}
             */
			getG:function(){
				return this.g;
			},
			
			/**
             * Get f value
             * @return f {number}
             */
			getF:function(){
				return this.f;
			},
			
			/**
             * GAssign the parent of the node
             * @param parent
             */
			setParent:function(parent){
				this.parent = parent;
				this.calculateG();
			},
			
			/**
			* Calculate g value
			*/
			calculateG:function(){
				if (this.parent != null){
					var difX = this.posX - this.parent.getPosX();
					var difY = this.posY - this.parent.getPosY();
					
					if ((difX != 0 && difY == 0) || (difY != 0 && difX == 0)){
						//If the parent is in horizontal or vertical position
						this.g = this.parent.getG() + 10;
					}else{
						//If the parent is in diagonal position
						this.g = this.parent.getG() + 14;
					}
				}else{
					this.g = 0;
				}
			},
			
			/**
			* Comparation function. NOTE: This should be a redefinition method. Now it isn`t
			* @param {obj}
			* @return boolean
			*/
			equals:function(obj)
			{

					/*Make sure the object is of the same type as this*/
					if(typeof obj != typeof this){
						return false;
					}
					/*Object's properties are equivalent */
					return ((obj.getPosX() == this.posX) && (obj.getPosY() == this.posY));
			},
			
			/**
			* Print node position
			*/
			print:function () {
				console.log("node: " + this.posX + "," + this.posY);
			}
			
        }
    }

});
//Alberto Ortega Cell
CAAT.Module({
	

    /**
     * <p>
     * Represents a cell of a logic Map
     *
     *
     * <p>
     * @name Cell
     * @memberOf CAAT.Cell
     * @constructor
     */

    defines:"CAAT.PathUtil.Cell",
    depends:[
    ],
    extendsWith:function () {
        return {
			
			/**
             * Position x (in cells) of the cell
             */
            posX:-1,

            /**
             * Position y (in cells) of the cell
             */
            posY:-1,

            /**
             * Position x in coordenates of the cell center
             */
            coordsX:-1.0,

            /**
             * Position y in coordenates of the cell center
             */
            coordsY:-1.0,
			
			/**
			* Content of the cell
			**/
			content:0,
			
            /**
             * @lends CAAT.PathUtil.Cell.prototype
             */

			 /**
			 * Constructor
			 * @param posX
			 * @param posY
			 * @param coordsX
			 * @param coordsY
			 * @param content
			 */
            __init:function (posX,posY,coordsX,coordsY,content) {
				
				this.posX = posX;
				this.posY = posY;
				this.coordsX = coordsX;
				this.coordsY = coordsY;
				this.content = content;
				
                return this;
            },


            /**
             * Set the x position (in cells) of the cell
             * @param posX
             */
            setPosX:function (posX) {
                this.posX = posX;
                return this;
            },
			
			/**
             * Set the y position(in cells) of the cell
             * @param posY
             */
            setPosY:function (posY) {
                this.posY = posY;
                return this;
            },
			
			/**
             * Set the x position(center coordinates) of the cell
             * @param coordsX
             */
            setCoordsX:function (coordsX) {
                this.coordsX = coordsX;
                return this;
            },
			
			/**
             * Set the y position(center coordinates) of the cell 
             * @param coordsY
             */
            setCoordsY:function (coordsY) {
                this.coordsY = coordsY;
                return this;
            },
			
			/**
             * Set the content of the cell
             * @param content
             */
            setContent:function (content) {
                this.content = content;
                return this;
            },

			/**
             * Get the x position (in cells) of the cell
             * @return posX {number}
             */
            getPosX:function () {
                return this.posX;
            },
			
			/**
             * Get the y position(in cells) of the cell
             * @return posY {number}
             */
            getPosY:function () {
                return this.posY;
            },
			
			/**
             * Get the x position(center coordinates) of the cell
             * @return coordsX {number}
             */
            getCoordsX:function () {
                return this.coordsX;
            },
			
			/**
             * Get the y position(center coordinates) of the cell 
             * @return coordsY {number}
             */
            getCoordsY:function () {
                return this.coordsY;
            },
			
			/**
             * Get the content of the cell
             * @return content {number}
             */
            getContent:function () {
                return this.content;
            },
			
			/**
			* Get if a cell is free or not
			* @return {boolean}
			*/
			isFree:function () {
				return (this.content  == 0);
			}
        }
    }

});